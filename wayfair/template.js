var XLSX = require('xlsx');

var workbook = XLSX.readFile('OutreashSheet_Accent Furniture.xlsx');

var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';
 
/* Get worksheet */
//var worksheet = workbook.Sheets[first_sheet_name];
 
/* Find desired cell */
//var desired_cell = worksheet[address_of_cell];
 
/* Get the value */
//var desired_value = desired_cell.v;

//console.log('Cell A1: ' + desired_value);



// -------------------------------------------------

//XLSX.writeFile(workbook, 'out.xlsx');

/* this sample was run in nodejs */
//var XLSX = require('xlsx');

/* build up a very simple workbook */
var wb = {
  SSF: XLSX.SSF.get_table(),
  SheetNames: ["Sheet1", "Bulkload2"],
  Sheets: {
    Sheet1: {
      '!ref': 'A1:A1',
      A1: {
        v: 12345,
        t: 'n'
      }
    }
  }
}

var sheet = 'Bulkload2'
var cell = XLSX.utils.encode_cell({c:0, r:0});


 /* create sheet if it does not exist */
  if(wb.SheetNames.indexOf(sheet) === -1) SheetNames.push(sheet);
  if(!wb.Sheets[sheet]) wb.Sheets[sheet] = {};
  if(!wb.Sheets[sheet]['!ref']) wb.Sheets[sheet]['!ref'] = cell + ':' + cell;

  var cell;

  cell = XLSX.utils.encode_cell({c:0, r:0});

  /* update sheet range if the new cell is outside of range */
  var r = XLSX.utils.decode_range(wb.Sheets[sheet]['!ref']);
  var c = XLSX.utils.decode_cell(cell);
  wb.Sheets[sheet]['!ref'] = XLSX.utils.encode_range({
    s: {r: Math.min(r.s.r, c.r), c: Math.min(r.s.c, c.c) },
    e: {r: Math.max(r.e.r, c.r), c: Math.max(r.e.c, c.c) },
  });

  /* create cell if it does not exist */
  if(!wb.Sheets[sheet][cell]) wb.Sheets[sheet][cell] = {t:'n', v:0};

  wb.Sheets[sheet][cell].t = 'n';
  wb.Sheets[sheet][cell].v = '1234';

 
 // ---------------------


  cell = XLSX.utils.encode_cell({c:1, r:1});

  /* update sheet range if the new cell is outside of range */
  var r = XLSX.utils.decode_range(wb.Sheets[sheet]['!ref']);
  var c = XLSX.utils.decode_cell(cell);
  wb.Sheets[sheet]['!ref'] = XLSX.utils.encode_range({
    s: {r: Math.min(r.s.r, c.r), c: Math.min(r.s.c, c.c) },
    e: {r: Math.max(r.e.r, c.r), c: Math.max(r.e.c, c.c) },
  });

  /* create cell if it does not exist */
  if(!wb.Sheets[sheet][cell]) wb.Sheets[sheet][cell] = {t:'n', v:0};


  wb.Sheets[sheet][cell].t = 's';
  wb.Sheets[sheet][cell].v = 'Hello World';

console.log(JSON.stringify(wb.Sheets, null, 2));
XLSX.writeFile(wb, 'out.xlsx');

