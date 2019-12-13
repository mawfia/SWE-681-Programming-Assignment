export class User {
	constructor(
	public birthday: Date = new Date(),
    public created_at: Date = new Date(),
    public updated_at: Date = new Date(),
	public roles: string = 'BASIC',
	public first_name?: string,
    public last_name?: string,
    public email?: string,
	public password?: string,
    public address1?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
	public bicycles?: any[],
	public _id?: any
  ){}
}
