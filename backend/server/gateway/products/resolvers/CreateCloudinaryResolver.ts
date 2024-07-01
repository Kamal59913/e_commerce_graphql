import { cloudinary } from "@/utils/api/utils/cloudinary/cloudinary";

const CreateCloudinaryResolver = async (parent, args, context) => {

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

  console.log("reached here", cloudinary.config())
  const { public_id } = args.input

  if(!public_id ) {
    return {
      errors: [
        {
          message: 'Public_Id is not valid',
          code: 'PUBLIC_ID_INEXIST',
        },
      ],
    };
  }


    const cld = await cloudinary.uploader.destroy(public_id, {invalidate: true})
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      if(err) {
        return {
          errors: [{
            message: 'Unable to delete the image',
            code: 'IMAGE_NOT_DELETED'
          }]
        }
      }
    })
  

return {
  success: true,
  errors: null
}
};

export default CreateCloudinaryResolver;
