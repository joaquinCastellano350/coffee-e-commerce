import {Request, Response, NextFunction} from 'express'

export interface FilteredRequest extends Request {
    filters?: Record<string, any>;
}

function parseFilters(req: FilteredRequest, res: Response, next: NextFunction) {

    const {price_min, price_max, brand, category, stock, name} = req.query

    const filters: Record<string, any> = {}
    // if (price_min) filters.price_min = parseFloat(price_min as string);
    // if (price_max) filters.price_max = parseFloat(price_max as string);
    if (brand) filters.brand = brand;
    if (category) filters.category = category;
    // if (stock) filters.stock = Number(stock);
    if (name) filters.name = String(name).trim();

    req.filters = filters;
    next();
}

export default parseFilters;