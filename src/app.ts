import express from "express";
import { ErrorRequestHandler } from "express";
import { errorHandler } from "./middlewares/error.middleware.js";

import { ProductController } from "./product/product.controller.js";
import { MongoProductRepository } from "./product/product.repository.js";
import { ProductService } from "./product/product.service.js";
import { ProductRouter } from "./product/product.routes.js";

import { CategoryController } from "./category/category.controller.js";
import { MongoCategoryRepository } from "./category/category.repository.js";
import { CategoryService } from "./category/category.service.js";
import { CategoryRouter } from "./category/category.routes.js";

import { CatalogController } from "./catalog/catalog.controller.js";
import { MongoCatalogRepository } from "./catalog/catalog.repository.js";
import { CatalogService } from "./catalog/catalog.service.js";
import { CatalogRouter } from "./catalog/catalog.routes.js";

import { FormController } from "./form/form.controller.js";
import { MongoFormRepository } from "./form/form.repository.js";
import { FormService } from "./form/form.service.js";
import { FormRouter } from "./form/form.routes.js";

import { connectDB } from "./config/mongoose.js";

export class App {
  public readonly app;

  constructor({
    productRepository,
    productController,
    productService,
    categoryRepository,
    categoryController,
    categoryService,
    catalogRepository,
    catalogController,
    catalogService,
    formRepository,
    formController,
    formService,
  }: {
    productRepository?: MongoProductRepository;
    productController?: ProductController;
    productService?: ProductService;
    categoryRepository?: MongoCategoryRepository;
    categoryController?: CategoryController;
    categoryService?: CategoryService;
    catalogRepository?: MongoCatalogRepository;
    catalogController?: CatalogController;
    catalogService?: CatalogService;
    formRepository?: MongoFormRepository;
    formController?: FormController;
    formService?: FormService;
  } = {}) {
    this.app = express();
    this.app.use(express.json());

    const productRepo = productRepository || new MongoProductRepository();
    const productServ = productService || new ProductService(productRepo);
    const productCont = productController || new ProductController(productServ);
    const productRouter = new ProductRouter(productCont);

    const categoryRepo = categoryRepository || new MongoCategoryRepository();
    const categoryServ = categoryService || new CategoryService(categoryRepo);
    const categoryCont =
      categoryController || new CategoryController(categoryServ);
    const categoryRouter = new CategoryRouter(categoryCont);

    const catalogRepo = catalogRepository || new MongoCatalogRepository();
    const catalogServ =
      catalogService || new CatalogService(catalogRepo, productRepo);
    const catalogCont = catalogController || new CatalogController(catalogServ);
    const catalogRouter = new CatalogRouter(catalogCont);

    const formRepo = formRepository || new MongoFormRepository();
    const formServ = formService || new FormService(formRepo);
    const formCont = formController || new FormController(formServ);
    const formRouter = new FormRouter(formCont);

    this.app.use("/api/products", productRouter.router);
    this.app.use("/api/categories", categoryRouter.router);
    this.app.use("/api/catalogs", catalogRouter.router);
    this.app.use("/api/forms", formRouter.router);
    this.app.use(errorHandler as ErrorRequestHandler);
  }
  static getDefaults() {
    const productRepository = new MongoProductRepository();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    const categoryRepository = new MongoCategoryRepository();
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    const catalogRepository = new MongoCatalogRepository();
    const catalogService = new CatalogService(
      catalogRepository,
      productRepository,
    );
    const catalogController = new CatalogController(catalogService);

    const formRepository = new MongoFormRepository();
    const formService = new FormService(formRepository);
    const formController = new FormController(formService);

    return {
      productRepository,
      productController,
      productService,
      categoryRepository,
      categoryController,
      categoryService,
      catalogRepository,
      catalogController,
      catalogService,
      formRepository,
      formController,
      formService,
    };
  }

  async start(port = 3000) {
    await connectDB();
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default App;
