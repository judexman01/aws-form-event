import classes from "./App.module.css";
import { useRef, useState } from "react";
import image from "./aws_event_img.jpeg";

// Create the DynamoDB service client module using ES6 syntax.

// Set the AWS Region.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN0tvOYXcAZMb0_RbEd-vpwybVfbY_BGc",
  authDomain: "aws-form-event.firebaseapp.com",
  projectId: "aws-form-event",
  storageBucket: "aws-form-event.appspot.com",
  messagingSenderId: "960083002327",
  appId: "1:960083002327:web:3b952b2938cc88ec610192",
  measurementId: "G-MEG8QFNJ6D",
};

// Initialize Firebase
// to aws
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

function App() {
  const [submitPage, setSubmitPage] = useState(false);
  const emailVal = useRef("");
  const firstNameVal = useRef("");
  const lastNameVal = useRef("");
  const phoneVal = useRef("");
  const orgNameVal = useRef("");
  const orgRoleVal = useRef("");
  const roleVal = useRef("");
  const contactVal = useRef("");
  const questionVal = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      emailVal.current.value === "" ||
      firstNameVal.current.value === "" ||
      lastNameVal.current.value === "" ||
      phoneVal.current.value === "" ||
      orgNameVal.current.value === "" ||
      orgRoleVal.current.value === "" ||
      roleVal.current.value === "" ||
      contactVal.current.value === ""
    ) {
      window.alert("One or More parameters missing");
      throw "One or More parameters missing";
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailVal.current.value, "tman-aws")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...

        // send and reply emails
        // Load the AWS SDK for Node.js

        // create A table
        var AWS = require("aws-sdk");
        // Set the region
        AWS.config.update({ region: "us-east-1" });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:c9011019-416b-4a61-9407-2ebb90bf9ec3",
        });
        // Create the DynamoDB service object
        var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

        var params = {
          TableName: "actual_users",
          Item: {
            USER_ID: { S: `${emailVal.current.value}` },
            USER_NAME: { S: `${firstNameVal.current.value}` },
            EMAIL: { S: `${emailVal.current.value}` },
            FIRSTNAME: { S: `${firstNameVal.current.value}` },
            LASTNAME: { S: `${lastNameVal.current.value}` },
            PHONE: { S: `${phoneVal.current.value}` },
            ORG_NAME: { S: `${orgNameVal.current.value}` },
            ORG_ROLE: { S: `${orgRoleVal.current.value}` },
            ROLE: { S: `${roleVal.current.value}` },
            CONTACT: { S: `${contactVal.current.value}` },
            QUESTION: { S: `${questionVal.current.value}` },
          },
        };

        // Call DynamoDB to add the item to the table
        ddb.putItem(params, function (err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data);
          }
        });

        // dynamo end

        // Set the region
        var AWS = require("aws-sdk");
        AWS.config.region = "us-east-1"; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:c9011019-416b-4a61-9407-2ebb90bf9ec3",
        });
        // Create sendEmail params
        var params = {
          Destination: {
            /* required */
            CcAddresses: [
              `${emailVal.current.value}`,
              /* more items */
            ],
            ToAddresses: [
              `${emailVal.current.value}`,
              /* more items */
            ],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: `Dear ${firstNameVal.current.value} thank for for registering looking forward to meeting you.`,
              },
              Text: {
                Charset: "UTF-8",
                Data: `Dear ${firstNameVal.current.value} thank for for registering looking forward to meeting you.`,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Registered",
            },
          },
          Source: "etuk_imoh@yahoo.com" /* required */,
          ReplyToAddresses: [
            "etuk_imoh@yahoo.com",
            /* more items */
          ],
        };
        var toAwsCommunity = {
          Destination: {
            /* required */
            CcAddresses: [
              "etuk_imoh@yahoo.com",
              /* more items */
            ],
            ToAddresses: [
              "etuk_imoh@yahoo.com",
              /* more items */
            ],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: `New user by name ${firstNameVal.current.value} just completed the registration process`,
              },
              Text: {
                Charset: "UTF-8",
                Data: `Dear ${firstNameVal.current.value} thank for for registering looking forward to meeting you.`,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Registered",
            },
          },
          Source: "etuk_imoh@yahoo.com" /* required */,
          ReplyToAddresses: [
            "etuk_imoh@yahoo.com",
            /* more items */
          ],
        };

        // Create the promise and SES service object
        var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
          .sendEmail(params)
          .promise();

        // Handle promise's fulfilled/rejected states
        sendPromise
          .then(function (data) {
            console.log(data.MessageId);
          })
          .catch(function (err) {
            console.error(err, err.stack);
            console.log(err);
          });

        setSubmitPage(true);
        // Create the promise and SES service object
        var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
          .sendEmail(toAwsCommunity)
          .promise();

        // Handle promise's fulfilled/rejected states
        sendPromise
          .then(function (data) {
            console.log(data.MessageId);
          })
          .catch(function (err) {
            console.error(err, err.stack);
            console.log(err);
          });

        setSubmitPage(true);

        //  send to db
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:c9011019-416b-4a61-9407-2ebb90bf9ec3",
        });
        // Create sendEmail params

        // Create the DynamoDB service object
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        // ..
        window.alert("User Already Exist or Invalid Email Input");
      });
  };
  return (
    <div className={classes.body}>
      {!submitPage && (
        <form className={classes.form}>
          <h2 className={classes.h3}>AWS SECURITY SUMMIT NIGERIA, 2022</h2>

          <label htmlFor='Email'> Email</label>
          <input type='email' id='email' ref={emailVal} />

          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' ref={firstNameVal} />

          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' ref={lastNameVal} />

          <label htmlFor='phone'>Phone Number</label>
          <input type='number' id='phone' ref={phoneVal} />

          <label htmlFor='orgName'>Name of your organization</label>
          <input type='text' id='orgName' ref={orgNameVal} />

          <label htmlFor='orgRole'>Your role in your organization</label>
          <input type='text' id='orgRole' ref={orgRoleVal} />

          <label htmlFor='role'>
            Which of theses security tracks are you interested in?
          </label>
          <select name='role' id='role' ref={roleVal}>
            <option value='select-option'>Select option</option>
            <option value='IAM'>IAM</option>
            <option value='DevSecOps'>DevSecOps</option>
            <option value='Infrastructure-sec'>Infrastructure Security</option>
            <option value='Other'>Other</option>
          </select>
          <label htmlFor='contact' className={classes.question}>
            Would you like us to share your contact information with our
            sponsors?
          </label>
          <select name='contact' id='contact' ref={contactVal}>
            <option value='select-option'>Select option</option>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>

          <label htmlFor='question'>
            Do you have any question or suggestions for us?
          </label>
          <input type='text' id='question' ref={questionVal} />
          <button className={classes.btn} type='submit' onClick={submitHandler}>
            Submit
          </button>
          {/* <button className={classes.button} type='submit'>
            Submit
          </button> */}
        </form>
      )}

      {submitPage && (
        <div className={classes.centered_message}>
          <h1>You're welcome to the Summit.</h1>
          <h2 className={classes.thanks}>Thank you for joining us.</h2>
        </div>
      )}
      {/* <div> 
        <button onClick={testHandler}>Test</button>
      </div> */}
    </div>
  );
}
// export const REGION = "us-east-1"; // For example, "us-east-1".
// // Create an Amazon DynamoDB service client object.
// export const ddbClient = new DynamoDBClient({ region: REGION });

export default App;
