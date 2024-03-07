const user = require("../models/user2Schema");

const gets = async (req, res) => {
  console.log("data", req.body);
  res.send("Hello Deepak");
};

// const addUser = async (req, res) => {
//   console.log("req=>", req.body);
//   const { info, testResults } = req.body; // Extract patient info and test results from the request body
//   const users = req.body.testResults;
//     try {
//         const userCreate = await user.insertMany({report:users});
//         console.log("user create:", userCreate);
//         res.status(200).send(userCreate);
//     } catch (err) {
//         console.error("Error user:", err);
//         res.send("internal server error")
//     }
//   try {
//     const userCreate = await user.create({
//       report: reportData,
//       patientinfo: info,
//     });
//     console.log("user create:", userCreate);
//     const responseData = { info, testResults }; // Combine all data
//     res.status(200).json(responseData); // Send the combined data in the response
//   } catch (err) {
//     console.error("Error user:", err);
//     res.status(500).send("Internal server error");
//   }
// };
const addUser = async (req, res) => {
  console.log("req=>", req.body);
  const { info, testResults } = req.body;

  try {
    console.log("Creating user with the following data:");
    console.log("Patient Info:", info);
    console.log("Test Results:", testResults);

    // Insert multiple reports
    const userCreate = await user.create({report:req.body});

    console.log("User created report:", userCreate);
    const responseData = { info, testResults }; // Combine all data
    res.status(200).json(responseData); // Send the combined data in the response
    console.log("response",responseData)
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal server error");
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { gets, addUser, getAllUsers };
