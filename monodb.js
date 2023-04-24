const mongoose = require("mongoose");

exports.connect = async () => {
  await mongoose.connect(
    "mongodb+srv://egalitsky33:IPjp0rLGvQ3uJ6KO@cardb.4v8jkl0.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("DB connected");
};
