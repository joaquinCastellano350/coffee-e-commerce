import { Router } from "express";
import {FormController} from "./form.controller.js";
import { validate } from "../middlewares/validation.middleware.js"; 
import { createformSchema, updateformSchema } from "./form.validation.js";

export const formRouter = Router();

const formController = new FormController();


formRouter.get("/", formController.getAllForms);
formRouter.get("/:id", formController.getFormById);
formRouter.post("/", validate(createformSchema), formController.createForm);
formRouter.put("/:id", validate(updateformSchema), formController.updateForm);
formRouter.delete("/:id", formController.deleteForm);