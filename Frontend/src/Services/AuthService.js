import { json } from "react-router-dom";

class AuthService {
  adminEmail = "admin@localhost.local";
  adminPassword = "admin";
  mainurl = "http://localhost:8081/api/";
  async login(data) {
    if (
      data.email === this.adminEmail &&
      data.password === this.adminPassword
    ) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      return true;
    }

    const response = await fetch(this.mainurl + "user-login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let status = await response.ok;

    response
      .json()
      .then((data) => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      })
      .catch((error) => {
        localStorage.setItem("loginError", error.message);
      });
    return status;
  }
}

export default AuthService;
