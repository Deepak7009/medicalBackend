// const mongoose = require("mongoose");
// const reportSchema = mongoose.Schema({
//   report: Array,
// });
// module.exports = mongoose.model("user", userSchema);
const mongoose = require("mongoose");


// const reportSchema = mongoose.Schema({
//     testName: String,
//     result: String,
//     investigation: String,
//     referenceValue: String,
//     unit: String,
//   });

  const userSchema = mongoose.Schema({
    report: Object,
    // Change to an array of report objects
    // patientinfo: {
    //   firstName: String,
    //   age: Number,
    //   gender: String,
    //   email: String,
    //   phoneNumber: String,
    //   zipCode: String,
    //   address: String,
    //   referringDoctor: String,
    // },
});

module.exports = mongoose.model("test", userSchema);