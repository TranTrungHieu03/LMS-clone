import express from "express"
import {
    addAnswer,
    addQuestion,
    editCourse,
    getAllCourse,
    getCourseByUser,
    getSingleCourse,
    uploadCourse
} from "../controllers/course.controller";
import {authorizeRoles, isAuthenticated} from "../middleware/auth";

const router = express.Router()
router.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse)

router.put("/update-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse)

router.get("/get-course/:id", getSingleCourse)

router.get("/get-courses", getAllCourse)

router.get("/get-course-content/:id", isAuthenticated, getCourseByUser)

router.put("/add-question", isAuthenticated, addQuestion)

router.put("/add-answer", isAuthenticated, addAnswer)
export default router;