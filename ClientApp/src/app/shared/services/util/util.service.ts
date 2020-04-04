import { Injectable } from '@angular/core';

/**
 * @author: Shoukath Mohammed
 */
@Injectable()
export class UtilService {
  GetMinMaxdate(chartData: import('../../../Models/IsoModels').loadTblRow[]): import('../../../Models/MiscModels').MinMaxDate {
    throw new Error('Method not implemented.');
  }

  /**
   * @constructor
   */
  constructor() { }

  /**
   * @public
   * @return: string
   * @description: a helper method that prepends
   * `0` to the single digit.
   */
  public to2Digit(str: string): string {
    if (!str) { return null; }

    const isString: boolean = (typeof str == 'string');
    if (isString && str.length == 1) {
      str = 0 + str;
    }
    return str;
  }
}
