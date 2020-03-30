export class LMP {

  public Type: string;

  public fiveMinuteAvgLMP: number;

  public hourlyIntegratedLMP: number;

  public node_id: string;

  public timestamp: Date;
}
export class loadTblRow {

  public instantaneous_Load: number;
  public timestamp: Date;


  constructor(instantaneous_Load: number, timestamp: Date) {
    instantaneous_Load = instantaneous_Load;
    timestamp = timestamp;
  }
}

export class fuelTypeData {
  public timestamp: Date;
  public gas: number;
  public nuclear: number;
  public coal: number;
  public hydro: number;
  public wind: number;
  public solar: number;
  public multipleFuels: number;
  public otherRenewables: number;
  public oil: number;
  public other: number;
  public storage: number;
}
