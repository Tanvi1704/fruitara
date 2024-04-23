const cloudinary = require('cloudinary');
const { json } = require('express');

cloudinary.config({ 
    cloud_name: 'dsrvnspyb', 
    api_key: '416884749254838', 
    api_secret: '1-6qraxpi6TRTLzKjznJ_gMCgmg' 
  });

  const imageUploadControllers = async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url:result.secure_url,
            public_id : result.public_id,

        })
    }
    catch(error){
        console.log(error);
    }
  }

module.exports = {imageUploadControllers};