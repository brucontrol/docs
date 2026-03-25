---
id: file-manager
title: File Manager
sidebar_position: 7
---

# File Manager

The File Manager lets you browse, upload, download, and organize files on the server where BruControl is running. It is useful for managing scripts, configuration backups, alarm sounds, custom images, and other files without leaving the application.

## Accessing the File Manager

- **Route:** `/files`
- **Navigation:** Open the File Manager by navigating to `/files` in your browser (e.g., `http://localhost:5005/files` — use the same host and port as your BruControl web interface).

The File Manager opens in its own view, separate from the main Dashboard and Solution Explorer.

## Browsing Files

The File Manager shows a directory listing:

- **Current path** — Displayed at the top as a breadcrumb (e.g., `uploads` / `folder` / `subfolder`). Click any segment to jump to that level.
- **Folders** — Click a folder name or the **Open** button to enter it. Use the breadcrumb to go back to a parent folder.
- **Files** — Shown with name, type, size, and last modified date.
- **View modes** — Use **List View** or **Grid View** to switch between table and card layout. In grid view, image files show thumbnails.
- **Refresh** — Click **Refresh** to reload the current folder.

The root is the `uploads` folder inside the BruControl data directory (e.g., `Documents\BruControl\uploads` on Windows). You cannot browse outside this area for security reasons.

## Uploading Files

1. **Navigate** to the folder where you want to upload.
2. **Drag and drop** files from your computer onto the drop zone, or
3. **Click** **Upload Files** and select one or more files.
4. Files are uploaded to the current folder. If a file with the same name exists, BruControl appends a number (e.g., `file (1).txt`).

Use uploads for:

- **Alarm sounds** — Upload `.wav` or `.mp3` files to use as alarm sounds
- **Process scripts** — Store script files to reference or import from Processes
- **Configuration backups** — Save copies of `.brucfg` or other config files
- **Custom assets** — Images, sounds, or other resources for element templates

## Viewing and Downloading Files

1. **Navigate** to the file you want to open.
2. **Click** the file name or the **View** button. The file opens in a new browser tab.
3. For images, the browser displays them inline. For other types, the browser may display or download the file depending on its content type. Use your browser's save option (e.g., right-click → Save As) to save a copy to a specific location.

Use for:

- **Backing up** configuration or data files
- **Exporting** logs or reports
- **Retrieving** files you previously uploaded

## Creating Folders

1. **Navigate** to the parent folder where you want the new folder.
2. **Click** **New Folder**.
3. **Enter** a folder name in the prompt and confirm.
4. The new folder appears in the listing.

Use folders to organize scripts, backups, and other files.

## Renaming and Moving

- **Rename** — Click **Rename** on a file or folder, enter the new name in the prompt, and confirm.
- **Move** — Click **Move** on a file or folder, enter the destination path (relative to the uploads root, or blank for root), and confirm.

These actions help keep your file storage organized.

## Deleting Files and Folders

- **Delete** — Click **Delete** on a file or folder. Confirm when prompted.

:::danger
Deletion is permanent. Ensure you have backups of important files before deleting.
:::

## Use Cases

| Task | How |
|------|-----|
| **Back up configuration** | Upload or copy `.brucfg` files from Documents\BruControl to the file manager, or open them in a new tab and save to an external location |
| **Store alarm sounds** | Create a `sounds` folder, upload `.wav` files, then reference them in alarm element settings |
| **Store custom scripts** | Create a folder, upload script files, reference them from BruControl if supported |
| **Share files** | Upload files to a shared location accessible via the File Manager |
| **Organize backups** | Create dated folders (e.g., `backups/2024-03-08`) and upload config backups |

## File Picker Mode

In some parts of BruControl (e.g., selecting an alarm sound file or a custom asset path), a **File Picker** modal opens. It uses the same file storage and lets you choose an existing file instead of uploading a new one. Navigate to the file and click **Select** to confirm. The picker may filter by file type (e.g., audio only for alarm sounds).

## Technical Details

Files registered as media assets display their media slug, providing a stable URL reference.

- **Frontend:** `FileManager` component at `/files` route
- **Backend:** `FileUploadController` at `api/v1/files`; `FileStorageService` manages files under the user data directory's `uploads` subfolder
- **File serving:** Files are served at `/uploads/{path}` for viewing or downloading. Each file entry includes its `contentType` and direct `url` for access.

## Next Steps

- [Application Setup](./setup) — Configuration location and backup/restore
- [Log Viewer](./log-viewer) — View and search log files
- [Settings](./settings) — Configure data storage and other options (Solution Explorer → Settings)
