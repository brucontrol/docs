---
id: process-api
title: Process API
sidebar_position: 5
---

# Process API

Processes are scripts that run in BruControl. Each process has a name, script content, and execution state (Stopped, Loading, Paused, Running). Use this API to list, create, update, delete, and control process execution.

**Implementation:** `ProcessController` delegates to `IProcessApi` / `ProcessApi` for all operations.

## Endpoints

### List Processes

```
GET /api/v1/process
GET /api/v1/process?page=1&pageSize=50
```

Returns all processes or a paged result. When `page` or `pageSize` is provided, both default to 1 and 50 respectively. Invalid paging (page &lt; 1 or pageSize not in 1–1000) returns `400 Bad Request`.

**Response:** Array of `ProcessViewModel` or `PagedResponse<ProcessViewModel>` (with `data`, `currentPage`, `pageSize`, `totalCount`)

### Get Process by ID

```
GET /api/v1/process/{id}
```

**Response:** `ProcessViewModel` or `404 Not Found`

### Create Process

```
POST /api/v1/process
```

Creates a new process with a unique auto-generated name (e.g. Script 1, Script 2). No request body required.

**Response:** `201 Created` with `ProcessViewModel` and `Location` header, or `400 Bad Request` on failure

### Update Process

```
PATCH /api/v1/process/{id}
```

Partially updates a process (e.g. name, script content). Send a JSON object with the fields to change.

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. invalid patch data)

### Delete Process

```
DELETE /api/v1/process/{id}
```

**Response:** `204 No Content` or `404 Not Found`

## Execution Control

### Run Process

```
POST /api/v1/process/{id}/run
```

Starts or resumes a process. If the process is paused, this resumes execution.

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. invalid state)

### Load Process

```
POST /api/v1/process/{id}/load
```

Loads the script and leaves the process paused in step mode (ready for `step`). Use this to prepare a script for line-by-line debugging without immediately executing it.

**Response:** `ProcessViewModel` or `404 Not Found`

:::tip Step-Mode Debugging
Call `load` to prepare the script, then use `step` repeatedly to execute one line at a time. The process starts in `Paused` state with `currentLine` at the first executable line.
:::

### Stop Process

```
POST /api/v1/process/{id}/stop
```

Stops a running or paused process and unloads the script.

**Response:** `ProcessViewModel` or `404 Not Found`

### Resume Process

```
POST /api/v1/process/{id}/resume
```

Resumes a paused process. Use when the process was paused (e.g. via UI or script `pause` command).

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. process not paused)

### Step Process

```
POST /api/v1/process/{id}/step
```

Executes a single line when the process is paused. Used for debugging.

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. process not paused)

### Reset Process

```
POST /api/v1/process/{id}/reset
```

Resets execution to the first line. Process must be stopped or paused.

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. invalid state)

### Set Execution Line (SetHere)

```
POST /api/v1/process/{id}/sethere
```

Sets the execution line for a paused process. Used for debugging (e.g. jump to a specific line). Request body required.

**Request body:**

```json
{
  "line": 10
}
```

**Response:** `ProcessViewModel`, `404 Not Found`, or `400 Bad Request` (e.g. process not paused, missing body)

### Get Trace

```
GET /api/v1/process/{id}/trace
```

Returns the execution trace (timestamp, line, command) for debugging.

**Response:** Array of trace entries `{ timestamp, line, command }`, or `404 Not Found` when process not found

## Endpoints Summary

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/v1/process` | List all processes |
| `POST` | `/api/v1/process` | Create a new process |
| `GET` | `/api/v1/process/{id}` | Get process by ID |
| `PATCH` | `/api/v1/process/{id}` | Update process |
| `DELETE` | `/api/v1/process/{id}` | Delete process |
| `POST` | `/api/v1/process/{id}/run` | Run (start/resume) |
| `POST` | `/api/v1/process/{id}/load` | Load script into step mode |
| `POST` | `/api/v1/process/{id}/stop` | Stop process |
| `POST` | `/api/v1/process/{id}/resume` | Resume paused process |
| `POST` | `/api/v1/process/{id}/step` | Execute single line |
| `POST` | `/api/v1/process/{id}/reset` | Reset to first line |
| `POST` | `/api/v1/process/{id}/sethere` | Set execution line |
| `GET` | `/api/v1/process/{id}/trace` | Get execution trace |

## Process State

Process states:

| State | Description |
|-------|-------------|
| `Stopped` | Not running |
| `Loading` | Script is being loaded |
| `Paused` | Execution paused (e.g. breakpoint, user pause, or loaded via `load`) |
| `Running` | Actively executing |

Process updates are broadcast via SignalR to clients subscribed to process events. See [API Overview](./overview) for SignalR event details.

## Cross-References

- [Element APIs](./element-apis) — Script elements link to processes
- [API Overview](./overview) — SignalR `ProcessStateChanged`, `ProcessOutputReceived` events
- [Scripting](../scripting/introduction) — Script language reference
