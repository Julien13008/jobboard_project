import Entity from "./Entity.script";

class JobApplication extends Entity {

    key = "job-application";
    headers = {headers: {"Content-Type": "multipart/form-data"}}


    schema = {
        "status": null,
        "motivationLetter": null,
        "advertisementId": null,
        "peopleId": null
    }

    peopleHasAlreadyApplied(adId, peopleId) {
        let self = this;
        return new Promise(function (resolve) {
            self.getByEntity('advertisement', adId).then(res => {
                for (let apply in res) { if (res[apply].peopleId === peopleId) { resolve(true); } }
                resolve(false);
            }).catch(err => {
                console.log('error', err)
            })
        })

    }
}

export default JobApplication;