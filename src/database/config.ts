import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGODB_CNN!);
    console.log("Database online");
  } catch (error) {
    console.error(error);
    throw new Error("Error starting DB");
  }
};
