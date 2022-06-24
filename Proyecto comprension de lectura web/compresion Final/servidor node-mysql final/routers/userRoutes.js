import { Router } from "express";
import { methods as userControllers } from "../controllers/controller.users";
import auth from '../middleware/autenticacion';

const router = Router();

router.put("/api/addUsers", userControllers.addUsers);
router.post("/api/login", userControllers.login);
router.get("/api/login", auth, userControllers.autenticacionUser);
// router.put("/api/updatelanguages/:id", languageController.updateLanguage);

export default router;