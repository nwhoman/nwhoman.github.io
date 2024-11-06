import mongoose from 'mongoose';
import 'dotenv/config.js';
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true,
        useUnifiedTopology: true 
     }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: String, required: true},
    userId:{type: String, required: true}
});

const userSchema = mongoose.Schema({
    username: {type: String, required: true}
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);
const UserModel = mongoose.model("user", userSchema);

const formatDate = (date) => {
    return new Date(date).toDateString()
}

const createExercise = async (description, duration, date = Date.now(), userId) => {
    if (date == '') {
        date = Date.now();
    }
    const user = await getUserById(userId);
    const username = user[0].username;

    const exercise = new ExerciseModel({username: username, description: description, duration: duration, date: formatDate(date), userId: userId});
    exercise.save();
    const userObj = {};
    Object.assign(userObj, { ...user[0]['_doc'] })
    Object.assign(userObj, { description: description });
    console.log(typeof userObj, userObj);
    userObj['duration'] = duration;
    userObj['date'] = formatDate(date);
    return userObj;
};
const createUser = async (username) => {
    const user = new UserModel({username: username});
    return user.save()
};

const getAllExercises = async (filter) => {
  console.log(filter);
  const query = await ExerciseModel.find(filter).exec();
  return query;
};

const getUserById = async (userId) => {
    const query = await UserModel.find({ _id: userId }).exec();
    
    return query//[0].username
};

const getAllUsers = async (filter) => {
  const query = UserModel.find(filter);
  return query.exec();
};
const deleteUsers = async (update) => {
    
};
const deleteOne = async (_id, update) => {
    const result = await UserModel.deleteOne({_id: _id}, update);
    return result.deletedCount;
};

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { ExerciseModel, UserModel, createUser, createExercise, getUserById, getAllUsers, getAllExercises, deleteUsers, deleteOne, formatDate };