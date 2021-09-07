import { Document, Schema, Model, model} from "mongoose";
import { ISearch } from "../types/search.type";

export interface ISearchModel extends ISearch, Document {}

export const SearchSchema: Schema = new Schema({
    TIME: Date,
    LONGITUDE: Number,
    LATITUDE: Number,
    IMO: String,
    NAME: String,
    TYPE: Number,
    DEST: String,
    ETA: Date,
    SOG: Number,
});

SearchSchema.pre("save", function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const Search: Model<ISearchModel> = model<ISearchModel>("Search", SearchSchema);