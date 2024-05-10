import React, { useEffect, useState } from "react";

function User() {
	const [user, setUser] = useState({});

	useEffect(() => {
		const userFromStorage = JSON.parse(
			localStorage.getItem("user-fakedata")
		);
		console.log("User from storage:", userFromStorage);
		setUser(userFromStorage);
	}, []);

	const flattenObject = (obj, prefix = "") => {
		return Object.keys(obj).reduce((acc, key) => {
			const pre = prefix.length ? prefix + " " : "";
			if (typeof obj[key] === "object" && obj[key] !== null) {
				const nestedObj = flattenObject(obj[key], pre + key);
				Object.keys(nestedObj).forEach((nestedKey) => {
					const formattedKey = capitalizeFirstLetter(nestedKey);
					acc[formattedKey] = nestedObj[nestedKey];
				});
			} else {
				const formattedKey = capitalizeFirstLetter(pre + key);
				acc[formattedKey] = obj[key];
			}
			return acc;
		}, {});
	};

	const capitalizeFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const flattenedUser = flattenObject(user);

	return (
		<div className="h-screen overflow-x-scroll text-gray-700">
			<table className="h-screen w-full">
				<thead>
					<tr className="h-16 text-white text-xl">
						<th className="bg-blue-950 w-1/2">Key</th>
						<th className="bg-blue-900 w-1/2">Value</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(flattenedUser).map(([key, value]) => (
						<tr key={key} className="h-12 border-b text-center bg-gray-100">
							<td className="text-lg font-semibold text-left px-4">
								{key}
							</td>
							<td className="text-lg font-medium text-left px-4">
								{value}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default User;
