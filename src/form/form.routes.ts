import { Router } from "express";
import {FormController} from "./form.controller.js";

export const formRouter = Router();

const formController = new FormController();


formRouter.get("/", formController.getAllform);
formRouter.get("/:id", formController.getformById);
formRouter.post("/", formController.createform);
formRouter.put("/:id", formController.updateform);
formRouter.delete("/:id", formController.deleteform);