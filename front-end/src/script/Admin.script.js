import EntityUser from "./EntityUser.script";

class Admin extends EntityUser {

    key = "admin";
    cookieName = "JWT_Admin";
    headers = { headers: { "Content-Type": "application/json" } }

    schema = {
        "username": null,
        "email": null,
        "password": null
    }
}

export default Admin;