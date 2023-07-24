export interface IOrder {
	order: {
		_id: string;
		ingredients: string[],
		status: string;
		name: string;
		createdAt: string;
		updatedAt: string;
		number: number;
	}
}

export interface IOrderRequest {
	success: boolean;
	orders:  {
		_id: string;
		ingredients: [
			string,
			string
		],
		status: string;
		name: string;
		createdAt: string;
		updatedAt: string;
		number: number;
	}[]
}


export interface IOneOrder {
	_id: string;
	ingredients: string[],
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}

export interface IOrders {
	success: boolean;
	orders: IOneOrder[];
	total: string;
	totalToday: string;
}