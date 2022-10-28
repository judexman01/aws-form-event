// // Load the AWS SDK for Node.js
// var AWS = require("aws-sdk");
// // Set the region
// AWS.config.update({ region: "us-east-1" });
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: "us-east-1:c9011019-416b-4a61-9407-2ebb90bf9ec3",
// });

// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// var params = {
//   AttributeDefinitions: [
//     {
//       AttributeName: "USER_ID",
//       AttributeType: "S",
//     },
//     {
//       AttributeName: "USER_NAME",
//       AttributeType: "S",
//     },
//   ],
//   KeySchema: [
//     {
//       AttributeName: "USER_ID",
//       KeyType: "HASH",
//     },
//     {
//       AttributeName: "USER_NAME",
//       KeyType: "RANGE",
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 1,
//     WriteCapacityUnits: 1,
//   },
//   TableName: "actual_users",
//   StreamSpecification: {
//     StreamEnabled: false,
//   },
// };

// Call DynamoDB to create the table
ddb.createTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
