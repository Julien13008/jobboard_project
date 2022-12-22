import EntityUser from "./EntityUser.script";

class People extends EntityUser {

    key = "people";
    cookieName = "JWT_People";
    headers = { headers: { "Content-Type": "multipart/form-data" } }

    schema = {
        "name": null,
        "firstName": null,
        "email": null,
        "password": null,
        "address": null,
        "postalCode": null,
        "city": null,
        "phone": null,
        "CV": null,
        "profilePicture": null
    }

}

export default People;