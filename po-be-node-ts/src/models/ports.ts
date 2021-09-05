import { Document, Schema, Model, model} from "mongoose";
import { IPort } from "../types/ports";

export interface IPortModel extends IPort, Document {
}

export const PortSchema: Schema = new Schema({
    country: String,
    location: String,
    name: String,
    coordinates: {
        type: [Number, Number],
        default: [0,0]
    },
});
PortSchema.pre("save", function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const Port: Model<IPortModel> = model<IPortModel>("Port", PortSchema);