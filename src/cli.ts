import * as generator from "./generator";
import { join } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

const MOCKDATAPATHS = join(process.cwd(), "mockdata");

function Cli() {
  const { columnHeight, rowLength } = destructureArguments();
  generateTestFiles(parseInt(rowLength), parseInt(columnHeight));
}

Cli();

// destructure the file parameters
function destructureArguments() {
  const [,, rowLength, columnHeight] = process.argv;
  console.log(process.argv);
  return { rowLength, columnHeight };
}
  

// generates the test files of various kinds
function generateTestFiles(rowLength: number, columnHeight?: number) {
  columnHeight = columnHeight ?? rowLength;
  if (!existsSync(join(MOCKDATAPATHS))) {
    mkdirSync(MOCKDATAPATHS);
  }
  Object.keys(generator).forEach(method => {
    const matrix = (generator as any)[method](rowLength, columnHeight);
    const filePath = join(MOCKDATAPATHS, `_${method}_${rowLength}_${columnHeight}.json`);
    console.log(filePath);
    writeFileSync(filePath, JSON.stringify(matrix), 'utf8');
  });
}

