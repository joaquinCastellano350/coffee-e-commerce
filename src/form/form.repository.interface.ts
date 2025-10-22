import { IForm } from "./form.model.js";

export interface FormRepository {
  findAll(): Promise<IForm[]>;
  findOne(id: string): Promise<IForm | null>;
  add(data: Partial<IForm>): Promise<IForm | null>;
  update(id: string, data: Partial<IForm>): Promise<IForm | null>;
  delete(id: string): Promise<IForm | null>;
}
