const ExcelJS = require('exceljs');
async function createExcel() {
    let output ={row:-1,col:-1 };
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("C:\\Users\\sures\\Downloads\\download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    await worksheet.eachRow(async (row, rowNumber) => {
        //await workbook.xlsx.writeFile('C:\\Users\\sures\\Downloads\\output.xlsx');
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value + ' ' + rowNumber + ' ' + colNumber);
            if (cell.value === 'Apple') {
                output.row = rowNumber;
                output.col = colNumber;
                console.log(cell.value + ' Row No:: ' + rowNumber + ' Col No:: ' + colNumber);
            }
        })

    })
    //const ce = worksheet.getCell(output.row, output.col);
    //ce.value = 'Iphone';
    //await workbook.xlsx.writeFile('C:\\Users\\sures\\Downloads\\output.xlsx');



}
createExcel();
