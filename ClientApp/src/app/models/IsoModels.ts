export class LMP {

  public Type: string;

  public fiveMinuteAvgLMP: number;

  public hourlyIntegratedLMP: number;

  public node_id: string;

  public timestamp: Date;
}
export class loadTblRow 
{
  public Area: string;
  public instantaneous_Load: number;
  public timestamp: Date;
  public load: number;
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
