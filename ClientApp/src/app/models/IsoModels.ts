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
  public Instantaneous_Load: number;
  public timestamp: Date;
  public load: number;
}