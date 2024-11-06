import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: String, required: true}
});

const userSchema = mongoose.Schema({
    username: {type: String, required: true}
});

const logSchema = mongoose.Schema({
    username: {type: String, required: true},
    count: {type: Number, required: true},
    log: [{
        description: {type: String, required: true},
        duration: {type: Number, required: true},
        date: {type: String, required: true}
    }]
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);
const Log = mongoose.model("Log", logSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date:date});
    return exercise.save()
};

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//export {createExercise, findExercises, findExerciseById, updateExercise, deleteExercise, deleteExercises};