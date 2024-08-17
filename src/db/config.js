import mongoose from "mongoose";

export async function connection(params) {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => console.log("Connected to MongoDB"));
    connection.on("error", (err) => {
      console.error("Oops. it seem mongodb service is'nt up", err);
      process.exit();
    });
  } catch (error) {
    console.error("Something went wrong ");
  }
}
