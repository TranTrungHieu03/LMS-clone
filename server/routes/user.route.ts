import express from 'express'
import {
    activateUser, deleteUser, getAllUsers,
    getUserInfo,
    loginUser,
    logoutUser,
    registrationUser, socialAuth,
    updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole
} from "../controllers/user.controller";
import {authorizeRoles, isAuthenticated} from "../middleware/auth";

const router = express.Router();
router.post("/registration", registrationUser);

router.post("/activation", activateUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, logoutUser);

router.get('/refresh-token', updateAccessToken);

router.get("/me", isAuthenticated, getUserInfo);

router.post("/social-auth", socialAuth);

router.put("/update-user-info", isAuthenticated, updateUserInfo);

router.put("/update-user-password", isAuthenticated, updatePassword);

router.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

router.get("/get-users", isAuthenticated, authorizeRoles("admin"), getAllUsers)

router.put("/update-user-role", isAuthenticated, authorizeRoles("admin"), updateUserRole);

router.put("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);
export default router;