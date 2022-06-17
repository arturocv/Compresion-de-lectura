import { Router } from "express";
import { methods as userControllers } from "../controllers/controller.users";

const router = Router();

router.put("/api/addUsers", userControllers.addUsers);
router.post("/api/login", userControllers.login);
// router.put("/api/updatelanguages/:id", languageController.updateLanguage);

export default router;