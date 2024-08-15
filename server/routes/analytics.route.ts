import express from "express";
import {authorizeRoles, isAuthenticated} from "../middleware/auth";
import {getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics} from "../controllers/analytics.controller";

const router = express.Router();
router.get("/get-users-analytics", isAuthenticated, authorizeRoles("admin"), getUsersAnalytics)

router.get("/get-courses-analytics", isAuthenticated, authorizeRoles("admin"), getCoursesAnalytics)

router.get("/get-orders-analytics", isAuthenticated, authorizeRoles("admin"), getOrdersAnalytics)

export default router;