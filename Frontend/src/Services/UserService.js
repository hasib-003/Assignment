
class UserService {
  adminEmail = "admin@localhost.local";
  adminPassword = "admin";
  mainurl = "http://localhost:8081/api/";

  async registerUser(userData) {
    const response = await fetch(this.mainurl + "user-register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  }

  async getAllUsers() {
    const response = await fetch(this.mainurl + "admin-login", {
      method: "POST",
      body: JSON.stringify({
        email: this.adminEmail,
        password: this.adminPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let users = await response.json().then((data) => {
      return data;
    });
    return users;
  }

  //   getNumberOfUsers() {
  //     const numberOfUsers = parseInt(localStorage.getItem("numberOfUsers"));
  //     if (numberOfUsers) {
  //       return numberOfUsers;
  //     }

  //     return 0;
  //   }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  is_loggedin() {
    return this.getCurrentUser() != null;
  }

  is_admin() {
    return this.getCurrentUser().email === this.adminEmail;
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
  async getAllEmails() {
   
    const response = await fetch(this.mainurl + "all-email");
    return await response.json().then((data) => {
      return data;
    });
   
  }
}

export default UserService;
