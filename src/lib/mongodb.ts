import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI as string, { dbName: 'test' });
