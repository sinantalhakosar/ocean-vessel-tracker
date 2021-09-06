import { Port, IPortModel } from '../models/ports';
import { IPort } from '../types/ports';

export async function getAllPortsUNLOCODE() {
  return Port.find({}).select({ "UNLOCODE": 1, "Name": 1,"_id": 0});
}

export async function getCoordinatesByDest(country: string, location: string) {
  return Port.findOne({
    "Country": country,
    "Location": location,
  }).select({ "Longitude": 1, "Latitude": 1, "_id": 0});;
  //
  // return Port.find({
  //   $and: [
  //   {"$or": [ { "Country" : { $regex: '.*' + destPort + '.*' }}, { "Location" : { $regex: '.*' + destPort + '.*' }}, { "UNLOCODE" : { $regex: '.*' + destPort + '.*' }}]},
  //   {"$or": [ { "Country" : { $regex: '.*' + country + '.*' }}, { "Location" : { $regex: '.*' + country + '.*' }}, { "UNLOCODE" : { $regex: '.*' + country + '.*' }}]},
  //   {"$or": [ { "Country" : { $regex: '.*' + location + '.*' }}, { "Location" : { $regex: '.*' + location + '.*' }}, { "UNLOCODE" : { $regex: '.*' + location + '.*' }}]}
  // ]
  // }).select({ "Longitude": 1, "Latitude": 1, "_id": 0});
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