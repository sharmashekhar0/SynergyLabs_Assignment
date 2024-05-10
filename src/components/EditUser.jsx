import React from "react";
import { useForm } from "react-hook-form";

function EditUser({ updateUserHandler, closeEditUserModal }) {
	const { register, handleSubmit } = useForm();

	return (
		<form
			onSubmit={handleSubmit(updateUserHandler)}
			className="fixed bg-gray-100 flex-col shadow-lg border w-5/6 h-2/3 lg:w-1/2 lg:h-2/3 rounded-md top-1/2 -translate-y-1/2 flex items-center justify-center"
		>
			<span className="h-12 mb-3 w-2/3 border-blue-400 text-center text-xl font-semibold text-blue-700 border-b-4">
				Edit User
			</span>
			<div className="flex flex-col gap-8 w-full items-center">
				<div className="lg:h-12 w-2/3 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
					<label htmlFor="" className="text-lg font-medium">
						Name
					</label>
					<input
						type="text"
						className="w-full lg:w-2/3 h-10 lg:h-10 border border-blue-900 outline-none px-4 rounded-md"
						{...register("name", { required: true })}
					/>
				</div>
				<div className="lg:h-12 w-2/3 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
					<label htmlFor="" className="text-lg font-medium">
						Email
					</label>
					<input
						type="text"
						className="w-full lg:w-2/3 h-10 lg:h-10 border border-blue-900 outline-none px-4 rounded-md"
						{...register("email", { required: true })}
					/>
				</div>
				<div className="lg:h-12 w-2/3 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
					<label htmlFor="" className="text-lg font-medium">
						Username
					</label>
					<input
						type="text"
						className="w-full lg:w-2/3 h-10 lg:h-10 border border-blue-900 outline-none px-4 rounded-md"
						{...register("username", { required: true })}
					/>
				</div>
			</div>
			<div className="font-semibold w-2/3 flex items-center justify-center mt-4">
				<button
					type="submit"
					onClick={updateUserHandler}
					className="border w-36 shadow-sm mx-2 text-blue-700 rounded-md h-10 hover:bg-blue-900 hover:text-white"
				>
					Save
				</button>
				<button
					onClick={closeEditUserModal}
					className="border w-36 shadow-sm mx-2 text-blue-700 rounded-md h-10 hover:bg-blue-900 hover:text-white"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default EditUser;
