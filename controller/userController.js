const user = require("../models/userSchema");

const gets = async (req, res) => {
  console.log("data", req.body);
  res.send("Hello Deepak");
};

const addUser = async (req, res) => {
  console.log("req=>", req.body);
  const { info, testResults } = req.body; // Extract patient info and test results from the request body
  const reportData = [];
  testResults.forEach((result) => {
    if (result && typeof result === "object") {
      Object.keys(result).forEach((testName) => {
        const testResult = result[testName]; // Extract the test result object
        reportData.push({
          testName: testName,
          result: testResult.result,
          investigation: testResult.investigation,
          referenceValue: testResult.referenceValue,
          unit: testResult.unit,
        });
      });
    } else {
      console.error("Invalid test result:", result);
    }
  });
  try {
    const userCreate = await user.create({
      report: reportData,
      patientinfo: info,
    });
    console.log("user create:", userCreate);
    const responseData = { info, testResults, reportData }; // Combine all data
    res.status(200).json(responseData); // Send the combined data in the response
  } catch (err) {
    console.error("Error user:", err);
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