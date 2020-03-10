import { MatrixItem, MatrixInfo, Matrix } from './interfaces';

/**
 * Updates The adjacent server of an updated server in the same rack 
 */
export class RackServerUpdater {
  private days = 0;

  constructor(private matrix: Matrix, private updatedServers: MatrixItem[]) {
    this.continousTransverse();
  }
  
  continousTransverse(servers = this.updatedServers): any {
    const recent = this.transverseAndUpdateServers(servers);
    if (recent.length !== 0) {
      return this.continousTransverse(this.transverseAndUpdateServers(recent));
    }
  }
  
  transverseAndUpdateServers(servers: MatrixItem[]) {
    const lastDayUpdatedServers: MatrixItem[] = [];
    for (let i = 0; i < servers.length; i++) {
      // can still do a dual approach for time gain moving through both side simutatenously
      const server = servers[i];
      this.transverseAndUpdate(server).forEach(e => lastDayUpdatedServers.push(e));
    }
    this.days += 1;
    return lastDayUpdatedServers;
  }

  /**
   * update not updated servers and also create a check point
   */
  transverseAndUpdate(item: MatrixItem) {
    const recentlyUpdatedServer: MatrixItem[] = [];
    const adjacentServers = tranverseServers(
      this.matrixInfo,
      item
    );
    for (const [row, column] of adjacentServers) {
      if (this.matrix[row][column] !== 1) {
        this.matrix[row][column] = 1;
        recentlyUpdatedServer.push([row, column]);
      } else {
        const adjacents = tranverseServers(this.matrixInfo, [row, column]);
        for (const [row, column] of adjacents) {
          if (this.matrix[row][column] !== 1) {
            this.matrix[row][column] = 1;
            recentlyUpdatedServer.push([row, column]);
          }
        }
      }
    }
    return recentlyUpdatedServer;
  }

  /**
   * returns a collated information about the algorithm's execution
   */
  get matrixInfo(): MatrixInfo {
    return { rowLength: this.matrix[0].length, columnHeight: this.matrix.length }
  }

  compute() {
    return {
      matrix: this.matrix,
      days: this.days,
      updatedServers: this.updatedServers
    }
  }
}

/*
* calculates the valid adjacent servers
*/
function tranverseServers(matrixInfo: MatrixInfo, [row, column]: MatrixItem) {
  // const adjacentRowItems = [[row,column - 1], [row, column + 1]];
  // const adjacentColumnItems = [[row - 1, column], [row + 1, column]];
  return ([
    [row, column - 1],
    [row, column + 1],
    [row - 1, column],
    [row + 1, column]
  ] as MatrixItem[]).filter(item => withinBoundary(matrixInfo, item));
}


/**
 * checks if the current row and column are within the boundary
 */
function withinBoundary(
  { rowLength, columnHeight }: MatrixInfo,
  [row, column]: MatrixItem
) {
  // checks if the column and rows are within the right range.
  if (
    row > columnHeight - 1 ||
    row < 0 ||
    column > rowLength - 1 ||
    column < 0
  ) {
    return false;
  }
  return true;
}
