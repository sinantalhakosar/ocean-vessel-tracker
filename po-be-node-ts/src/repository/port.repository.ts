import { Port, IPortModel } from '../models/port.model';
import { IPort } from '../types/port.type';

/**
 * Query for getting all ports' records
 * @returns List of ports having UNLOCODE (Basically Country-Location) and Name
 */
export async function getAllPortsUNLOCODE() {
  return Port.find({}).select({ "UNLOCODE": 1, "Name": 1,"_id": 0});
}

/**
 * Query for getting coordinates by selected port
 * @param country Port's country
 * @param location Port's location
 * @param location Port's name
 * @returns Object having Longitude & Latitude of selected port
 */
export async function getCoordinatesByDest(country: string, location: string, name: string) {
  return Port.findOne({
    "Country": country,
    "Location": location,
    "Name": name,
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
