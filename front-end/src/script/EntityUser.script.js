import Entity from "./Entity.script";
import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


class EntityUser extends Entity {

    cookieName = null;
    baseImagePath = 'http://localhost:3000/static';


    getImagePath(entity, email, image){
        return `${this.baseImagePath}/${entity}/${email}/${image}`;
    }

    getFile(entity, email){
        return new Promise( function (resolve, reject) {
            axios.post(`http://localhost:3000/api/${entity}/get-file`, {entity: entity, email: email})
                .then(data => { resolve(data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    login(incomeData) {

        let self = this;
        let path = this.getPath() + '/login'

        return new Promise(function(resolve, reject) {
            axios.post(path, incomeData)
                .then(data => {
                    cookies.set(self.cookieName, data.data, "30d");
                    resolve(data);
                })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    logout(){
        let confirmLogout = confirm("Do you want to logout ?");

        if(confirmLogout){
            cookies.remove(cookies.keys().toString());
        }
    }

    decode(token) {
        let path = this.basePath + 'decode';
        return new Promise(function (resolve, reject) {
            axios.post(path, {token: token})
                .then(data => { resolve(data.data); })
                .catch(e => { reject(e.response.data.message); })
        })
    }
}

export default EntityUser;