export class GaugeModel {
    public id: number;
    public cpu: number;
    public memory: number;
    public network: number;
}
export class LMP {

  public Type: string;

  public FiveMinuteWgtedAvgLMP: number;

  public HourlyIntegratedLMP: number;

  public node_id: string;

  public timestamp: Date;
}
