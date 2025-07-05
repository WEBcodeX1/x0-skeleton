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
    this.overrideDOMObjectID       = true;  //- Override Recursive ObjectID

    this.ObjectID                  = 'TCRowIndex_'+ ParentObject.ObjectID + '_0';
    this.DOMStyle                  = 'col-1 border-bottom border-dark border-3';

    this.DOMValue                  = '';
}

sysListCalculateableColRowIndexEmpty.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColHeaderSum"
//------------------------------------------------------------------------------

function sysListCalculateableColHeaderSum(ParentObject)
{
    this.overrideDOMObjectID       = true;  //- Override Recursive ObjectID

    this.ObjectID                  = 'TCHeader_'+ ParentObject.ObjectID + '_Sum';
    this.DOMStyle                  = 'col-sm h7 fw-bold border-bottom border-dark border-3';

    this.DOMValue                  = 'Sum';
}

sysListCalculateableColHeaderSum.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColRowSum"
//------------------------------------------------------------------------------

function sysListCalculateableColRowSum(ParentObject)
{
    this.overrideDOMObjectID       = true;  //- Override Recursive ObjectID

    this.ObjectID                  = 'TCRow_'+ ParentObject.ObjectID + '_Sum';
    this.DOMStyle                  = 'col-1 h5 fw-bold border-top border-dark border-3';

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

    this.overrideDOMObjectID       = true;                  //- Override Recursive ObjectID

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
//- METHOD "remove"
//------------------------------------------------------------------------------

sysListCalculateableColRowIndex.prototype.remove = function()
{
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "sysListCalculateableColEmptyBottom"
//------------------------------------------------------------------------------

function sysListCalculateableColEmptyBottom(ParentObject)
{
    this.ObjectID                  = 'TCEmptyBottom_'+ ParentObject.ObjectID;
    this.DOMStyle                  = 'col-sm border-top border-dark border-3';

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

    this.overrideDOMObjectID       = true;                  //- Override Recursive ObjectID

    this.ObjectID                  = 'TC_'+ this.ParentObjectID + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm h7 fw-bold border-bottom border-dark border-3';

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
    const SheetObject = this.ParentObject.ParentObject;
    const HiliteStyle = 'text-bg-secondary';

    if (Event.button == 0) {
        var processed = false;

        //- deselect
        if (this.Selected == true) {
            this.removeDOMElementStyle(HiliteStyle);
            this.Selected = false;
            for (let x=0; x<(SheetObject.RowItems.length)-2; ++x) {
                const HiliteObj = sysFactory.getObjectByID('TC_TR_' + SheetObject.ObjectID + '_' + x + '_' + x + '_' + this.ColIndex);
                HiliteObj.removeDOMElementStyle(HiliteStyle);
            }
            const HiliteSumObj = sysFactory.getObjectByID('TCRowSum_TRSum_' + SheetObject.ObjectID + '_' + this.ColIndex);
            HiliteSumObj.removeDOMElementStyle(HiliteStyle);
            processed = true;
        }

        //- select
        if (this.Selected == false && processed == false) {
            this.addDOMElementStyle(HiliteStyle);
            for (let x=0; x<(SheetObject.RowItems.length)-2; ++x) {
                const HiliteObj = sysFactory.getObjectByID('TC_TR_' + SheetObject.ObjectID + '_' + x + '_' + x + '_' + this.ColIndex);
                HiliteObj.addDOMElementStyle(HiliteStyle);
            }
            const HiliteSumObj = sysFactory.getObjectByID('TCRowSum_TRSum_' + SheetObject.ObjectID + '_' + this.ColIndex);
            HiliteSumObj.addDOMElementStyle(HiliteStyle);
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

    this.overrideDOMObjectID       = true;                  //- Override Recursive ObjectID

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

    this.overrideDOMObjectID       = true;                  //- Override Recursive ObjectID

    this.ObjectID                  = 'TCRowSum_'+ this.ParentObjectID + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm border-top border-dark border-3';
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

    this.RuntimeGetDataFunc        = this.getData;          //- Get Runtime Data
    this.RuntimeSetDataFunc        = this.setData;          //- Set Runtime Data

    this.ParentObject              = ParentObject;          //- Parent Object
    this.ParentObjectID            = ParentObject.ObjectID; //- Parent Object ObjectID

    this.RowIndex                  = RowIndex;              //- Row Index
    this.ColIndex                  = ColIndex;              //- Col Index

    this.Selected                  = false;                 //- Selected Row

    this.overrideDOMObjectID       = true;                  //- Override Recursive ObjectID

    this.ObjectID                  = 'TC_'+ this.ParentObjectID + '_' + RowIndex + '_' + ColIndex;
    this.DOMStyle                  = 'col-sm';
}

sysListCalculateableCol.prototype = new sysBaseObject();


//------------------------------------------------------------------------------
//- METHOD "init"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.init = function()
{
    this.SheetObject = this.ParentObject.ParentObject;
    this.SheetObjectID = this.SheetObject.ObjectID;

    this.FormFieldText = new sysFormfieldItem();
    this.FormFieldText.ObjectID = 'Form_' + this.SheetObjectID + '_' + this.RowIndex + '_' + this.ColIndex;

    this.FormFieldText.JSONConfig = {
        "Attributes": {
            "ObjectType": "FormfieldText",
            "Type": "text",
            "Value": 0,
            "ValidateRef": "Float",
            "Style": "form-control w-100 rounded-1"
        }
    }

    this.FormFieldText.EventListeners["OnChangeColItem"] = {
        "Type": 'change',
        "Element": this.processOnChangeColItem.bind(this)
    };

    this.FormFieldText.FormItemInit();
    this.addObject(this.FormFieldText);

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

sysListCalculateableCol.prototype.EventListenerRightClick = function(Event)
{
    var ContextMenuItems = [
        {
            "ID": "Copy",
            "TextID": "TXT.CONTEXTMENU.COLDATA-COPY",
            "IconStyle": "fa-solid fa-copy",
            "InternalFunction": "get-data"
        },
        {
            "ID": "Paste",
            "TextID": "TXT.CONTEXTMENU.COLDATA-PASTE",
            "IconStyle": "fa-solid fa-paste",
            "InternalFunction": "set-data"
        }
    ];

    //- check for right click on mousedown
    if (Event.button == 2) {

        var ContextMenu = new sysContextMenu();

        ContextMenu.ID             = 'CtMenu_CopyPaste_' + this.SheetObjectID;
        ContextMenu.ItemConfig     = ContextMenuItems;
        ContextMenu.ScreenObject   = this.SheetObject.ScreenObject;
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

sysListCalculateableCol.prototype.EventListenerSelect = function(Event)
{
    //- left click (select upper left corner)
    if (Event.button == 0 && Event.shiftKey == false) {
        this.SheetObject.ColDataSelUpLeftCol = this.ColIndex;
        this.SheetObject.ColDataSelUpLeftRow = this.RowIndex;
    }

    //- left click and shift key (select bottom right corner)
    if (Event.button == 0 && Event.shiftKey) {

        this.SheetObject.ColDataSelBotRightCol = this.ColIndex;
        this.SheetObject.ColDataSelBotRightRow = this.RowIndex;

        const XCoordStart = this.SheetObject.ColDataSelUpLeftCol;
        const XCoordEnd = this.SheetObject.ColDataSelBotRightCol+1;
        const YCoordStart = this.SheetObject.ColDataSelUpLeftRow;
        const YCoordEnd = this.SheetObject.ColDataSelBotRightRow+1;

        console.log('XStart:%s XEnd:%s YStart:%s YEnd:%s', XCoordStart, XCoordEnd, YCoordStart, YCoordEnd);

        //- reset hilited (all columns)
        for (let x=0; x<(this.SheetObject.RowItems.length)-2; ++x) {
            for (let y=0; y<this.SheetObject.ColumnCount; ++y) {
                const SetHiliteObj = sysFactory.getObjectByID('Form_' + this.SheetObject.ObjectID + '_' + x + '_' + y);
                SetHiliteObj.removeDOMElementStyle('text-bg-info');
            }
        }

        //- hilite selected area
        for (let x=XCoordStart; x<XCoordEnd; ++x) {
            for (let y=YCoordStart; y<YCoordEnd; ++y) {
                const SetHiliteObj = sysFactory.getObjectByID('Form_' + this.SheetObject.ObjectID + '_' + y + '_' + x);
                SetHiliteObj.addDOMElementStyle('text-bg-info');
            }
        }

    }
}


//------------------------------------------------------------------------------
//- METHOD "processOnChangeColItem"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.processOnChangeColItem = function()
{
    const r = this.FormFieldText.validate()
    const ErrorContainer = sysFactory.getObjectByID(this.SheetObject.JSONConfig.Attributes.ErrorContainer);

    if (r == false) {

        ErrorContainer.reset();

        this.FormFieldText.removeDOMElementStyle('alert alert-success p-2');

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
    else {
        ErrorContainer.displayError(r.Message + '.');
    }
}


//------------------------------------------------------------------------------
//- METHOD "getData"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.getData = function()
{
    const XCoordStart = this.SheetObject.ColDataSelUpLeftCol;
    const XCoordEnd = this.SheetObject.ColDataSelBotRightCol+1;
    const YCoordStart = this.SheetObject.ColDataSelUpLeftRow;
    const YCoordEnd = this.SheetObject.ColDataSelBotRightRow+1;

    //- reset hilited (all columns)
    for (let x=0; x<(this.SheetObject.RowItems.length)-2; ++x) {
        for (let y=0; y<this.SheetObject.ColumnCount; ++y) {
            const SetHiliteObj = sysFactory.getObjectByID('Form_' + this.SheetObject.ObjectID + '_' + x + '_' + y);
            SetHiliteObj.removeDOMElementStyle('text-bg-info');
        }
    }

    //- get selected data
    var MatrixData = new Array();
    for (let x=XCoordStart; x<XCoordEnd; ++x) {
        var ColData = new Array();
        for (let y=YCoordStart; y<YCoordEnd; ++y) {
            const GetFormID = 'Form_' + this.SheetObject.ObjectID + '_' + y + '_' + x;
            console.log('Get Data FormID:%s', GetFormID);
            const DataObj = sysFactory.getObjectByID(GetFormID);
            ColData.push(DataObj.RuntimeGetDataFunc());
        }
        MatrixData.push(ColData);
    }
    console.log('Set Clipboard Matrix Data:%o', MatrixData);
    return MatrixData;
}


//------------------------------------------------------------------------------
//- METHOD "setData"
//------------------------------------------------------------------------------

sysListCalculateableCol.prototype.setData = function(DataObject)
{
    console.log('Get Clipboard Matrix Data:%o', DataObject);

    //- write data to columns
    const xStartPos = this.ColIndex;
    const yStartPos = this.RowIndex;

    const xEndPos = this.SheetObject.ColumnCount+1;
    const yEndPos = (this.SheetObject.RowItems.length)-1;

    //- data array access
    var xDataPointer = 0;

    for (let x=xStartPos; x<xEndPos; ++x) {
        var yDataPointer = 0;
        for (let y=yStartPos; y<yEndPos; ++y) {
            const SetFormID = 'Form_' + this.SheetObject.ObjectID + '_' + y + '_' + x;
            console.log('Set Data FormID:%s x:%s y:%s', SetFormID, xDataPointer, yDataPointer);
            try {
                SetData = DataObject[xDataPointer][yDataPointer];
                if (SetData !== undefined) {
                    const SetFormObj = sysFactory.getObjectByID(SetFormID);
                    SetFormObj.RuntimeSetDataFunc(SetData);
                }
            }
            catch {
            }
            ++yDataPointer;
        }
        ++xDataPointer;
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

    this.overrideDOMObjectID       = true;               //- Override Recursive ObjectID

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

    this.overrideDOMObjectID       = true;               //- Override Recursive ObjectID

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

    this.overrideDOMObjectID       = true;               //- Override Recursive ObjectID

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
    this.RowItems               = new Array();               //- Row Objects Array

    this.UpdateCount            = 0;                         //- Update Counter

    this.ColumnCount            = 4;                         //- Default Column Count
    this.ColumnCountMax         = 8;                         //- Max Column Count
    this.RowCount               = 8;                         //- Default Row Count
    this.RowCountMax            = 14;                        //- Max Row Count

    this.ChildObjects           = new Array();               //- Child Objects

    this.RowsSelectable         = true;                      //- Multi Row Selection Default

    this.ColDataSelUpLeftCol    = false;                     //- Upper Left Column Col for Copy / Paste
    this.ColDataSelUpLeftRow    = false;                     //- Upper Left Column Row for Copy / Paste
    this.ColDataSelBotRightCol  = false;                     //- Bottom Right Column Col for Copy / Paste
    this.ColDataSelBotRightRow  = false;                     //- Bottom Right Column Row for Copy / Paste

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
}


//------------------------------------------------------------------------------
//- METHOD "removeSelectedRows"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.removeSelectedRows = function()
{
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
//- METHOD "getRowByIndex"
//------------------------------------------------------------------------------

sysListCalculateable.prototype.getRowByIndex = function(Index)
{
    return this.RowItems[Index];
}
