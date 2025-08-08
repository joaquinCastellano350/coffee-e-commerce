import slugify from 'slugify';
import { formModel } from '../form/form.model.js'; 

export async function generateUniqueSlug(name: any): Promise<string> {
  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 0;

  while (await formModel.exists({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
}
