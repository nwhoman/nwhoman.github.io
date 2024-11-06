import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//export {createExercise, findExercises, findExerciseById, updateExercise, deleteExercise, deleteExercises};