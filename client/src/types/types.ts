export interface UserLoginData {
	username: string;
	password: string;
}

export interface UserSignupData extends UserLoginData {
	email: string;
}

export interface UserData extends UserSignupData {
	id: string;
	profilePhotoUrl: string;
}