// type to force the values to be either one or two
export type ServerUpdate = 0 | 1;
// a row of the matrix composing of various server updates
export type MatrixRow = ServerUpdate[];
// an consisting consisting of various Matrix Row.
export type Matrix = MatrixRow[];
// the location map of the item in the matrix
export type MatrixItem = [number, number] // [row, column]
// matrix dimension information
export interface MatrixInfo {
  rowLength: number;
  columnHeight: number;
}
