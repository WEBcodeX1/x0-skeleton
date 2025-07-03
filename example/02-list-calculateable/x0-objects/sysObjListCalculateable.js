//-------1---------2---------3---------4---------5---------6---------7--------//
//- Copyright WEB/codeX, clickIT 2011 - 2025                                 -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//-                                                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//- SYSTEM OBJECT "ListCalculateable"                                        -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//-                                                                          -//
//-                                                                          -//
//-                                                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColRowIndexEmpty"
//------------------------------------------------------------------------------

function sysListCalculateableColRowIndexEmpty(ParentObject)
{
    this.ObjectID                  = 'TCRowIndex_'+ ParentObject.ObjectID + '_0';
    this.DOMStyle                  = 'col-1';

    this.DOMValue                  = '';
}

sysListCalculateableColRowIndexEmpty.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColHeaderSum"
//------------------------------------------------------------------------------

function sysListCalculateableColHeaderSum(ParentObject)
{
    this.ObjectID                  = 'TCHeader_'+ ParentObject.ObjectID + '_Sum';
    this.DOMStyle                  = 'col-sm h5 fw-bold';

    this.DOMValue                  = 'Sum';
}

sysListCalculateableColHeaderSum.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColRowSum"
//------------------------------------------------------------------------------

function sysListCalculateableColRowSum(ParentObject)
{
    this.ObjectID                  = 'TCRow_'+ ParentObject.ObjectID + '_Sum';
    this.DOMStyle                  = 'col-1 h5 fw-bold';

    this.DOMValue                  = 'Sum';
}

sysListCalculateableColRowSum.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColRowIndex"
//------------------------------------------------------------------------------

function sysListCalculateableColRowIndex(ParentObject, RowIndex)
{
    this.EventListeners            = new Object();          //- Event Listeners
    this.RowIndex                  = RowIndex;              //- Row Index

    this.ObjectID                  = 'TCRowIndex_'+ ParentObject.ObjectID + '_' + RowIndex;
    this.DOMStyle                  = 'col-1 h5 fw-bold';

    this.DOMValue                  = 'Row' + (RowIndex+1);
}

sysListCalculateableColRowIndex.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableColRowIndex.prototype.init = function()
{
    var EventListenerObj = new Object();
    EventListenerObj['Type'] = 'mousedown';
    EventListenerObj['Element'] = this.EventListenerRightClick.bind(this);
    this.EventListeners['ContextMenuOpen'] = EventListenerObj;

    var EventListenerObj = new Object();
    EventListenerObj['Type'] = 'mousedown';
    EventListenerObj['Element'] = this.EventListenerSelect.bind(this);
    this.EventListeners['RowSelect'] = EventListenerObj;
}


//------------------------------------------------------------------------------
//- METHOD "EventListenerRightClick"
//------------------------------------------------------------------------------

sysListCalculateableColRowIndex.prototype.EventListenerRightClick = function(Event)
{
    const RootObject = this.ParentObject.ParentObject;

    var ContextMenuItems = [
        {
            "ID": "Remove",
            "TextID": "TXT.CONTEXTMENU.REMOVE-ROW-SINGLE",
            "IconStyle": "fa-regular fa-trash-can",
            "InternalFunction": "remove"
        },
        {
            "ID": "RemoveSelected",
            "TextID": "TXT.CONTEXTMENU.REMOVE-ROWS-SELECTED",
            "IconStyle": "fa-regular fa-trash-can",
            "InternalFunction": "remove-selected"
        },
        {
            "ID": "AppendRow",
            "TextID": "TXT.CONTEXTMENU.APPEND-ROW",
            "IconStyle": "fa-solid fa-paste",
            "InternalFunction": "append-row"
        }
    ];

    //- check for right click on mousedown
    if (Event.button == 2 && ContextMenuItems !== undefined) {

        var ContextMenu = new sysContextMenu();

        ContextMenu.ID             = 'CtMenuRow_' + RootObject.ObjectID;
        ContextMenu.ItemConfig     = ContextMenuItems;
        ContextMenu.ScreenObject   = RootObject.ScreenObject;
        ContextMenu.ParentObject   = this;
        ContextMenu.pageX          = Event.pageX;
        ContextMenu.pageY          = Event.pageY;

        ContextMenu.RowObject      = this.ParentObject;

        ContextMenu.init();
    }
}


