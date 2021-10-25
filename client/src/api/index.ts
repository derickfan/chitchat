import axios from "axios";

const URL = "/api";

export const instance = axios.create({
	baseURL: URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true
});