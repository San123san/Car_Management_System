import { Router } from "express"
import { 
    carImageUploadWithDescriptionTopicTags,
    userCarRelatedInformation,
    allListProduct,
    updateCarProduct,
    carDelete
} from "../controllers/carProduct.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/carImageUploadWithDescriptionTopicTag").post(verifyJWT, upload.fields([
    {
        name: "carImage",
        maxCount: 10
    },
]), carImageUploadWithDescriptionTopicTags)

router.route("/listProduct").post(verifyJWT, userCarRelatedInformation)

router.route("/allList").post(allListProduct)

router.route("/updateProduct/:id").post(verifyJWT, upload.fields([
    {
        name: "carImage",
        maxCount: 10
    },
]), updateCarProduct)

router.route("/carDelete/:id").post(verifyJWT, carDelete)




export default router