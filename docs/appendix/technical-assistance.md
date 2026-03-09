---
id: technical-assistance
title: Technical Assistance
sidebar_position: 3
---

# Technical Assistance

Technical assistance, troubleshooting, and build resources are available through the following channels.

## BruControl Website

**Website:** [brucontrol.com](https://brucontrol.com)

- Product information
- Download firmware and application
- Build resources and order lists
- Documentation and support links

## Community Forums

**BruControl Community:** [brucontrol.com/community](https://brucontrol.com/community)

- Ask questions
- Share projects and configurations
- Connect with other users
- Find solutions to common issues

**HomeBrewTalk Forum:** [homebrewtalk.com](https://www.homebrewtalk.com)

- Broader homebrewing community
- BruControl discussions and integrations
- Equipment and process advice

## Email Support

**BruControl Technical Support:** info@brucontrol.com

For direct technical assistance, include:

- A clear description of the issue
- Steps to reproduce
- BruControl version and interface type
- Relevant log files (see below)

## Log Files for Support

When contacting support, log files help diagnose issues quickly.

### Location

Log files are typically stored in:

```
Documents\BruControl\Logs
```

(`~/Documents/BruControl/Logs` on Linux.)

File names use a daily rolling format: `brucontrol-YYYYMMDD.log` (e.g. `brucontrol-20260308.log`).

### What to Include

- **Recent logs** — From the time the issue occurred
- **Full context** — Don't truncate; support may need to see surrounding entries
- **Sensitive data** — Remove or redact any passwords, license keys, or personal information before sharing

### Accessing Logs

- Use the **Log Viewer** in BruControl (route: `/logs`) to search and filter
- Use the **Logs API** (`GET /api/v1/logs/files` to list, `GET /api/v1/logs/files/:fileName/content` for content, `GET /api/v1/logs/files/:fileName` to download) for programmatic access
- Manually copy files from the Logs directory

## License and Purchasing

- **Purchase:** [brucontrol.com/product/brucontrol-application/](https://brucontrol.com/product/brucontrol-application/)
- License authorization is typically sent via email within 12 hours
- **Evaluation license:** Available for 15 days without activation

## Before Contacting Support

1. **Check the documentation** — [Troubleshooting](./troubleshooting), [Interface Overview](./interface-overview), [Interface-Specific](./interface-specific)
2. **Search the forums** — Your issue may have been solved by others
3. **Gather information** — Version, interface type, error messages, log excerpts
4. **Describe steps** — What you did, what you expected, what actually happened
