/*  PSEUDO Code
------------------------------------------------
READ Files IN Folder

  READ tabs IN File

    READ Title row
    WRITE in new Excel
    
    READ Tooltip Row
    WRITE in Excel

    WRITE Default properties in new Excel

    READ DataType
    Convert DataType to TemplateType
    WRITE in new Excel
    Extract Data value
    Generate multupleChoice attribute
    Write in new Excel

  END LOOP

END LOOP    
------------------------------------------------*/

var XLSX = require('xlsx');

var newWorkbook = {  
  SheetNames: [],
  Sheets: {}
}

var workbookName = 'OutreashSheet_Accent Furniture.xlsx';

console.log("Reading Source Workbook : " + workbookName + "...")
var workbook     = XLSX.readFile(workbookName);



// -------------------------------------------------------------------------
          
function writeCell(wb, sheet, row, column, value) {

  var cell = cell = XLSX.utils.encode_cell({c:column, r:row});

 // create sheet if it does not exist
  if(wb.SheetNames.indexOf(sheet) === -1) wb.SheetNames.push(sheet);
  if(!wb.Sheets[sheet]) wb.Sheets[sheet] = {};
  if(!wb.Sheets[sheet]['!ref']) wb.Sheets[sheet]['!ref'] = cell + ':' + cell; 

  // update sheet range if the new cell is outside of range 
  var r = XLSX.utils.decode_range(wb.Sheets[sheet]['!ref']);
  var c = XLSX.utils.decode_cell(cell);
  wb.Sheets[sheet]['!ref'] = XLSX.utils.encode_range({
    s: {r: Math.min(r.s.r, c.r), c: Math.min(r.s.c, c.c) },
    e: {r: Math.max(r.e.r, c.r), c: Math.max(r.e.c, c.c) },
  });

  // create cell if it does not exist 
  if(!wb.Sheets[sheet][cell]) wb.Sheets[sheet][cell] = {t:'n', v:0};

  wb.Sheets[sheet][cell].t = 's';
  wb.Sheets[sheet][cell].v = value;

  //console.log(JSON.stringify(wb,null,2));
  //exit(0);

}


function extractTitleRow(workbook, sheetName, newWorkbook, callback) {

  var worksheet = workbook.Sheets[sheetName];

  //for(var i = 0; i < 126; i++) {
  
  for (i in worksheet) {

    var cell = i; //Object.keys(worksheet)[i];
    var cellRange = XLSX.utils.decode_cell(cell);

    // all keys that do not begin with "!" correspond to cell addresses, so skip this one 
    if(cell[0] === '!') continue;
    
    // I want the title row, so when you reach row 2, stop looping the cells
    if (cellRange.r > 1) break;

    // I want to read the row 2 in Excel (meaning row 1 in the lib as it start at 0)
    if (cellRange.r > 0) {

      if (cellRange.c >= 7) {
      
        //console.log(sheetName + "!" + cell + "=" + JSON.stringify(worksheet[cell].v));

        // Reverse the row from horizontal to vertical
        var row = cellRange.c - 7
        var column = 0 
        var value = worksheet[cell].v;

        writeCell(newWorkbook, sheetName, row, column, value);
      }
    }
  }

  callback("done", newWorkbook);

}


function extractTooltip(workbook, sheetName, newWorkbook, callback) {

  var worksheet = workbook.Sheets[sheetName];

  for (i in worksheet) {

    var cell = i; //Object.keys(worksheet)[i];
    var cellRange = XLSX.utils.decode_cell(cell);

    // all keys that do not begin with "!" correspond to cell addresses, so skip this one 
    if(cell[0] === '!') continue;
    
    // I want the Tooltip row (#3) row, so when you reach row 4, stop looping the cells
    if (cellRange.r > 2) break;
    
    if (cellRange.r > 1) {  // I want to read the row 3 in Excel (meaning row 2 in the lib as it start at 0)

      if (cellRange.c >= 7) {  // Skip the first 7 column
      
        //console.log(sheetName + "!" + cell + "=" + JSON.stringify(worksheet[cell].v));

        // Reverse the row from horizontal to vertical
        var row = cellRange.c - 7
        var column = 4 
        var value = worksheet[cell].v;

        writeCell(newWorkbook, sheetName, row, column, value);
      }
    }
  }

  callback("done", newWorkbook);

}


function generateDefaultValue(sheetName, newWorkbook, callback) {

  // RANGE structure
  //  {"s": {"c": 0, "r": 0},   // Start
  //   "e": {"c": 4,"r": 118}}  // End                 
  
  range =  XLSX.utils.decode_range(newWorkbook.Sheets[sheetName]['!ref']);

  for (var i = 0; i <= range.e.r; i++) {
    var row = i;

    writeCell(newWorkbook, sheetName, row, 2, "null");    // min_limit
    writeCell(newWorkbook, sheetName, row, 3, "null");    // max_limit
    writeCell(newWorkbook, sheetName, row, 5, "FALSE");   // required
    writeCell(newWorkbook, sheetName, row, 6, "FALSE");   // unique
    writeCell(newWorkbook, sheetName, row, 7, "FALSE");   // html
    writeCell(newWorkbook, sheetName, row, 8, "null");    // date_format
    writeCell(newWorkbook, sheetName, row, 9, "null");    // casing
    writeCell(newWorkbook, sheetName, row, 10, "null");   // image_transform
    writeCell(newWorkbook, sheetName, row, 11, "null");   // default_value
    writeCell(newWorkbook, sheetName, row, 12, "null");   // padding
  }  

  callback("done", newWorkbook);

}


