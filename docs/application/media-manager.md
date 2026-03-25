---
id: media-manager
title: Media Manager
sidebar_position: 8
---

# Media Manager

The Media Manager provides a way to upload and manage media assets — images, sounds, and other files — that can be referenced by element templates using stable URL slugs. Unlike direct file paths, slugs give you a fixed reference that doesn't break if a file is renamed or moved.

## Accessing the Media Manager

- Click **Media** in the Solution Explorer tree.
- The Media Manager replaces the Dashboard view when selected, using the same toolbar layout as other main views.

## Uploading Files

1. Click the **Upload** button (arrow icon) in the toolbar, or
2. Select one or more files from the file picker.

Uploaded files are stored in the server's `uploads` directory and immediately appear in the media list.

## Viewing Media

The toolbar provides a **view mode toggle** to switch between two layouts:

- **List view** (default) — A table showing preview thumbnail, name, slug, file size, and file path for each item. Columns include:
  - **Preview** — 32×32 thumbnail for images; a placeholder label for audio and other file types.
  - **Name** — The original file name.
  - **Slug** — The assigned slug (or a dash if none). Click to edit.
  - **Size** — Human-readable file size (B, KB, MB, GB).
  - **Path** — The file's path under `uploads`.
  - **Actions** — Delete button.

- **Grid view** — Cards with a square image preview, file name, slug, and metadata (size and path). Each card has a delete button in the top-right corner.

Click **Refresh** (rotate icon) to reload the media list from the server.

## Media Slugs

Slugs are the core feature that distinguishes the Media Manager from the File Manager. A slug is a short, human-readable identifier assigned to a media file that provides a stable URL for referencing it.

### How Slugs Work

Each media file can be assigned a slug. The server resolves slugs to file paths via the `/api/v1/media/resolve?slug=<slug>` endpoint. Element templates reference media by slug rather than by file path, so renaming or reorganizing files doesn't break template references.

For example, an element template can set an image URL to the slug `my_boiler_img`, and the system resolves it to the actual file path at runtime.

### Slug Rules

- Lowercase letters (`a-z`), digits (`0-9`), hyphens (`-`), and underscores (`_`) only
- No spaces
- Maximum 64 characters
- Must be unique across all media items

### Editing a Slug

1. In list view, click the **edit** (pencil) icon or the slug text in the Slug column.
2. In grid view, click the pencil icon or slug text below the preview.
3. Type the new slug and press **Enter** to save, or **Escape** to cancel.
4. Clicking away from the input also saves the value.

If the slug is invalid or already in use, an error message is displayed.

## Deleting Media

1. Click the **Delete** button on the file's row (list view) or card (grid view).
2. Confirm the deletion in the dialog — this action cannot be undone.

Deletion removes the file from disk and invalidates any slug that pointed to it.

## API Endpoints

The Media Manager is backed by the `MediaController` at `/api/v1/media`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/media` | List all media items with their slugs, sizes, and content types. |
| `GET` | `/api/v1/media/slugs` | Get all slug strings (used for IntelliSense autocomplete). |
| `GET` | `/api/v1/media/resolve?slug=<slug>` | Resolve a slug to its file URL path. Returns 404 if not found. |
| `PATCH` | `/api/v1/media` | Create or update a slug mapping. Body: `{ "slug": "...", "path": "..." }`. |
| `DELETE` | `/api/v1/media/{slug}` | Delete a slug mapping. The underlying file is not removed by this endpoint. |

File upload and deletion use the shared file management endpoints (`POST /api/v1/files`, `DELETE /api/v1/files`), not the media controller directly.

### Data Model

Each media item returned by the API has the following shape:

```json
{
  "path": "images/boiler.png",
  "slug": "my_boiler_img",
  "name": "boiler.png",
  "size": 24576,
  "contentType": "image/png",
  "isDirectory": false
}
```

## Difference from File Manager

The **File Manager** (accessed at `/files`) provides general-purpose file storage under the `uploads` directory — browsing folders, creating directories, renaming files, and downloading.

The **Media Manager** (accessed via the Solution Explorer) adds a slug-based referencing layer on top of the same file storage. Use the Media Manager when you need stable, path-independent references for assets used by element templates (images, sounds, etc.). Use the File Manager for general file organization and management tasks.
