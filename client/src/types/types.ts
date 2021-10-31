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

export interface ConversationData {
	id: string;
	messages: MessageData[];
	name: string
	// Might have to be a list of Users instead of strings
	users: string[];
}

export interface MessageData {
	id: string;
	content: string;
	createdAt: Date;
	username: string;
	converstaionId: string;
}