# Example: 02-list-calculateable

This example demonstrates how to implement a real-time, editable Excel-like list using the x0-system framework.

## Overview

The `02-list-calculateable` example showcases a dynamic, spreadsheet-style component with three separate instances ("sheets"), offering a reference implementation for:
- Creating and managing editable lists/tables.
- Real-time updates and interaction.
- Highly structured, modular code even for complex, interactive UIs.

## Folder Structure

```
example/
└── 02-list-calculateable/
    ├── database/
    │   ├── <db scripts>
    ├── docker/
    │   └── app.dockerfile
    ├── microesb/
    │   └── <backend scripts>
    ├── x0-backend/
    │   └── <backend logic>
    ├── x0-config/
    │   ├── menu.json
    │   ├── object.json
    │   └── skeleton.json
    ├── x0-objects/
    │   └── sysObjList.js
    ├── <source files>
    ├── README.md
```

## Features

- **Excel-like Editable List**: Real-time, browser-based editing with support for multiple sheets.
- **Column & Row Operations**: Add/remove/select columns and rows, both via UI and context menus.
- **Selection & Context Menus**: Advanced selection (shift/multiselect) and rich context menu actions (copy/paste, add/remove).
- **Highly Structured Codebase**: Modular organization for maintainability and extensibility.

## Usage

1. **Run the example**  
   The startup instructions depend on your main framework configuration. If a script is provided, run:

   ```bash
   ./activate
   ```
   or refer to the main repo documentation for custom commands.

2. **Explore the code**
   - Review the table/list definition and handling logic in `object.json` and `skeleton.json`.
   - Check the implementation of list-editing and context menu logic.

## How It Works

- **Editable Sheets**: Each instance represents a separate editable sheet.
- **Column Header**:  
  - *Select/Deselect*: Left click  
  - *Context menu*: Add/remove columns
- **Row Index**:  
  - *Select/Deselect*: Left click  
  - *Context menu*: Add/remove rows
- **Cell Area**:  
  - *Selection*: Click/shift-click for range selection  
  - *Context menu*: Copy/paste cell data
- **Real-Time Updates**: Changes are reflected immediately in the UI.

## Customization

- Add or modify context menu actions for new requirements.
- Adapt the structure of sheets, columns, and rows to your application's needs.
- Extend the component with new interactive features or data integrations.

## Development Time

An expirienced *x0-developer* took about 5-7 days to develop the application
based on existing `sysObjList.js` *x0-base-object*.

## References

- [x0-skeleton Repository](https://github.com/WEBcodeX1/x0-skeleton)
- [sysObjList.js (x0 base object)](https://github.com/WEBcodeX1/x0-skeleton/blob/main/example/02-list-calculateable/x0-objects/sysObjList.js)

---

*For advanced usage and customization, see the main x0-skeleton documentation.*
