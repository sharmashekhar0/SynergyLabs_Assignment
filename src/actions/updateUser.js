import { PUBLIC_REST_API_ENDPOINT } from "../constants";

const data = {
	name: "Logan Paul",
	email: "paul@logan.com",
};

const updateUser = async (data, id) => {
	try {
		const response = await fetch(
			`${PUBLIC_REST_API_ENDPOINT}/users/${id}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		);
		const result = await response.json();
		console.log("Update User Response :: ", result);
		return result;
	} catch (error) {
		console.log("Error while updating user :: ", error);
	}
};

export default updateUser;
