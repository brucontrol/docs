---
id: quick-start
title: Quick Start Guide
sidebar_position: 4
---

# Quick Start Guide

Complete instructions for interface selection, wiring, firmware setup, and application usage follow in the detailed documentation. However, for experienced or technical users, this Quick Start guide may facilitate initial setup.

## Setup Steps

### 1. Review System Requirements

Review the [system requirements](./requirements) for your computer to ensure compatibility.

### 2. Interface Firmware Installation

Follow the [Interface Firmware Installation and Setup](./hardware/firmware-installation) steps to prepare your microcontroller interface.

### 3. Acquire a License

You have two options:

- **Evaluation License** — In Solution Explorer, expand **Settings** and click **License**, then select **Start Evaluation**. Enter your email, receive a verification code, enter the code, and your 15-day trial will activate.
- **Purchase License** - Visit [brucontrol.com](https://brucontrol.com/product/brucontrol-application/) to purchase a license
  - You will receive an email within 12 hours indicating license authorization

### 4. Application Setup

Follow the [Application Setup](./application/setup) steps to install and configure BruControl. When running the web application, open http://localhost:5005 in your browser (or the URL shown by your deployment).

### 5. Configure Your First Interface

Once BruControl is running:

1. In the **Solution Explorer** (left panel), locate the **Interfaces** folder
2. Right-click **Interfaces** and choose **New Interface**
3. In the dialog: enter a **name**, select **Device Type** (e.g., MEGA, ESP32), **Connection Type** (Network TCP or Serial Port), and **Wiring Map**
4. Click **Create Interface**
5. The interface appears under Interfaces. Expand Interfaces to see it. Select the interface in the tree to configure connection details (IP/port for TCP, or COM port for Serial) and enable it (required for creating device elements).

### 6. Create a Test Device Element

Test your setup with the onboard LED:

1. Right-click a **Workspace** in the Solution Explorer (create one first via right-click **Workspaces** → New Workspace if needed)
2. Choose **Device**
3. In the dialog:
   - Select the **Interface** (your microcontroller)
   - Select **Digital Output** as the element type
   - Select the **Port** (pin number of the onboard LED — see [Wiring Maps](./hardware/wiring-maps))
4. Click **Create Element** to create the device element

### 7. Test the Device Element

1. Ensure the interface is connected (green indicator next to it in Solution Explorer) and enabled
2. Select the workspace in Solution Explorer to view its **Dashboard** (main content area)
3. Locate the device element on the Dashboard and click it to toggle its ON and OFF state
4. The LED onboard the interface should illuminate and turn off accordingly

### 8. You're Ready!

You are now ready to continue setting up your BruControl system!

## Next Steps

Now that you have a working setup, explore these areas:

- [Hardware Overview](./hardware/overview) - Learn about supported interfaces
- [Device Elements](./elements/device-elements-overview) - Configure inputs and outputs
- [Workspaces](./application/workspaces) - Design your control interface
- [Scripting Basics](./scripting/introduction) - Automate your processes

## Need Help?

If you encounter any issues during setup:

- Check the [Troubleshooting Guide](./appendix/troubleshooting)
- Review the [Technical Assistance](./appendix/technical-assistance) section
- Visit the BruControl community forums
