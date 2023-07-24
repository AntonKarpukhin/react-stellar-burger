export interface IIngredientInterface {
	"_id": string,
	"name": string,
	"type": string,
	"proteins": number,
	"fat": number,
	"carbohydrates": number,
	"calories": number,
	"price": number,
	"image": string,
	"image_mobile": string,
	"image_large": string,
	"__v": number,
	"key": string
}

export interface IImages {
	images: string;
	name: string;
}

export interface IIngredientRequest {
	success: boolean;
	data: IIngredientInterface[]
}