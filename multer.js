const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        const filename= Date.now() + '_' + file.originalname;

        cb(null, filename)
    }

})

exports.upload=multer({storage:storage})








