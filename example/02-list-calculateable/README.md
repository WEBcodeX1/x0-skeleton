# Example: 02-list-calculateable

This example provides a small (micro) real-time editable Excel-like list with
three separate instances (sheets).

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
  - **Select/Deselect Column:** Left mouse click highlights the column.
  - **Context Menu (Right Click):**
    - Remove columns
    - Remove selected columns
    - Add column left
    - Add column right

### 2. Row Index
  - **Select/Deselect Row:** Left mouse click highlights the row.
  - **Context Menu (Right Click):**
    - Remove row
    - Remove selected rows
    - Add row

### 3. Column Matrix (Cell Area)
  - **Column Selection:**
    - Left mouse click sets the upper-left cell of the selection.
    - Shift + mouse click extends selection to the bottom-right cell.
    - Selected columns are highlighted.
  - **Context Menu:**
    - Copy selected celldata
    - Paste selected celldata

## Implementation Notes

Many lines of code in this example were adapted from the existing
**sysObjList.js** x0 base object.

For an experienced *x0-system* developer, modeling and implementing this
example took approximately 5–8 days.