function convertDataType(workbook, sheetName, newWorkbook, callback) {

  var worksheet = workbook.Sheets[sheetName];

  for (i in worksheet) {

    var cell = i; //Object.keys(worksheet)[i];
    var cellRange = XLSX.utils.decode_cell(cell);

    // all keys that do not begin with "!" correspond to cell addresses, so skip this one 
    if(cell[0] === '!') continue;
    
    // I want the Tooltip row (#4 row, so when you reach row 4, stop looping the cells
    if (cellRange.r > 3) break;
    
    if (cellRange.r > 2) {  // I want to read the row 4 in Excel (meaning row 3 in the lib as it start at 0)

      if (cellRange.c >= 7) {  // Skip the first 7 column
      
        //console.log(sheetName + "!" + cell + "=" + JSON.stringify(worksheet[cell].v));

        // Reverse the row from horizontal to vertical
        var row = cellRange.c - 7
        var column = 1 
        var value = worksheet[cell].v;

        if (value.indexOf("Please") == 0) value = "Please";

        // Convert the dataType
       switch(value) {
        case "Yes or No":
          value = "multipleChoice";
          break;
        case "Decimal":
          value = "float";
          break;
        case "Number":
          value = "integer";
          break;
        case "Text":
          value = "text";
          break;
        case "Please":
          value = "multipleChoice";
          break;
        default:
          value = "error in conversion";
       }

        writeCell(newWorkbook, sheetName, row, column, value);
      }
    }
  }

  callback("done", newWorkbook);

}


function extractMultipleChoice(workbook, sheetName, newWorkbook, callback) {

  var worksheet = workbook.Sheets[sheetName];

  for (i in worksheet) {

    var cell = i; //Object.keys(worksheet)[i];
    var cellRange = XLSX.utils.decode_cell(cell);

    // all keys that do not begin with "!" correspond to cell addresses, so skip this one 
    if(cell[0] === '!') continue;
    
    // I want the Tooltip row (#4) row, so when you reach row 4, stop looping the cells
    if (cellRange.r > 3) break;
    
    if (cellRange.r > 2) {  // I want to read the row 4 in Excel (meaning row 3 in the lib as it start at 0)

      if (cellRange.c >= 7) {  // Skip the first 7 column
      
        //console.log(sheetName + "!" + cell + "=" + JSON.stringify(worksheet[cell].v));

        // Reverse the row from horizontal to vertical
        var row = cellRange.c - 7
        var column = 13 
        var value = worksheet[cell].v;


        // Extract the multipleChoice and format it to right format
        if (value.indexOf("Please") == 0) {

          value = value.replace("Please choose from the following: ", "");        // Remove the beginning of the sentence to keep only the values
          value = value.replace(/; /g, "\\n");                                    // Replace the '; ' by '\n' via a good'ol regex :)  The magic is the "g" that change all the '; '
          value = '{"allowMapOwnAttribute": "yes", "values": "' + value + '"}';   // Create the json-like structure for the template with the extracted attribute

        }
        else if (value == "Yes or No") {
          value = '{"allowMapOwnAttribute": "yes", "values": "Y\\nN"}';
        }
        else {
          value = "";
        }

        writeCell(newWorkbook, sheetName, row, column, value);
      }
    }
  }

  callback("done", newWorkbook);

}


function LoopASheet(sheetNames, callback) {

  //console.log('sheets: ' + sheetNames);

  sheetNames.forEach(function(sheetName) {

    console.log('------------------------------------\nParsing the sheet : ' + sheetName);

    extractTitleRow(workbook, sheetName, newWorkbook, function(status, newWB) {
      console.log('ExtractTitleRow: ' + status);

      extractTooltip(workbook, sheetName, newWorkbook, function(status, newWB) {
        console.log('extractTooltip: ' + status);

        generateDefaultValue(sheetName, newWorkbook, function(status, newWB) {
          console.log('generateDefaultValue: ' + status);

          convertDataType(workbook, sheetName, newWorkbook, function(status, newWB) {
            console.log('convertDataType: ' + status);

            extractMultipleChoice(workbook, sheetName, newWorkbook, function(status, newWB) {
              console.log('extractMultipleChoice: ' + status);
                   
            });

          });
          
        });
        
      });
      
    });

  });

  callback("done", newWorkbook);
}


//=============================================================================

LoopASheet(workbook.SheetNames, function(status, newWB) {
  console.log("Saving Workbook...")
  XLSX.writeFile(newWB, 'out2.xlsx');   
});
