import { Router } from "express";
import { FormController } from "./form.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createformSchema, updateformSchema } from "./form.validation.js";

export class FormRouter {
  public readonly router = Router();

  constructor(formController: FormController) {
    this.router.get("/", formController.getAllForms);
    this.router.get("/:id", formController.getFormById);
    this.router.post(
      "/",
      validate(createformSchema),
      formController.createForm,
    );
    this.router.put(
      "/:id",
      validate(updateformSchema),
      formController.updateForm,
    );
    this.router.delete("/:id", formController.deleteForm);
  }
}
