export class Mobile {
  constructor(
    public mobileId?: number,
    public model?: string,
    public price?: number,
    public releaseDate?: Date,
    public picture?: string,
    public available?: boolean,
    public brandId?:number
  ) { }
}
