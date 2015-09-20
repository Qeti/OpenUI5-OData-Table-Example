// Let's define some shortcuts to increase
// readability of the code
var ODataModel = sap.ui.model.odata.ODataModel,
    TextView = sap.ui.commons.TextView,
    Label = sap.ui.commons.Label,
    Table = sap.ui.table.Table,
    Column = sap.ui.table.Column,
    SelectionMode = sap.ui.table.SelectionMode,
    NavigationMode = sap.ui.table.NavigationMode;

// Specify the service as an OData model
var odataService = "http://localhost/OData-base-example/odata.svc",
    odataModel = new ODataModel(odataService)
    productCollection = "/Products";

// Create a master table with products
var products = new Table({
    title: "Products",
    width: "100%",
    visibleRowCount: 5,
    selectionMode: SelectionMode.Single,
    navigationMode: NavigationMode.Paginator,
    editable: false
});

// Define the relevant column properties
var productColumns = [
    { header: "ID", fieldName: "id", width: '100px' },
    { header: "Name", fieldName: "name", width: '50%' },
    { header: "Code", fieldName: "code", width: '50%' },
    // Waiting pull request for issue #122 for POData/POData
    //{ header: "Added at", fieldName: "added_at", width: '50%' },
    { header: "Weight", fieldName: "weight", width: '50%' }
];

// Create the columns
productColumns.forEach(function (column) {
    var label = new Label({ text: column.header }),
        template = new TextView({ text: '{' + column.fieldName + '}' }),
        column = new Column({
            label: label,
            template: template,
            sortProperty: column.fieldName,
            width: column.width
        });
    products.addColumn(column);
});

// Connect the data table to the service
products.setModel(odataModel);

// An OData request for the productCollection will return the products.
// Each product should result in a table row.
products.bindRows(productCollection);

// Put table in the DOM.
// placeAt will automatically defer if DOM is not ready yet (like in this demo).
products.placeAt("products");
