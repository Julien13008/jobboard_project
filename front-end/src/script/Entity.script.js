import axios from "axios";

class Entity {

    key = null;
    schema = {};
    headers= null;

    basePath = 'http://localhost:3000/api/';

    getPath() {
        return this.basePath + this.key
    }

    getIdPath(id) {
        return this.getPath() + `/${id}`;
    }

    getEntityByIdPath(entityKey, id) {
        return this.getPath() + `/${entityKey}/${id}`;
    }

    create(incomeData) {
        let filteredFormData = {};
        Object.assign(filteredFormData, this.schema,  incomeData);
        let self = this;
            return new Promise(function(resolve, reject) {
            axios.post(self.getPath(), filteredFormData, self.headers)
                .then(data => { resolve(data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    getAll() {
        let self = this;
        return new Promise( function (resolve, reject) {
            axios.get(self.getPath())
                .then(data => { resolve(data.data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    getOneById(id) {
        let self = this;
        return new Promise( function (resolve, reject) {
            axios.get(self.getIdPath(id))
                .then(data => { resolve(data.data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    update(id, incomeData) {
        let self = this;
        return new Promise( function (resolve, reject) {
            axios.put(self.getIdPath(id), incomeData, self.headers)
                .then(data => { resolve(data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    delete(id) {
        let self = this;
        return new Promise( function (resolve, reject) {
            axios.delete(self.getIdPath(id))
                .then(data => { resolve(data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    getByEntity(entityKey , id) {
        let self = this;
        return new Promise( function (resolve, reject) {
            axios.get(self.getEntityByIdPath(entityKey,id))
                .then(data => { resolve(data.data); })
                .catch(e => { reject(e.response.data.message); })
        });
    }

    setData(data) {
        let object = {};

        for (const key in data) { if(data.hasOwnProperty(key) && data[key]){ object[key] = data[key]; } }

        return object;
    }
}

export default Entity;