---
id: technical-assistance
title: Technical Assistance
sidebar_position: 3
---

# Technical Assistance

When you run into an issue or have a question about BruControl, several support channels are available. This page covers how to find answers, where to ask for help, what information to include when contacting support, and how to locate and share log files for faster diagnosis.

## Self-Service Resources

Before reaching out to support, these resources often have the answer you need:

### BruControl Website

**Website:** [brucontrol.com](https://brucontrol.com)

- Product information and feature overview
- Firmware and application downloads
- Build resources, order lists, and hardware guides
- Documentation links

### Community Forums

**BruControl Community:** [brucontrol.com/community](https://brucontrol.com/community)

The BruControl community forum is an active place to ask questions, share projects and configurations, find solutions to common issues, and connect with other builders. Search the forum first — your question may already have been answered.

**HomeBrewTalk Forum:** [homebrewtalk.com](https://www.homebrewtalk.com)

The broader homebrewing community at HomeBrewTalk includes BruControl discussions, equipment advice, and integration ideas from users building brewing automation systems.

### Documentation

This documentation site covers:

- [Troubleshooting](./troubleshooting) — Interface detection, firmware upload issues, common errors, and control codes
- [Troubleshooting Network](./troubleshooting-network) — Network connectivity diagnostics
- [Interface Overview](./interface-overview) — Supported boards, I/O capabilities, firmware options
- [Interface-Specific](./interface-specific) — Per-board notes (WINC1500, ESP32, SPI sensors)

## Email Support

**BruControl Technical Support:** [info@brucontrol.com](mailto:info@brucontrol.com)

For direct technical assistance, include the following in your email:

1. **BruControl version** — Found in the application footer or via `GET /api/v1/version`
2. **Interface type** — Board model, firmware version, and connection method (Serial/Ethernet/Wi-Fi)
3. **Clear description** — What you were doing, what you expected, and what actually happened
4. **Steps to reproduce** — Numbered steps someone else could follow to see the same behavior
5. **Log files** — Attach relevant log files (see below)
6. **Screenshots** — If the issue involves the UI, include a screenshot showing the problem

:::tip Faster Resolution
The more specific and complete your support request, the faster the team can diagnose the issue. Vague reports like "it doesn't work" require multiple back-and-forth exchanges. A clear description with logs attached can often be resolved in a single reply.
:::

## Log Files for Support

Log files are the single most useful piece of information for diagnosing issues. They record application events, errors, communication traffic, and diagnostic messages.

### Log File Location

Log files are stored in:

| Platform | Path |
|----------|------|
| **Windows** | `Documents\BruControl\Logs` |
| **Linux / Docker** | `~/Documents/BruControl/Logs` |

File names use a daily rolling format: `brucontrol-YYYYMMDD.log` (e.g., `brucontrol-20260319.log`).

### What to Include

- **Logs from the time the issue occurred** — Include the full log file for that day, not just a snippet. The context before and after the error is often critical.
- **Multiple days if relevant** — If the issue started days ago, include logs from when it first appeared.
- **Don't truncate** — Support may need surrounding entries to understand the sequence of events.

:::warning Sensitive Data
Review log files before sharing. Remove or redact any passwords, license keys, or personal information that may appear in configuration entries or error messages.
:::

### Accessing Logs

There are three ways to access log files:

1. **Log Viewer in BruControl** — Navigate to `/logs` in the BruControl web UI to search, filter, and view log entries interactively.

2. **Logs API** — For programmatic or remote access:

   | Endpoint | Description |
   |----------|-------------|
   | `GET /api/v1/logs/files` | List available log files |
   | `GET /api/v1/logs/files/:fileName/content` | Read log file content (for display) |
   | `GET /api/v1/logs/files/:fileName` | Download log file |

3. **File system** — Copy files directly from the Logs directory listed above.

## License and Purchasing

- **Purchase a license:** [brucontrol.com/product/brucontrol-application/](https://brucontrol.com/product/brucontrol-application/)
- License authorization is typically sent via email within 12 hours of purchase
- **Evaluation license:** Available for a 15-day trial without a purchased activation key — request one from the application's license screen

:::info License Tiers
BruControl offers Basic, Advanced, and Professional licenses. Some features (Mock Mode, Data Exchange API) require a Professional license. See [Features](../features) for a complete comparison.
:::

## Before Contacting Support

Use this checklist to ensure you have gathered everything needed:

1. **Check the documentation** — Review [Troubleshooting](./troubleshooting), [Interface Overview](./interface-overview), and [Interface-Specific](./interface-specific) for known issues and solutions.
2. **Search the forums** — Your issue may have been solved by another user in the BruControl Community or HomeBrewTalk.
3. **Gather version info** — Application version, firmware version, interface board model, operating system.
4. **Collect logs** — Pull log files from the day(s) the issue occurred.
5. **Document the problem** — Write clear steps to reproduce: what you did, what you expected, what happened instead.
6. **Try a restart** — Many connectivity issues are resolved by restarting BruControl and/or power-cycling the interface.

## Next Steps

- [Troubleshooting](./troubleshooting) — Common issues and step-by-step resolution
- [Troubleshooting Network](./troubleshooting-network) — Network-specific diagnostics
- [Interface Overview](./interface-overview) — Board specs and I/O capabilities
