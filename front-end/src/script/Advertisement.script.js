import Entity from "./Entity.script";
import axios from "axios";

class Advertisement extends Entity {

    key = "advertisement";

    schema = {
        "title": null,
        "experience": null,
        "description": null,
        "location": null,
        "type": null,
        "remote": false,
        "salarie": null,
        "active": false,
        "isPartTime": false,
        "companyId": null
    }

    search(searchData){
        let self = this;
        return new Promise(function (resolve, reject) {
            axios.post(self.getPath() + "/search", searchData).then(
                data => {
                    resolve(data.data);
                })
        })
    }
}

export default Advertisement;