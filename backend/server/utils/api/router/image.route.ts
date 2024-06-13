import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { updateProfileImage } from "../controller/image.controller";
import { deleteProfileImage } from "../controller/image.controller";
import { upload } from "../middleware/multer.middleware";

const router = Router()

router.route("/profileimageupload").post(verifyJWT, upload.single('profile-image'), updateProfileImage)
router.route("/getposts/env/blogs/:envname").post(verifyJWT, deleteProfileImage)

export default router;