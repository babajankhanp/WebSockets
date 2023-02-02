const mongoose = require("mongoose");
const url  = "mongodb+srv://babajankhan:babajankhan@cluster0.pmmz1p2.mongodb.net/patientdata?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Database Connection Success!');
    console.log(url)
  } catch (err) {
    console.log('MongoDB Database Connection Failed!', err.message);
  }
};

module.exports = connectDB;

