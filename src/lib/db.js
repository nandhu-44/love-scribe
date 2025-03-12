import mongoose from 'mongoose';

async function connectToDatabase() {
  mongoose.connect(process.env.MONGODB_URI).catch((err) => {
    console.log("[MongoConnectError] : ", err?.message);
  });
}

export default connectToDatabase;