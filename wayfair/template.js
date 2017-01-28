var Excel = require('exceljs');


//-------------------------------------------------------------------------------------------------
function parseCmdLine() {

  // Manage the input/output filename passed on command line
  if (process.argv.length == 2) {  // No argument passed on camdline
    var defaultWorkbook    = 'test.xlsx';
    var defaultNewWorkbook = 'output.xlsx'
  }
  else if (process.argv.length == 3) {  // No argument passed on camdline
    var defaultNewWorkbook = 'output.xlsx'
  }
  else if (process.argv.length != 4) {  // Not only 2 arguments passed on cmdline
    p = process.argv.length - 2;
    throw new Error("You need 1 or 2 params but you got " + p + "\nEx: $ node template.js input_file_path output_file_path");
  }

  // Define the input/output filename
  var wb = {};
  wb.source      = defaultWorkbook    || process.argv[2];
  wb.destination = defaultNewWorkbook || process.argv[3];  

  return wb;
}


//-------------------------------------------------------------------------------------------------

function extractTitleRowAndRequired(wsSource, wsDestination, callback) {

  var row = wsSource.getRow(2);
  var col = 1;

  row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
    
    // Skip the first 7 column
    if (col > 7) {

      var rowValues = [];
      rowValues[1] = cell.value;

      if (cell.style.font.color.argb == 'FFFFFF00')
        rowValues[6] = 'TRUE';
      else
        rowValues[6] = 'FALSE';

      wsDestination.getRow(col - 6).values = rowValues;  // I convert from row to column, and offset to start at the row 1

    }
      
    col++;

  });

  callback("done", wsDestination);

}


//-------------------------------------------------------------------------------------------------

function extractTooltip(wsSource, wsDestination, callback) {

  var row = wsSource.getRow(3);
  var col = 1;

  // Loop each column form the row
  row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  
    if (col > 7)    // Skip the first 7 column
      wsDestination.getRow(col - 6).getCell(5).value = cell.value;  // I convert from row to column, and offset to start at the row 1
    col++;

  });

  callback("done", wsDestination);

}


//-------------------------------------------------------------------------------------------------

function generateDefaultValue(wsSource, wsDestination, callback) {

  var row = wsSource.getRow(2);
  var col = 1;

  // Loop each column form the row
  row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  
    if (col > 7) {   // Skip the first 7 column
      wsDestination.getRow(col - 6).getCell(3).value = 'null';
      wsDestination.getRow(col - 6).getCell(4).value = 'null';
      wsDestination.getRow(col - 6).getCell(7).value = 'FALSE';
      wsDestination.getRow(col - 6).getCell(8).value = 'FALSE';
      wsDestination.getRow(col - 6).getCell(9).value = 'null';
      wsDestination.getRow(col - 6).getCell(10).value = 'null';
      wsDestination.getRow(col - 6).getCell(11).value = 'null';
      wsDestination.getRow(col - 6).getCell(12).value = 'null';
      wsDestination.getRow(col - 6).getCell(13).value = 'null';
    }
    col++;

  });

  callback("done", wsDestination);

}


//-------------------------------------------------------------------------------------------------

function convertDataType(wsSource, wsDestination, callback) {

  var row = wsSource.getRow(4);
  var col = 1;
  var dataType;

  // Loop each column form the row
  row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  
    if (col > 7)  {  // Skip the first 7 column
      
      if (cell.value.indexOf("Please") == 0 || cell.value == 'Yes or No')
        dataType = 'multipleChoice';
      else if (cell.value == 'Decimal')
        dataType = 'float';
      else if (cell.value == 'Number')
        dataType = 'integer';
      else if (cell.value == 'Text')
        dataType = 'text';
      else 
        dataType = 'Error in convertDataType()';

      wsDestination.getRow(col - 6).getCell(2).value = dataType;  // I convert from row to column, and offset to start at the row 1
    
    }
    
    col++;

  });

  callback("done", wsDestination);

}


//-------------------------------------------------------------------------------------------------

function extractMultipleChoice(wsSource, wsDestination, callback) {

  var row = wsSource.getRow(4);
  var col = 1;
  var multipleChoice;

  // Loop each column form the row
  row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  
    if (col > 7)  {  // Skip the first 7 column
      
      var cellValue = cell.value;

      // Extract the multipleChoice and format it to right format
      if (cellValue.indexOf("Please") == 0) {

        cellValue = cellValue.replace("Please choose from the following: ", "");        // Remove the beginning of the sentence to keep only the values
        cellValue = cellValue.replace(/; /g, "\\n");                                    // Replace the '; ' by '\n' via a good'ol regex :)  The magic is the "g" that change all the '; '
        multipleChoice = '{"allowMapOwnAttribute": "yes", "values": "' + cellValue + '"}';   // Create the json-like structure for the template with the extracted attribute

      }
      else if (cellValue == "Yes or No") {
        multipleChoice = '{"allowMapOwnAttribute": "yes", "values": "Y\\nN"}';
      }
      else {
        multipleChoice = "";
      }

      wsDestination.getRow(col - 6).getCell(14).value = multipleChoice;  // I convert from row to column, and offset to start at the row 1
    
    }
    
    col++;

  });

  callback("done", wsDestination);

}

//=============================================================================

function main() {

  var wbSource      = new Excel.Workbook();
  var wbDestination = new Excel.Workbook();
  var wbsName       = parseCmdLine();

  console.log('Reading Source Workbook : ' + wbsName.source);
  console.log('Write to Workbook       : ' + wbsName.destination);

  wbSource.xlsx.readFile(wbsName.source).then(function() {

    wbSource.eachSheet(function(sheet, sheetId) {

      console.log('\n-------- Processing sheet %s -------', sheet.name);
      
      // Create the sheet in the new WB
      var wsDestination = wbDestination.addWorksheet(sheet.name);

      // Add Title Row
      var titleRow = ['name', 'type', 'min_limit', 'limit', 'tooltip', 'required', 'unique', 'html', 'date_format',
                      'casing', 'image_transform', 'default_value', 'padding', 'multipleChoice'];

      wsDestination.addRow(titleRow);

      extractTitleRowAndRequired(sheet, wsDestination, function(status, wsDestination) {
        console.log('extractTitleRowAndRequired: ' + status);

        extractTooltip(sheet, wsDestination, function(status, wsDestination) { 
          console.log('extractTooltip: ' + status);

          generateDefaultValue(sheet, wsDestination, function(status, wsDestination) { 
            console.log('generateDefaultValue: ' + status);

            convertDataType(sheet, wsDestination, function(status, wsDestination) { 
              console.log('convertDataType: ' + status);

              extractMultipleChoice(sheet, wsDestination, function(status, wsDestination) { 
                console.log('extractMultipleChoice: ' + status);
              });
            });
          });
        })
      });
    })

    // Save the new Workbook
    wbDestination.xlsx.writeFile(wbsName.destination).then(function() {
      console.log("\nFile %s saved", wbsName.destination);
    });

  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
main();