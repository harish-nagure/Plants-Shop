import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://krshinde0794:lilymern@cluster0.dbc2dfz.mongodb.net/PlantNursery?appName=Cluster0"
  );
};
