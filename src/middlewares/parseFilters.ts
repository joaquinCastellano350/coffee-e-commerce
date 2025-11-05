import { Request, Response, NextFunction } from "express";

export interface FilteredRequest extends Request {
  filters?: Record<string, string | number>;
}

function parseFilters(req: FilteredRequest, res: Response, next: NextFunction) {
  const {page, limit,  brand, category, name } = req.query;

  const filters: Record<string, string | number> = {};
  if (brand) filters.brand = String(brand);
  if (category) filters.category_slug = String(category);
  if (name) filters.name = String(name).trim();

  filters.page = 1;
  filters.limit = 10;

  if (page) filters.page = Number(page);
  if (limit) filters.limit = Number(limit);

  

  req.filters = filters;
  next();
}

export default parseFilters;
