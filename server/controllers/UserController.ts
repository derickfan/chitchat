import User from "../models/User";

interface UserData {
	username: string;
	password: string;
	email: string;
	profilePhotoUrl: string;
}

/**
 *
 * @param data - js object used to create new user
 * @returns a newly creted user wrapped in a Promise
 * @throws a generic Error
 */
export const createUser = async (data: UserData): Promise<User> => {
	try {
		const user = await User.create(data);
		return user;
	} catch (error) {
		console.error(error);
		throw new Error("Unknown Error");
	}
};

/**
 * @returns a array of Users in the database
 */
export const getAllUsers = async (): Promise<User[]> => {
	const users = await User.findAll();
	return users;
};

/**
 * 
 * @param username - the name of the user that is being updated
 * @param key - the field that is being updated
 * @param value - the new value that the field is being updated to
 * @returns a updated User
 * @throws a generic Error
 */
export const updateUser = async (
	username: string,
	key: keyof UserData,
	value: string
): Promise<User> => {
	try {
		const user = await User.findOne({
			where: {
				username: username,
			},
		});
		if (user) {
			user.update(key, value);
			return user;	
		} else {
			throw new Error("User does not exist");
		}
	} catch (error) {
		throw new Error("Unknown Error");
	}
};

/**
 * 
 * @param username - the name of the user thats being deleted
 * @param password - the password of the user to confirm deletion
 * @returns nothing
 * @throws a generic Error
 */
export const deleteUser = async ( username: string, password: string ): Promise<void> => {
	try {
		const user = await User.findOne({
			where: {
				username: username,
				password: password,
			}
		});
		if (user) {
			await user.destroy();
		} else {
			throw new Error("User does not exist");
		}
	} catch (error) {
		throw new Error("Unknown Error");
	}
};
