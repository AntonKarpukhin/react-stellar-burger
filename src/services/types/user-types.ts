export interface IUserInterface {
	"success": boolean,
	"user": {
		"email": string,
		"name": string
	},
	"accessToken"?: string,
	"refreshToken"?: string
}