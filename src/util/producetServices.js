const ProductModel=require('../models/product.model')
const cloudinary = require('../configs/cloudinary.config')



module.exports.uploadImage = (fd,image,name) =>{
      return cloudinary.uploader.upload(image,{folder : fd,public_id: name})
}

module.exports.deleteImage = (fd,name) =>{
    return cloudinary.api.delete_resources(fd+name)
}

module.exports.renameImage = (oldName,newName) =>{
    return  cloudinary.uploader.rename(oldName,newName)
}
module.exports.deleteFolder = (fd) =>{
    return  cloudinary.api.delete_folder(fd)  
}
module.exports.findById = (id) =>{
    return ProductModel.findById(id)
}
module.exports.findByIdAndRemove = (id) =>{
    return ProductModel.findByIdAndRemove(id)
}
module.exports.checkExist = async (name) => {
    const product = await ProductModel.findOne({name : name}).lean()
    if(product != null) {
        return true
    }
    else{
        return false
    }
}