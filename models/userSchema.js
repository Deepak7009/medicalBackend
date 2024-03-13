// const mongoose = require("mongoose");
// const userSchema = mongoose.Schema({
//   report: Object,
// });
// module.exports = mongoose.model("user", userSchema);
const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  // Define the structure of the report data
  testName: String,
  result: String,
  investigation: String,
  referenceValue: String,
  unit: String,
});

const userSchema = mongoose.Schema({
  report: [reportSchema], // Array of report objects
  patientinfo: {
    // Define the structure of patient information
    firstName: String, // Keep 'patientName' as a single field
    // dateOfBirth: Date,
    age: Number,
    gender: String,
    email: String,
    phoneNumber: String,
    zipCode: String,
    address: String,
    referringDoctor: String,
    // collection: String,
  },
});

module.exports = mongoose.model("user", userSchema);
