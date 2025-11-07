import { NextFunction, Request, Response } from "express";
import { WishlistService } from "./wishlist.service.js";
export class WishlistController {
  private wishlistService: WishlistService;

  constructor(wishlistService: WishlistService) {
    this.wishlistService = wishlistService;
    this.getWishlist = this.getWishlist.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
    this.mergeWishlist = this.mergeWishlist.bind(this);
    this.getLocalWishlist = this.getLocalWishlist.bind(this);
  }

  async getLocalWishlist(req: Request, res: Response, next: NextFunction) {
    try {

        const productsIds = req.query.ids as string;
        const productsIdsArray = productsIds.split(',');
        const wishlist = await this.wishlistService.getLocalWishlist(productsIdsArray);
        res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
        const user = (req as any).user;
        const wishlist = await this.wishlistService.getAll(user.id);
        res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  async addToWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.productId;
      const user = (req as any).user;
      await this.wishlistService.add(user.id, productId);
      res.status(201).json({ message: "Product added to wishlist" });
    } catch (error) {
      next(error);
    }
  }

  async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const user = (req as any).user;
      await this.wishlistService.remove(user.id, productId);
      res.status(204).json({ message: "Product removed from wishlist" });
    } catch (error) {
      next(error);
    }
  }

  async mergeWishlist(req: Request, res: Response, next: NextFunction) {
    try {
        const user  = (req as any).user;
        const { productsIds } = req.body;
        const wishlist = await this.wishlistService.merge(user.id, productsIds);
        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
  }
}
