import { PUBLIC_REST_API_ENDPOINT } from "../constants";

const addUser = async (data) => {
	try {
		const response = await fetch(`${PUBLIC_REST_API_ENDPOINT}/users`, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(data),
		});
		const result = await response.json();
		console.log("Add User Response :: ", result);
		return result;
	} catch (error) {
		console.log("Error while adding new user :: ", error);
	}
};

export default addUser;
