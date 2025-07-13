# Example #02 (Micro Excel List)

This example provides a small real-time editable Excel-like List with three
separate instances (sheets).

## Highly-Structured Code

This example demonstrates how complex objects and applications can be modeled
in *x0-system* while maintaining a highly structured codebase, even when extensive
real-time functionality is required.

## Functionality / Context-Menus

The *Micro Excel List* example is organized into three main areas:

- **Column Header**
- **Row Index**
- **Column Matrix**

### 1. Column Header
  - Select / deselect a column by left mouse-click, hilites column
  - Right click to open context-menu
    - Remove columns
    - Remove selected columns
    - Add column left
    - Add column right

### 2. Row Index
  - Select / deselect a row by left mouse-click, hilites row
  - Right click to open context-menu
    - Remove row
    - Remove selected rows
    - Add row

### 3. Column Matrix
  - Select columns by
    - Left mouse click selects upper left column (selection) coordinate
    - Shift mouse click selects bottom right column (selection) coordinate
    - Columns selection hilites now and can be selected by context-menu
      - Copy selected celldata
      - Paste selected celldata

## Implementation Notes

Many lines of code in this example were adapted from the existing
**sysObjList.js** x0 base object.

For an experienced *x0-system* developer, modeling and implementing this
example took approximately 5–8 days.
