//-------1---------2---------3---------4---------5---------6---------7--------//
//- Copyright WEB/codeX, clickIT 2011 - 2025                                 -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//-                                                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//- USER Functions                                                           -//
//-------1---------2---------3---------4---------5---------6---------7--------//

//------------------------------------------------------------------------------
//- CONSTRUCTOR "UserDefaults"
//------------------------------------------------------------------------------

function UserDefaults()
{
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "UserValidate"
//------------------------------------------------------------------------------

function UserValidate()
{
    this.ValidateFunc = {
    };
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "UserValidateGroup"
//------------------------------------------------------------------------------

function UserValidateGroup()
{
    this.ValidateFunc =
    {
    };
}


//------------------------------------------------------------------------------
//- CONSTRUCTOR "UserContextMenu"
//------------------------------------------------------------------------------

function UserContextMenu()
{
}

//------------------------------------------------------------------------------
//- METHOD "process"
//------------------------------------------------------------------------------

UserContextMenu.prototype.process = function(ContextMenuRef)
{
    console.debug('::UserContextMenu process() ContextMenuRef:%o', ContextMenuRef);

    const RowObject = ContextMenuRef.ParentObject.ParentObject;

    if (ContextMenuRef.InternalFunction == 'remove-row') {
        RowObject.removeRow();
        ContextMenuRef.ContextMenuObject.close();
    }

    if (ContextMenuRef.InternalFunction == 'remove-selected-rows') {
        RowObject.ParentObject.removeSelectedRows();
        ContextMenuRef.ContextMenuObject.close();
    }

    if (ContextMenuRef.InternalFunction == 'insert-row') {
        RowObject.ParentObject.insertRow();
        ContextMenuRef.ContextMenuObject.close();
    }

}
