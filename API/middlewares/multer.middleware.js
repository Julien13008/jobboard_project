const multer = require("multer");
const fs = require("fs");

exports.storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let entity = req.baseUrl.split("/")[2];
        let path;

        if(req.body?.email){
            path = `./public/${entity}/${req.body.email}`;
        } else if ( req.body?.advertisementId && req.body?.peopleId){
            path = `./public/${entity}/${req.body.advertisementId}/${req.body.peopleId}`;
        } else {
            cb(new Error("Data missing can't create directory"));
            return;
        }

        fs.mkdirSync(path, {recursive: true})
        cb(null, path)
    },
    filename: (req, file, cb) => {
            cb(null, file.originalname)
    }
})

function checkFile (req, file, cb) {
    let filetypes = /jpeg|png|jpg/;

    if(file.fieldname === "CV" || file.fieldname === "motivationLetter"){
        filetypes = /pdf/;
    }

    if(file.fieldname === "motivationLetter"){
        filetypes = /png|jpeg|jpg|pdf/;
    }

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype){
        return cb(null, true)
    } else {
        return cb(new Error(`${file.fieldname} file extension isn't good`));
    }
}

exports.upload = multer({
    storage: this.storage,
    fileFilter:  function (req, file, cb) {
        checkFile(req, file, cb)
    }
})