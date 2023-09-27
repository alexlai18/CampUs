import mongoose from "mongoose";

const connection = {};

const connectMongoDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGODBURI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoDB;