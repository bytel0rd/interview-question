import { MatrixItem, Matrix, ServerUpdate } from "./interfaces";

/**
 * Collates the already updated servers for iteration
 */
export class CollateUpdatedServers {
  private updatedServers: MatrixItem[] = [];
  constructor(private matrix: Matrix) {
    this.dualSearchServerRows();
  }

  /**
   * name
   */
  public getUpdatedServers() {
    return this.updatedServers;
  }

  /**
   * perform a dual search on the various rows and their columns also
   */
  private dualSearchServerRows() {
    for (let i = 0; i < this.matrix.length; i++) {
      const leftRow = i;
      const rightRow = this.matrix.length - i - 1;
      this.dualSearchServerColumns(leftRow, this.matrix[leftRow]);
      this.dualSearchServerColumns(rightRow, this.matrix[rightRow]);
      if (leftRow === rightRow || leftRow + 1 === rightRow) {
        break;
      }
    }
  }

  /**
   * returns the updated servers index maps
   * @param rowIndex the index of the row in the server matrix rack
   */
  private dualSearchServerColumns(
    serverRow: number,
    serverRacks: ServerUpdate[]
  ) {
    for (let i = 0; i < serverRacks.length; i++) {
      const leftRow = i;
      const rightRow = serverRacks.length - i;
      if (leftRow === rightRow || leftRow + 1 === rightRow) {
        break;
      }
      this.updateMatrixIndex(serverRow, leftRow);
      this.updateMatrixIndex(serverRow, rightRow);
    }
  }

  /**
   * add the updated server
   * @param serverRow the server row in the matrix
   * @param rackIndex the server column in the row
   */
  private updateMatrixIndex(serverRow: number, rackIndex: number) {
    if (this.matrix[serverRow][rackIndex] === 1) {
      this.updatedServers.push([serverRow, rackIndex]);
    }
  }
}
