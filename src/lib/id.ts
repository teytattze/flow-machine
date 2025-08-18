import { ObjectId } from "mongodb";

export const newId = () => new ObjectId().toHexString();
