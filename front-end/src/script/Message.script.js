import Entity from "./Entity.script";
import Advertisement from "./Advertisement.script";
import People from "./People.script";

class Message extends Entity {

    key = "message";

    schema = {
        "sender": null,
        "message": null,
        "peopleId": null,
        "companyId": null,
        "advertisementId": null
    }

    filterPeopleMessages(id) {
        console.log('filter')
        let advertisement = new Advertisement();
        let list = {};
        let self = this;
        return new Promise(function (resolve) {
            self.getByEntity('people', id).then(res => {
                for (let index in res) {
                    advertisement.getOneById(res[index].advertisementId).then(r => {
                        res[index].ad = r;
                        let arrayKey = r.title;
                        if(!list.hasOwnProperty(arrayKey)) {
                            list[arrayKey] = [res[index]];
                            if((parseInt(index)) === res.length-1) { resolve(list) }
                        } else {
                            list[arrayKey].push(res[index]);
                            list[arrayKey].sort((a, b) => a.id - b.id);
                            if((parseInt(index)) === res.length-1) { resolve(list) }
                        }
                    })
                }
            });
        });
    }

    filterCompanyMessages(id) {
        let people = new People();
        let list = {};
        let self = this;
        return new Promise(function (resolve) {
            self.getByEntity('company', id).then(res => {
                for (let index in res) {
                    people.getOneById(res[index].peopleId).then(r => {
                        res[index].people = r;
                        let arrayKey = r.name + ' ' + r.firstName;
                        if(!list.hasOwnProperty(arrayKey)) {
                            list[arrayKey] = [res[index]];
                            if((parseInt(index)) === res.length-1) { resolve(list) }
                        } else {
                            list[arrayKey].push(res[index]);
                            list[arrayKey].sort((a, b) => a.id - b.id);
                            if((parseInt(index)) === res.length-1) { resolve(list) }
                        }
                    })
                }
            });
        });
    }
}

export default Message;