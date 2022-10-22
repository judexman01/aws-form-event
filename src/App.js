import classes from "./App.module.css";
import { useRef, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
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
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

function App() {
  const [submitPage, setSubmitPage] = useState(false);
  const nameVal = useRef("");
  const emailVal = useRef("");
  const sexVal = useRef("");
  const eventVal = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailVal.current.value, "tman-aws")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        // write data
        function writeUserData(name, email, sex, event) {
          const db = getDatabase();
          set(ref(db, "aws-form/" + name), {
            Name: name,
            email: email,
            Sex: sex,
            Event: event,
          });
        }
        writeUserData(
          nameVal.current.value,
          emailVal.current.value,
          sexVal.current.value,
          eventVal.current.value
        );

        //send and reply emails
        // Load the AWS SDK for Node.js
        var AWS = require("aws-sdk");
        // Set the region
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
                Data: `Dear ${nameVal.current.value} thank for for registering looking forward to meeting you.`,
              },
              Text: {
                Charset: "UTF-8",
                Data: `Dear ${nameVal.current.value} thank for for registering looking forward to meeting you.`,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Registered",
            },
          },
          Source: "abubakaronumoh@gmail.com" /* required */,
          ReplyToAddresses: [
            "abubakaronumoh@hmail.com",
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        window.alert("User Already Exist");
      });
  };
  return (
    <div className={classes.body}>
      {!submitPage && (
        <form className={classes.form}>
          <label htmlFor='name'> Name</label>
          <input type='text' id='name' ref={nameVal} />
          <label htmlFor='Email'> Email</label>
          <input type='email' id='email' ref={emailVal} />
          <label htmlFor='sex'> Sex</label>
          <select name='sex' id='sex' ref={sexVal}>
            <option value='Male'>Male</option>
            <option value='Male'>Female</option>
            <option value='Male'>Other</option>
          </select>
          <label htmlFor='past' className={classes.question}>
            Have you attended any event hosted by Amazon in the past ?
          </label>
          <select name='yesorno' id='event' ref={eventVal}>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>

          <button className={classes.btn} type='submit' onClick={submitHandler}>
            Submit
          </button>
        </form>
      )}

      {submitPage && <h1>Thank You for Registering!</h1>}
    </div>
  );
}

export default App;
