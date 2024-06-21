import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(localFilePath, "this one")
        if (!localFilePath) {
            console.log("reached here on !localFilePath")
            return null
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        if(response) {
            fs.unlinkSync(localFilePath)
            return response;
        }

    } catch (error) {
        console.log("here localFilePath error occurred")
        fs.unlinkSync(localFilePath)
        return null;
    }
}



//  const deleteImage = async (url: string) => {   

//     if(url) {
//         const itsit = await cloudinary.uploader.destroy.toString()
//         console.log(itsit, "here it is")
//         console.log("process.env.CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY)
//         console.log(url, "reached on deleteImage")
//         const result = await cloudinary.uploader.destroy(`/${url}`)
//         .then(result => 
//             {
//                 console.log("result", result)
//             })
//             .catch((err) => {
//                 console.log(err, "Here is the error")
//             })
    
//             console.log(result, "Here is the result")
//         }
//     }

export {uploadOnCloudinary, cloudinary}