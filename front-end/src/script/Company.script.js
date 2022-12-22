import EntityUser from "./EntityUser.script";

class Company extends EntityUser {

    key = "company";
    cookieName = "JWT_Company";
    headers = { headers: { "Content-Type": "multipart/form-data" } }

    schema = {
        "email": null,
        "name": null,
        "password": null,
        "logo": null
    };
}

export default Company;