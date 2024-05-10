import { PUBLIC_REST_API_ENDPOINT } from "../constants";

const fetchUsers = async () => {
	try {
		const response = await fetch(`${PUBLIC_REST_API_ENDPOINT}/users`);
		const result = await response.json();
		console.log("Users Response :: ", result);
		return result;
	} catch (error) {
		console.log("Error while getting all users :: ", error);
	}
};

export default fetchUsers;
