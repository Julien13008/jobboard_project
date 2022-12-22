import Entity from "./Entity.script";

class Favori extends Entity {

    key = "favori";

    schema = {
        "peopleId": null,
        "advertisementId": null
    }

    isAlreadyFavourite(adId, peopleId) {
        let isFavourite = false;
        let id = null;
        let self = this;
        return new Promise(function (resolve, reject) {
            self.getByEntity('people', peopleId)
                .then(data => {
                    for (const key in data) {
                        if (data[key].advertisementId === adId) {
                            isFavourite = true;
                            id = data[key].id;
                        }
                    }
                    resolve({isFavourite: isFavourite, favoriId: id} );
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

export default Favori;