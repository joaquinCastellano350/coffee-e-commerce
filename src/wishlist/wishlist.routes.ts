import { Router } from "express";
import { WishlistController } from "./wishlist.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { ProductsSchema } from "./wishlist.dto.js";

export class WishlistRouter {
  public readonly router = Router();

  constructor(wishlistController: WishlistController) {
    this.router.use(requireAuth);
    this.router.get("/", wishlistController.getWishlist);
    this.router.post("/merge", validate(ProductsSchema), wishlistController.mergeWishlist);
    this.router.post("/:productId", wishlistController.addToWishlist);
    this.router.delete("/:productId", wishlistController.removeFromWishlist);
}
}