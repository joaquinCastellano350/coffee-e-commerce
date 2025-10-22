import { Request, Response, NextFunction } from "express";

export interface FilteredRequest extends Request {
  filters?: Record<string, string | number>;
}

function parseFilters(req: FilteredRequest, res: Response, next: NextFunction) {
  const { price_min, price_max, brand, category, stock, name } = req.query;

  const filters: Record<string, string | number> = {};
  // if (price_min) filters.price_min = parseFloat(price_min as string);
  // if (price_max) filters.price_max = parseFloat(price_max as string);
  if (brand) filters.brand = String(brand);
  if (category) filters.category_slug = String(category);
  // if (stock) filters.stock = Number(stock);
  if (name) filters.name = String(name).trim();

  req.filters = filters;
  next();
}

export default parseFilters;
