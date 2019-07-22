export class Expense {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public category: string,
    public imageData: string,
    public price: number,
    public claimedFor: boolean,
    public dateTime: Date
  ) {}
}
