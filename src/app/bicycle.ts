export class Bicycle {
	constructor(
		public _id?: any,
		public seller_id?: any,
    public title?: string,
    public description?: string,
		public start_price?: Number,
		public min_price?: Number,
    public location?: string,
    public image?: any,
		public buyer_id?: any,
		public bid_date?: any,
		public close_date?: any,
		public bid_amount?: Number,
		public remaining?: number,
		public new_bid?: Number,
		public status?: string,
    public created_at?: any,
    public updated_at?: any,
		public seller?: any
  ){}
}
