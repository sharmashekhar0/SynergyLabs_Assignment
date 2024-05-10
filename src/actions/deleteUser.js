import { PUBLIC_REST_API_ENDPOINT } from "../constants";

const deleteUser = async (id) => {
	try {
		const id = 1;
		const response = await fetch(
			`${PUBLIC_REST_API_ENDPOINT}/users/${id}`,
			{
				method: "DELETE",
			}
		);
		const result = await response.json();
		console.log("Delete User Response :: result");
		return result;
	} catch (error) {
		console.log("Error while deleting user :: ", error);
	}
};

export default deleteUser;
