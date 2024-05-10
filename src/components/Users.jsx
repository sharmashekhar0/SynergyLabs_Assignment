import React, { useEffect, useState } from "react";
import fetchUsers from "../actions/fetchUsers";
import addUser from "../actions/addUser";
import updateUser from "../actions/updateUser";
import deleteUser from "../actions/deleteUser";
import { useNavigate } from "react-router";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import ApiResponse from "./ApiResponse";

function Users() {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [editUserModalOpen, setEditUserModalOpen] = useState(false);
	const [userId, setUserId] = useState(0);
	const [apiResponse, setApiResponse] = useState("");

	const getUsersHandler = async () => {
		try {
			const response = await fetchUsers();
			console.log("Users :: ", response);
			if (response) {
				setUsers(response);
				setApiResponse("Users Fetched Successfully");
			}
		} catch (error) {
			console.log("Error while getting users :: ", error);
			setApiResponse("Fetch Users Unsuccessful");
		}
	};

	const addUserHandler = async (formData) => {
		try {
			let response = await addUser(formData);
			if (response) {
				response = { ...response, id: users.length + 1 };
				const newUsers = [...users, response];
				console.log("New Users :: ", newUsers);
				setUsers(newUsers);
				closeAddUserModal();
				setApiResponse("User Added Successfully");
			}
		} catch (error) {
			console.log("Error while adding user :: ", error);
			setApiResponse("Add User Unsuccessful");
		}
	};

	const deleteUserHandler = async (id) => {
		try {
			const response = await deleteUser();
			console.log("Delete User :: ", response);
			if (response) {
				// Filter out the deleted user from the users array
				const updatedUsers = users.filter((user) => user.id !== id);
				setUsers(updatedUsers);
				setApiResponse("User Deleted Successfully");
			}
		} catch (error) {
			console.log("Error while deleting user :: ", error);
			setApiResponse("Delete User Unsuccessful");
		}
	};

	const updateUserHandler = async (formData) => {
		try {
			let response = await updateUser(formData, userId);
			console.log("Update User :: ", response);
			if (response) {
				const updatedUsers = users.map((user) => {
					if (user.id === userId) {
						return { ...user, ...response };
					} else {
						return user;
					}
				});
				setUsers(updatedUsers);
				setApiResponse("User Updated Successfully");
				closeEditUserModal();
			}
		} catch (error) {
			console.log("Error while updating user :: ", error);
			setApiResponse("Update User Unsuccessful");
		}
	};

	const navigateToUser = (user) => {
		console.log("User :: ", user);
		localStorage.setItem("user-fakedata", JSON.stringify(user));
		navigate("/user");
	};

	const toggleAddUserModal = () => {
		const toggledOpen = !open;
		setOpen(toggledOpen);
	};

	const toggleEditUserModal = (id) => {
		const toggledOpen = !editUserModalOpen;
		setEditUserModalOpen(toggledOpen);
		console.log("Edit Modal :: ", toggledOpen);
		setUserId(id);
	};

	const closeEditUserModal = () => {
		setEditUserModalOpen(false);
	};

	const closeAddUserModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		getUsersHandler();
	}, []);

	return (
		<div className="min-h-screen flex flex-col gap-4 items-center justify-center">
			{open && (
				<AddUser
					addUserHandler={addUserHandler}
					closeAddUserModal={closeAddUserModal}
				/>
			)}
			{editUserModalOpen && (
				<EditUser
					updateUserHandler={updateUserHandler}
					closeEditUserModal={closeEditUserModal}
				/>
			)}
			<div className="w-full h-20 flex items-center justify-end px-4 lg:px-16">
				<button
					onClick={toggleAddUserModal}
					className="border rounded-md h-12 text-blue-700 hover:bg-blue-900 hover:text-white text-xl w-40 font-semibold self-end"
				>
					Add User
				</button>
			</div>
			<div className="w-full px-4 lg:px-16 overflow-x-scroll lg:overflow-hidden">
				<table className="h-fit border w-full">
					<thead
						className="h-16 text-xl bg-blue-700 text-white
				"
					>
						<tr>
							<th className="px-2">Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Username</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user) => (
							<tr
								key={user?.id}
								className="h-16 text-lg text-gray-700 border-b"
							>
								<th>{user.id}</th>
								<th
									onClick={() => navigateToUser(user)}
									className="cursor-pointer"
								>
									{user.name}
								</th>
								<th>{user.email}</th>
								<th>{user.username}</th>
								<th>
									<div className="flex flex-col gap-2 m-1 lg:flex-row lg:gap-0 lg:m-0">
										<button
											onClick={() =>
												toggleEditUserModal(user.id)
											}
											className="border w-20 mx-2 text-blue-700 rounded-md h-10 hover:bg-blue-900 hover:text-white"
										>
											Edit
										</button>
										<button
											onClick={() =>
												deleteUserHandler(user.id)
											}
											className="border w-20 mx-2 text-blue-700 rounded-md h-10 hover:bg-blue-900 hover:text-white"
										>
											Delete
										</button>
									</div>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{apiResponse && (
				<ApiResponse message={apiResponse} setError={setApiResponse} />
			)}
		</div>
	);
}

export default Users;
