import XLSX from "xlsx";

export default function getProductListFromFile(fileName) {
  const workbook = XLSX.readFile(fileName);
  const sheetName = workbook.SheetNames[0];
  const workSheet = workbook.Sheets[sheetName];
  var productList = XLSX.utils.sheet_to_json(workSheet);
  return productList;
}
