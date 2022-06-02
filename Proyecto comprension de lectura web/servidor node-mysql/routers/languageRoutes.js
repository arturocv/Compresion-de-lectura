import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller";

const router = Router();

router.get("/api/languages", languageController.getLanguages);
router.get("/api/languages/:id", languageController.getLanguagesById);
router.post("/api/addlanguages", languageController.addLanguages);
router.put("/api/updatelanguages/:id", languageController.updateLanguage);
router.delete("/api/deletelanguages/:id", languageController.deleteLanguage);

export default router;