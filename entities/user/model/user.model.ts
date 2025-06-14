export interface User {
	id: number;
	name: string;
	surname?: string;
	photo?: string;
}

export interface UserRequest {
	profile: User;
}
