import mongoose from "mongoose";

mongoose.connect("mongodb+srv://guilhermeee314:chico314@chicodb.u9eo0qg.mongodb.net/?retryWrites=true&w=majority&appName=ChicoDB");

let db = mongoose.connection;

export default db;