//------------------------------------------------------------------------------
//- METHOD "EventListenerSelect"
//------------------------------------------------------------------------------

sysListCalculateableColRowIndex.prototype.EventListenerSelect = function(Event)
{
    if (Event.button == 0) {
        var processed = false;
        if (this.ParentObject.Selected == true) {
            this.ParentObject.removeDOMElementStyle('text-bg-secondary');
            this.ParentObject.Selected = false;
            processed = true;
        }
        if (this.ParentObject.Selected == false && processed == false) {
            this.ParentObject.addDOMElementStyle('text-bg-secondary');
            this.ParentObject.Selected = true;
        }
    }
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColEmptyBottom"
//------------------------------------------------------------------------------

function sysListCalculateableColEmptyBottom(ParentObject)
{
    this.ObjectID                  = 'TCEmptyBottom_'+ ParentObject.ObjectID;
    this.DOMStyle                  = 'col-sm';

    this.DOMValue                  = '';
}

sysListCalculateableColEmptyBottom.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableHeaderCol"
//------------------------------------------------------------------------------

function sysListCalculateableHeaderCol(ParentObject, ColIndex)
{
    this.EventListeners            = new Object();          //- Event Listeners
    this.ChildObjects              = Array();               //- Child Objects

    this.ParentObject              = ParentObject;          //- Parent Object
    this.ParentObjectID            = ParentObject.ObjectID; //- Parent Object ObjectID

    this.ColIndex                  = ColIndex;              //- Col Index

    this.Selected                  = false;                 //- Selected Row

    this.overrideDOMObjectID       = true;                  //- Set ObjectID not recursive

    this.ObjectID                  = 'TC_'+ this.ParentObjectID + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm h5 fw-bold';

    this.DOMValue                  = 'Col' + (ColIndex+1);
}

sysListCalculateableHeaderCol.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableHeaderCol.prototype.init = function()
{
    var EventListenerObj = new Object();
    EventListenerObj['Type'] = 'mousedown';
    EventListenerObj['Element'] = this.EventListenerRightClick.bind(this);
    this.EventListeners['ContextMenuOpen'] = EventListenerObj;

    var EventListenerObj = new Object();
    EventListenerObj['Type'] = 'mousedown';
    EventListenerObj['Element'] = this.EventListenerSelect.bind(this);
    this.EventListeners['ColSelect'] = EventListenerObj;
}


//------------------------------------------------------------------------------
//- METHOD "EventListenerRightClick"
//------------------------------------------------------------------------------

sysListCalculateableHeaderCol.prototype.EventListenerRightClick = function(Event)
{
    var ContextMenuItems = [
        {
            "ID": "Remove",
            "TextID": "TXT.CONTEXTMENU.REMOVE-COL-SINGLE",
            "IconStyle": "fa-regular fa-trash-can",
            "InternalFunction": "remove"
        },
        {
            "ID": "RemoveSelected",
            "TextID": "TXT.CONTEXTMENU.REMOVE-COLS-SELECTED",
            "IconStyle": "fa-regular fa-trash-can",
            "InternalFunction": "remove-selected"
        },
        {
            "ID": "AddColLeft",
            "TextID": "TXT.CONTEXTMENU.ADD-COL-LEFT",
            "IconStyle": "fa-solid fa-paste",
            "InternalFunction": "append-row"
        },
        {
            "ID": "AddColRight",
            "TextID": "TXT.CONTEXTMENU.ADD-COL-RIGHT",
            "IconStyle": "fa-solid fa-paste",
            "InternalFunction": "append-row"
        }
    ];

    //- check for right click on mousedown
    if (Event.button == 2 && ContextMenuItems !== undefined) {

        var ContextMenu = new sysContextMenu();

        ContextMenu.ID             = 'CtMenu_' + this.ParentObject.ObjectID;
        ContextMenu.ItemConfig     = ContextMenuItems;
        ContextMenu.ScreenObject   = this.ParentObject.ParentObject.ScreenObject;
        ContextMenu.ParentObject   = this;
        ContextMenu.pageX          = Event.pageX;
        ContextMenu.pageY          = Event.pageY;

        ContextMenu.RowData        = this.RowData;
        ContextMenu.RowDataIndex   = this.Index;

        ContextMenu.RowObject      = this;

        ContextMenu.init();
    }
}


//------------------------------------------------------------------------------
//- METHOD "EventListenerSelect"
//------------------------------------------------------------------------------

sysListCalculateableHeaderCol.prototype.EventListenerSelect = function(Event)
{
    if (Event.button == 0) {
        var processed = false;
        if (this.Selected == true) {
            this.removeDOMElementStyle('text-bg-secondary');
            this.Selected = false;
            processed = true;
        }
        if (this.Selected == false && processed == false) {
            this.addDOMElementStyle('text-bg-secondary');
            this.Selected = true;
        }
    }
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableSumCol"
//------------------------------------------------------------------------------

function sysListCalculateableSumCol(ParentObject, RowIndex)
{
    this.ChildObjects              = Array();               //- Child Objects

    this.ParentObject              = ParentObject;          //- Parent Object
    this.ParentObjectID            = ParentObject.ObjectID; //- Parent Object ObjectID

    this.RowIndex                  = RowIndex;              //- Row Index

    this.overrideDOMObjectID       = true;                  //- Set ObjectID not recursive

    this.ObjectID                  = 'TCSum_'+ this.ParentObjectID + '_' + RowIndex;
    this.DOMStyle                  = 'col-sm';
}

sysListCalculateableSumCol.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableSumCol.prototype.init = function()
{
    const SheetObjectID = this.ParentObject.ParentObject.ObjectID;

    this.FormFieldText = new sysFormfieldItem();
    this.FormFieldText.ObjectID = 'FormSumCol_' + SheetObjectID + '_' + this.RowIndex;

    this.FormFieldText.JSONConfig = {
        "Attributes": {
            "ObjectType": "FormfieldText",
            "Type": "text",
            "Value": 0,
            "Disabled": true,
            "Style": "form-control w-100 rounded-1"
        }
    }

    this.FormFieldText.FormItemInit();
    this.addObject(this.FormFieldText);
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableRowSum"
//------------------------------------------------------------------------------

function sysListCalculateableRowSum(ParentObject, ColIndex)
{
    this.ChildObjects              = Array();               //- Child Objects

    this.ParentObject              = ParentObject;          //- Parent Object
    this.ParentObjectID            = ParentObject.ObjectID; //- Parent Object ObjectID

    this.ColIndex                  = ColIndex;              //- Col Index

    this.overrideDOMObjectID       = true;                  //- Set ObjectID not recursive

    this.ObjectID                  = 'TCRowSum_'+ this.ParentObjectID + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm';
}

sysListCalculateableRowSum.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableRowSum.prototype.init = function()
{
    const SheetObjectID = this.ParentObject.ParentObject.ObjectID;

    this.FormFieldText = new sysFormfieldItem();
    this.FormFieldText.ObjectID = 'FormRowSumCol_' + SheetObjectID + '_' + this.ColIndex;

    this.FormFieldText.JSONConfig = {
        "Attributes": {
            "ObjectType": "FormfieldText",
            "Type": "text",
            "Value": 0,
            "Disabled": true,
            "Style": "form-control w-100 rounded-1"
        }
    }

    this.FormFieldText.FormItemInit();
    this.addObject(this.FormFieldText);
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableCol"
//------------------------------------------------------------------------------

function sysListCalculateableCol(ParentObject, RowIndex, ColIndex)
{
    this.EventListeners            = new Object();          //- Event Listeners
    this.ChildObjects              = Array();               //- Child Objects

    this.ParentObject              = ParentObject;          //- Parent Object
    this.ParentObjectID            = ParentObject.ObjectID; //- Parent Object ObjectID

    this.RowIndex                  = RowIndex;              //- Row Index
    this.ColIndex                  = ColIndex;              //- Col Index

    this.Selected                  = false;                 //- Selected Row

    this.overrideDOMObjectID       = true;                  //- Set ObjectID not recursive

    this.ObjectID                  = 'TC_'+ this.ParentObjectID + '_' + RowIndex + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm';
}

sysListCalculateableCol.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.init = function()
{
    const SheetObjectID = this.ParentObject.ParentObject.ObjectID;

    this.FormFieldText = new sysFormfieldItem();
    this.FormFieldText.ObjectID = 'Form_' + SheetObjectID + '_' + this.RowIndex + '_' + this.ColIndex;

    this.FormFieldText.JSONConfig = {
        "Attributes": {
            "ObjectType": "FormfieldText",
            "Type": "text",
            "Value": 0,
            "Style": "form-control w-100 rounded-1"
        }
    }

    this.FormFieldText.EventListeners["OnChangeColItem"] = {
        "Type": 'change',
        "Element": this.processOnChangeColItem.bind(this)
    };

    this.FormFieldText.FormItemInit();
    this.addObject(this.FormFieldText);
}


//------------------------------------------------------------------------------
//- METHOD "processOnChangeColItem"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.processOnChangeColItem = function()
{
    let RowObj = this.ParentObject;
    let RootObj = RowObj.ParentObject;

    //- process sum for single rows (output to sum column)
    var SumCol;
    for (let x=0; x<(RootObj.RowItems.length)-2; ++x) {

        SumCol = 0;
        for (let y=0; y<RootObj.ColumnCount; ++y) {
            const SrcColObj = sysFactory.getObjectByID('Form_' + RootObj.ObjectID + '_' + x + '_' + y);
            SumCol += parseFloat(SrcColObj.RuntimeGetDataFunc());
        }

        const DstColID = 'FormSumCol_' + RootObj.ObjectID + '_' + x;
        sysFactory.getObjectByID(DstColID).RuntimeSetDataFunc(SumCol);
    }

    //- process sum for single columns (output to sum row)
    var SumRow = 0;
    for (let x=0; x<RootObj.ColumnCount; ++x) {

        SumRow = 0;
        for (let y=0; y<(RootObj.RowItems.length)-2; ++y) {
            const SrcColObj = sysFactory.getObjectByID('Form_' + RootObj.ObjectID + '_' + y + '_' + x);
            SumRow += parseFloat(SrcColObj.RuntimeGetDataFunc());
        }

        const DstColID = 'FormRowSumCol_' + RootObj.ObjectID + '_' + x;
        sysFactory.getObjectByID(DstColID).RuntimeSetDataFunc(SumRow);
    }
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableHeaderRow"
//------------------------------------------------------------------------------

function sysListCalculateableHeaderRow(ParentObject)
{
    this.EventListeners            = new Object();       //- Event Listeners
    this.ChildObjects              = Array();            //- Child Objects

    this.ParentObject              = ParentObject;       //- Parent Object

    this.ColItems                  = new Array();        //- Col Items Array

    this.overrideDOMObjectID       = true;               //- Set ObjectID not recursive

    this.ObjectID                  = 'TRHeader_'+ ParentObject.ObjectID;
    this.DOMStyle                  = 'row'
}

sysListCalculateableHeaderRow.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "addColumns"
//------------------------------------------------------------------------------

sysListCalculateableHeaderRow.prototype.addColumns = function()
{
    const ColRowIndex = new sysListCalculateableColRowIndexEmpty(this);
    this.ColItems.push(ColRowIndex);

    for (let x=0; x<this.ParentObject.ColumnCount; ++x) {
        const ColumnItem = new sysListCalculateableHeaderCol(this, x);
        ColumnItem.init();
        this.ColItems.push(ColumnItem);
    }

    const ColHeaderSum = new sysListCalculateableColHeaderSum(this);
    this.ColItems.push(ColHeaderSum);

    for (const ColItem of this.ColItems) {
        this.addObject(ColItem);
    }
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableSumRow"
//------------------------------------------------------------------------------

function sysListCalculateableSumRow(ParentObject)
{
    this.ChildObjects              = Array();            //- Child Objects

    this.ParentObject              = ParentObject;       //- Parent Object

    this.ColItems                  = new Array();        //- Col Items Array

    this.overrideDOMObjectID       = true;               //- Set ObjectID not recursive

    this.ObjectID                  = 'TRSum_'+ ParentObject.ObjectID;
    this.DOMStyle                  = 'row'
}

sysListCalculateableSumRow.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "addColumns"
//------------------------------------------------------------------------------

sysListCalculateableSumRow.prototype.addColumns = function()
{
    const ColRowSum = new sysListCalculateableColRowSum(this);
    this.ColItems.push(ColRowSum);

    for (let x=0; x<this.ParentObject.ColumnCount; ++x) {
        const ColumnItem = new sysListCalculateableRowSum(this, x);
        ColumnItem.init();
        this.ColItems.push(ColumnItem);
    }

    const ColEmpty = new sysListCalculateableColEmptyBottom(this);
    this.ColItems.push(ColEmpty);

    for (const ColItem of this.ColItems) {
        this.addObject(ColItem);
    }
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableRow"
//------------------------------------------------------------------------------

function sysListCalculateableRow(ParentObject, RowIndex)
{
    this.EventListeners            = new Object();       //- Event Listeners
    this.ChildObjects              = Array();            //- Child Objects

    this.ParentObject              = ParentObject;       //- Parent Object

    this.Index                     = RowIndex;           //- Row Index
    this.Selected                  = false;              //- Selected Row

    this.ColItems                  = new Array();        //- Col Items Array

    this.overrideDOMObjectID       = true;               //- Set ObjectID not recursive

    this.RuntimeGetDataFunc        = this.getRowData;    //- Get Runtime Data
    this.RuntimeSetDataFunc        = undefined;          //- To be implemented

    this.ObjectID                  = 'TR_'+ ParentObject.ObjectID + '_' + RowIndex;
    this.DOMStyle                  = 'row'
}

sysListCalculateableRow.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "addColumns"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.addColumns = function()
{
    const ColRowIndex = new sysListCalculateableColRowIndex(this, this.Index);
    ColRowIndex.init();
    this.ColItems.push(ColRowIndex);

    for (let x=0; x<this.ParentObject.ColumnCount; ++x) {
        const ColumnItem = new sysListCalculateableCol(this, this.Index, x);
        ColumnItem.init();
        this.ColItems.push(ColumnItem);
    }

    const ColSum = new sysListCalculateableSumCol(this, this.Index);
    ColSum.init();
    this.ColItems.push(ColSum);

    for (const ColItem of this.ColItems) {
        this.addObject(ColItem);
    }
}


//------------------------------------------------------------------------------
//- METHOD "updateColumnsValues"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.updateColumnsValues = function()
{
    console.debug('this.DynUpdateObjects:%o', this.DynUpdateObjects);
    for (const UpdateElement of this.DynUpdateObjects) {
        sysFactory.getObjectByID(UpdateElement[0]).RuntimeSetDataFunc(UpdateElement[1]);
    }
}


//------------------------------------------------------------------------------
//- METHOD "getRowData"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.getRowData = function()
{
    return this.RowData;
}


//------------------------------------------------------------------------------
//- METHOD "getColumnById"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.getColumnById = function(Column)
{
    for (const ColItem of this.ColItems) {
        MatchId = 'Column' + Column + '_' + this.Index;
        //console.debug('MatchId:%s ColObjectID:%s', MatchId, ColItem.ObjectID);
        if (ColItem.ObjectID == MatchId) {
            return ColItem;
        }
    }
}


//------------------------------------------------------------------------------
//- METHOD "remove"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.remove = function()
{
    this.ParentObject.removeRow(this.Index);
}


//------------------------------------------------------------------------------
//- METHOD "updateIndex"
//------------------------------------------------------------------------------

sysListCalculateableRow.prototype.updateIndex = function(UpdateIndex)
{
    this.Index = UpdateIndex;
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateable"
//------------------------------------------------------------------------------

function sysListCalculateable()
{
    this.RuntimeGetDataFunc     = this.getRuntimeData;       //- Get Runtime Data
    this.RuntimeSetDataFunc     = this.appendData;           //- Set Runtime Data
    this.RuntimeAppendDataFunc  = this.appendData;           //- Append Runtime Data

    this.RowItems               = new Array();               //- Row Objects Array

    this.UpdateCount            = 0;                         //- Update Counter

    this.ColumnCount            = 4;                         //- Default Column Count
    this.ColumnCountMax         = 8;                         //- Max Column Count
    this.RowCount               = 8;                         //- Default Row Count
    this.RowCountMax            = 14;                        //- Max Row Count

    this.ChildObjects           = new Array();               //- Child Objects

    this.RowsSelectable         = true;                      //- Multi Row Selection Default
    this.DOMStyle               = 'container';
}

sysListCalculateable.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "processSourceObjects"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.processSourceObjects = sysSourceObjectHandler.prototype.processSourceObjects;


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.init = function()
{
    //console.debug('::List init ObjectID:%s', this.ObjectID);
    const Attributes = this.JSONConfig.Attributes;

    this.DOMStyle = Attributes.Style;

    if (Attributes.ColumnCount !== undefined) {
        this.ColumnCount = Attributes.ColumnCount;
    }

    if (Attributes.RowCount !== undefined) {
        this.RowCount = Attributes.RowCount;
    }

    //- add header row
    this.addHeaderRow();

    //- add rows / columns
    for (let i=0; i<this.RowCount; ++i) {
        this.addRow(i);
    }

    //- add sum row
    this.addSumRow();

    //- render matrix
    this.renderRows();

    //- register event listeners
    this.processEventListener();
}


//------------------------------------------------------------------------------
//- METHOD "addHeaderRow"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.addHeaderRow = function()
{
    var RowObj = new sysListCalculateableHeaderRow(this);
    RowObj.addColumns();
    this.RowItems.push(RowObj);
}


//------------------------------------------------------------------------------
//- METHOD "addRow"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.addRow = function(Index)
{
    var RowObj = new sysListCalculateableRow(this, Index);
    RowObj.addColumns();
    this.RowItems.push(RowObj);
}


//------------------------------------------------------------------------------
//- METHOD "addSumRow"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.addSumRow = function()
{
    var RowObj = new sysListCalculateableSumRow(this);
    RowObj.addColumns();
    this.RowItems.push(RowObj);
}


//------------------------------------------------------------------------------
//- METHOD "removeRow"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.removeRow = function(Index)
{
    console.debug('Remove Row Index:%s', Index);
    this.RowItems.splice(Index, 1);
    this.ServiceData.splice(Index, 1);
    this.renderRows();
}


//------------------------------------------------------------------------------
//- METHOD "removeSelectedRows"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.removeSelectedRows = function()
{
    var RemoveArray = new Array();
    for (const Item of this.RowItems) {
        if (Item.Selected == true) {
            RemoveArray.push(Item.Index);
        }
    }

    for (var i = RemoveArray.length-1; i>=0; i--) {
        console.debug('Remove Row selected Index:%s', RemoveArray[i]);
        this.RowItems.splice(RemoveArray[i], 1);
        this.ServiceData.splice(RemoveArray[i], 1);
    }

    this.renderRows();
}


//------------------------------------------------------------------------------
//- METHOD "renderRows"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.renderRows = function()
{
    for (const RowItem of this.RowItems) {
        this.addObject(RowItem);
    }
    //this.renderObject(this.DOMParentID);
}


//------------------------------------------------------------------------------
//- METHOD "getColumnItems"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.getColumnItems = function(ColumnID)
{
    //console.debug('::getColumnItems ColumnID:%s RowItems:%o', ColumnID, this.RowItems);
    var ReturnItems = new Array();
    for (Index in this.RowItems) {
        const Row = this.RowItems[Index];
        const ColumnObject = Row.ObjectRef[ColumnID];
        //console.debug('::getColumnItems ColumnObject:%o', ColumnObject);
        if (ColumnObject !== undefined) {
            ReturnItems.push(ColumnObject);
        }
    }
    return ReturnItems;
}


//------------------------------------------------------------------------------
//- METHOD "getRowByIndex"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.getRowByIndex = function(Index)
{
    return this.RowItems[Index];
}


//------------------------------------------------------------------------------
//- METHOD "getRuntimeData"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.getRuntimeData = function()
{
    return this.RowItems;
}


//------------------------------------------------------------------------------
//- METHOD "appendData"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.appendData = function()
{
    console.debug('::appendData Data:%o', DataObj);

    const Attributes = this.JSONConfig.Attributes;

    const ErrorObj = sysFactory.getObjectByID(this.JSONConfig.Attributes.ErrorContainer);
    if (ErrorObj !== undefined) {
        ErrorObj.reset();
    }

    const MaxRows = Attributes.DataMaxRows;
    if (this.ServiceData.length >= MaxRows && ErrorObj !== undefined) {
        ErrorObj.displayError(sysFactory.getText('TXT.SYS.ERROR.TABLE.MAX-ROW-COUNT')) + MaxRows + '.';
        return;
    }

    this.addRow(this.RowItems.length+1);
    this.renderRows();
}
