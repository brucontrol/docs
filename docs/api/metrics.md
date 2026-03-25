# Prometheus Metrics

BruControl exposes a Prometheus-compatible metrics endpoint so you can monitor your brewery in real time, set up alerts, and build Grafana dashboards — all without polling the REST API.

## Endpoint

```
GET /metrics
```

Returns metrics in [Prometheus text exposition format](https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format). No license gate — the endpoint is available to all users.

Metrics are collected on demand: each `GET /metrics` request triggers all registered collectors before the response is written. If an individual collector fails, the error is logged and the remaining collectors still execute.

## Available Metrics

### Custom BruControl Gauges

| Metric | Type | Labels | Description |
|---|---|---|---|
| `brucontrol_element_value` | Gauge | `element_id`, `element_name`, `element_type`, `workspace_id`, `property` | Element runtime property values. Emits numeric and boolean properties including `enabled`, `userControl`, `enableHistoricalLogging`, `loggingIntervalSeconds`, `maxSilenceSeconds`, dynamic properties, and GlobalVariable `value`. |
| `brucontrol_process_running` | Gauge | `process_id`, `process_name` | `1` if the process (script) is currently running, `0` if stopped. |
| `brucontrol_process_current_line` | Gauge | `process_id`, `process_name` | Line number currently being executed in the script. |
| `brucontrol_device_connected` | Gauge | `device_id`, `device_name`, `type_name` | `1` if the device is connected, `0` if disconnected. |
| `brucontrol_device_enabled` | Gauge | `device_id`, `device_name` | `1` if the device is enabled, `0` if disabled. |
| `brucontrol_uptime_seconds` | Gauge | *(none)* | Application uptime in seconds, computed from the system start time. |

### Standard HTTP Metrics

The [prometheus-net](https://github.com/prometheus-net/prometheus-net) library automatically exposes standard .NET and HTTP metrics such as `http_request_duration_seconds`, `dotnet_total_memory_bytes`, and others. These appear alongside the custom gauges at the same `/metrics` endpoint.

## Element Metrics in Detail

The `brucontrol_element_value` gauge uses the `property` label to distinguish different values for the same element. For every element, the following base properties are always emitted:

- `enabled` — `1` or `0`
- `userControl` — `1` or `0`
- `enableHistoricalLogging` — `1` or `0`
- `loggingIntervalSeconds` — interval in seconds
- `maxSilenceSeconds` — silence threshold in seconds

Any numeric or boolean dynamic properties on the element are also emitted, keyed by their property name.

**GlobalVariable elements** receive special handling: `Value` and `Boolean` variable types emit a `value` property sourced from `GetCurrentValue`, with a fallback to parsing the stored string value.

## Prometheus Configuration

Add BruControl as a scrape target in your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: brucontrol
    scrape_interval: 15s
    static_configs:
      - targets: ["localhost:5000"]
```

Adjust `localhost:5000` to match the host and port where BruControl is running. A 15-second scrape interval is a reasonable default; shorter intervals give higher resolution but increase load on both BruControl and Prometheus.

### Labels and Relabeling

You can add instance-level labels to distinguish multiple BruControl installations:

```yaml
scrape_configs:
  - job_name: brucontrol
    scrape_interval: 15s
    static_configs:
      - targets: ["192.168.1.10:5000"]
        labels:
          brewery: "main"
          location: "fermentation-room"
```

## Grafana

### Connecting to Prometheus

1. In Grafana, go to **Configuration > Data Sources > Add data source**.
2. Select **Prometheus** and set the URL to your Prometheus server (e.g., `http://localhost:9090`).
3. Click **Save & Test**.

### Useful Queries

**Current temperature from a sensor element:**

```promql
brucontrol_element_value{element_name="FermenterTemp", property="value"}
```

**All running processes:**

```promql
brucontrol_process_running == 1
```

**Device connection status (table panel):**

```promql
brucontrol_device_connected
```

**Application uptime in hours:**

```promql
brucontrol_uptime_seconds / 3600
```

**Rate of temperature change over 5 minutes:**

```promql
deriv(brucontrol_element_value{element_name="FermenterTemp", property="value"}[5m])
```

### Dashboard Tips

- Use **Stat** panels for single-value elements like uptime or a key temperature reading.
- Use **Time series** panels to graph element values over time — Prometheus stores the history, so you get trends even though BruControl reports instantaneous gauges.
- Use **Table** panels with `brucontrol_device_connected` to build a device health overview.
- Set up **alerts** on conditions like `brucontrol_device_connected == 0` (device went offline) or temperature thresholds crossing a range.
- Filter by `workspace_id` if you run multiple workspaces and want per-workspace dashboards.
