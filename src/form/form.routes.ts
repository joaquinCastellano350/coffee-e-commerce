import { Router } from "express";
import {FormController} from "./form.controller.js";
import { validateSchema } from "../middlewares/validation.middleware.js"; 
import { createformSchema, updateformSchema } from "./form.validation.js";

export const formRouter = Router();

const formController = new FormController();


formRouter.get("/", formController.getAllform);
formRouter.get("/:id", formController.getformById);
formRouter.post("/", validateSchema(createformSchema), formController.createform);
formRouter.put("/:id", validateSchema(updateformSchema), formController.updateform);
formRouter.delete("/:id", formController.deleteform);