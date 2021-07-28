import axios from "axios";

const auth = {
  isAuthenticated: false,
  user: {},
  login: async (username: string, password: string) => {
    const response = await axios.post("http://localhost:8000/api/user", {
      username: username,
      password: password
    });
    if (response.status !== 200) {
      console.log("Login Unsuccessful");
    }
    auth.isAuthenticated = true;

  },
  signout: () => {

  }
}

export default auth;