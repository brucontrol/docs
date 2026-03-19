---
id: log-viewer
title: Log Viewer
sidebar_position: 8
---

# Log Viewer

The Log Viewer helps you search, filter, and inspect application logs. Use it when troubleshooting connection issues, script errors, or unexpected behavior.

## Accessing the Log Viewer

- **Route:** `/logs`
- **Navigation:** Open the Log Viewer by navigating to `/logs` in your browser, or click **Settings** → **System Logs** in the Solution Explorer (opens in a new tab). The full URL depends on your host and port (e.g., `http://localhost:5005/logs`).

The Log Viewer has two tabs: **Live** and **Search**.

## Live Tab

The Live tab shows a real-time stream of log entries as they are written. It connects via **SignalR** to the application's log pipeline and displays new events as they occur.

- **Use for:** Watching current activity, debugging in real time, monitoring startup or connection attempts
- **Streaming:** Events are delivered in batches (`LogEventBatchReceived`) or individually (`LogEventReceived`). The live view maintains a rolling buffer of the most recent **500 events** — older events scroll out as new ones arrive.
- **Scrolling:** The view auto-scrolls to the latest entries when at the bottom. Scroll up to review older lines.
- **Pause / Resume** — Use **Pause** to freeze the stream and inspect a section; **Resume** to continue receiving new entries.
- **Clear** — Use the **Clear** button to empty the current live buffer and start fresh.

:::tip
Pause the live stream before scrolling up to inspect a specific error — otherwise new events will push the view back to the bottom.
:::

## Search Tab

The Search tab lets you search historical log files with filters. It is the main tool for investigating past issues.

### Search Parameters

- **Text** — Search for a word or phrase in log messages. Matching entries appear in the results list.
- **Level** — Filter by log level:
  - **Verbose** — Most detailed diagnostic output (high volume)
  - **Debug** — Detailed diagnostic information
  - **Information** — General informational messages
  - **Warning** — Warnings that do not stop execution
  - **Error** — Error conditions
  - **Fatal** — Critical failures
- **From / To** — Date and time range. Default is often the last 24 hours. Narrow the range to speed up searches.
- **Skip / Take** — Pagination. Results are loaded in pages (e.g., 100 at a time). Scroll to the bottom to load more.

### Running a Search

1. Set your filters (text, levels, date range).
2. Click **Search** (or equivalent).
3. Results appear in a list. Each entry typically shows:
   - **Timestamp**
   - **Level** (e.g., VRB, DBG, INF, WRN, ERR, FTL)
   - **Category** (e.g., component or namespace)
   - **Message** (the log text)
4. **Load more** — Scroll down to fetch the next page of results.

### Log Entry Details

Each log event includes:

| Field | Description |
|-------|-------------|
| **Timestamp** | When the event occurred |
| **Level** | Log severity (Verbose through Fatal) |
| **Category** | Log source (e.g., `BruControl.Web`, `Interface.Communications`) |
| **Message** | The rendered log message |
| **MessageTemplate** | The original template with placeholders (e.g., `"Connected to {DeviceName}"`) |
| **Properties** | Structured key-value data attached to the event |
| **Exception** | Full exception details when the event logged an error |

### Log Format

Logs typically follow a structure like:

```
2024-03-08 14:32:15.123 [INF] [Category] Message text
```

## Listing and Viewing Log Files

The Log Viewer backend exposes APIs for listing and accessing log files:

- **List files:** `GET /api/v1/logs/files` — returns available log file names
- **View content:** `GET /api/v1/logs/files/{fileName}/content` — returns file content (truncated to **100 KB** for large files)
- **Download:** `GET /api/v1/logs/files/{fileName}` — downloads the full file

The Search tab shows results with file names in the expanded entry detail. For direct file listing and download, use the API or tools that consume it.

Log files are stored in the BruControl data directory under a `Logs` subfolder (e.g., `Documents\BruControl\Logs`, or the path from `BRUCONTROL_DATA_DIR` plus `Logs`). The Log Viewer reads from this location.

## Troubleshooting with Logs

### Interface Not Connecting

1. Open the Log Viewer and go to the **Search** tab.
2. Search for your interface name or "Interface" or "Connection".
3. Filter by **Error** or **Warning** level.
4. Look for messages about timeouts, refused connections, or port conflicts.

### Script Errors

1. Search for "Process", "Script", or the name of your script.
2. Filter by **Error** or **Fatal**.
3. Check the message for line numbers, variable names, or error descriptions.

### Unexpected Behavior

1. Note the approximate time when the issue occurred.
2. Set the **From** and **To** range to that period.
3. Search for relevant keywords (element name, device name, "alarm", "timeout", etc.).
4. Review the sequence of events in the results.

### Sending Logs to Support

When contacting BruControl Technical Support:

1. **Reproduce** the issue if possible.
2. **Search** logs for the relevant time period and errors.
3. **Download** the log file(s) or copy the relevant entries.
4. **Include** the log excerpts in your support request, along with your BruControl version and a description of the problem.

## Tips

- Use the **Live** tab during initial setup to watch connections establish in real time
- Set the log level to **Verbose** or **Debug** temporarily when diagnosing elusive issues, then switch back to **Information** to reduce noise
- The 500-event buffer in Live view means very high-volume logging may cause older events to disappear quickly — use **Pause** or **Search** to capture them
- Configure logging domains in **Settings → General** to focus on the subsystem you're troubleshooting

## Next Steps

- [Troubleshooting](../appendix/troubleshooting) — Common issues and solutions
- [Technical Assistance](../appendix/technical-assistance) — How to get help
- [Application Setup](./setup) — Configuration and log file location
- [Settings — General](./settings#general) — Configure logging domains and levels
