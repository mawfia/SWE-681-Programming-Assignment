export class Bicycle {
	constructor(
	public _id: any = null,
	public user_id: any = null,
    public title: string = null,
    public description: string = null,
	public price: Number = 0,
    public location: string = null,
    public image: any = null,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ){}
}
