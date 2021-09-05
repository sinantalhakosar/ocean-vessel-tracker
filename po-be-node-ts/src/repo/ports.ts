import { Port, IPortModel } from '../models/ports';
import { IPort } from '../types/ports';

export async function createNewPort({country, location, name, coordinates}: IPort): Promise<IPort> {
  return Port.create({country, location, name, coordinates});
}

// import { IUserDocument, IUserModel } from "./users.types";
// export async function findOneOrCreate(
//   this: IUserModel,
//   userId: string
// ): Promise<IUserDocument> {
//   const record = await this.findOne({ userId });
//   if (record) {
//     return record;
//   } else {
//     return this.create({ userId });
//   }
// }
// export async function findByAge(
//   this: IUserModel,
//   min?: number,
//   max?: number
// ): Promise<IUserDocument[]> {
//   return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
// }