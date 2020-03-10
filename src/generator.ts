import { Matrix, MatrixRow } from "./interfaces";
import { Chance } from 'chance';

/**
 * @param rowLength number of the servers matrix
 * @param columnHeight the height of the server matrix
 */

/**
 * generates a matrix of randomly set servers
 */
export function randomMatrixGenerator(rowLength: number, columnHeight: number) {
  const chance = Chance();
  const matrix = emptyDimensionArray(rowLength, columnHeight);
  const totalUpdated = chance.integer({ min: 0, max: rowLength * columnHeight });
  for (let index = 0; index <totalUpdated; index++) {
    const row = chance.integer({ min: 0, max: rowLength - 1 });
    const column = chance.integer({ min: 0, max: columnHeight  - 1});
    matrix[row][column] = 1
  }
  console.log(`total number of random updated server is ${totalUpdated}`);

  return matrix;
}

/**
 * generates a matrix which only the beginning is set
 */
export function linearMatrixGenerator(rowLength: number, columnHeight: number) {
  const matrix = emptyDimensionArray(rowLength, columnHeight);
  matrix[0][0] = 1;
  return matrix;
}

/**
 * generates an array like the example in which both end of the matrix where initialized
 */
export function edgeSetGenerator(rowLength: number, columnHeight: number) {
  const matrix = linearMatrixGenerator(rowLength, columnHeight);
  matrix[columnHeight - 1][rowLength - 1] = 1;
  return matrix;
}

/**
 *  generates an empty server dimensional matrix
 */
function emptyDimensionArray(rowLength: number, columnHeight: number): Matrix {
  validateMatrixDimension(rowLength, columnHeight);
  const matrix = [];
  for (let i = 0; i < columnHeight; i++) {
    const serverRows: MatrixRow = [];
    for (let i = 0; i < rowLength; i++) {
     serverRows.push(0);
    }
   matrix.push(serverRows);
  }
  return matrix;
}

/**
 * checks if the given dimensions are valid before execution
 */
function validateMatrixDimension(rowLength: number, columnHeight: number) {
  if (Number.isInteger(rowLength) && Number.isInteger(columnHeight)) {
    if (rowLength === 1 || columnHeight === 1) {
      throw new Error(`a valid matrix must have it's dimensions greater than 1`);
    }
    return true;
  }
  throw new Error(`matrix dimension must be a number`);
}
