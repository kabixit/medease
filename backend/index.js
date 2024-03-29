require('dotenv').config();

const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const admin = require('firebase-admin');

// Access the environment variable containing the JSON content
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'medease1' // Replace 'your-project-id' with your Firebase project ID
});

// Get a Firestore instance
const db = admin.firestore();

// Function to send email using Nodemailer
function sendEmail(emailOptions) {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemailer3131@gmail.com',
      pass: 'bzmh dasm tzbg ciqg',
    },
  });

  // Send email
  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Function to schedule email sending
function scheduleEmails(medicationSchedule) {
  medicationSchedule.forEach((medication) => {
    const { time, medicationName, recipientEmail } = medication;
    const [hours, minutes] = time.split(':');

    // Schedule email sending at the specified time
    const job = schedule.scheduleJob({ hour: hours, minute: minutes }, function () {
      const emailOptions = {
        from: 'nodemailer3131@gmail.com',
        to: recipientEmail,
        subject: `Reminder: Take ${medicationName}`,
        text: `It's time to take your ${medicationName}.`,
      };

      // Send the email
      sendEmail(emailOptions);
    });
  });
}

// Function to fetch medication schedules from Firestore
// Function to fetch medication schedules from Firestore
// Function to fetch medication schedules from Firestore
async function fetchMedicationSchedules() {
  try {
    // Fetch medication schedules collection from Firestore
    const snapshot = await db.collection('reminders').get();

    // Initialize an array to store medication schedules
    const medicationSchedule = [];

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
      // Extract medication schedule data from Firestore document
      const data = doc.data();

      // Check if reminderTimes is not already in the desired format
      if (!Array.isArray(data.reminderTimes)) {
        console.error('Invalid reminderTimes format:', data.reminderTimes);
        return; // Skip this document
      }

      // Iterate through each time in the array
      data.reminderTimes.forEach((time) => {
        // Split time string into hours and minutes
        const [hours, minutes] = time.split(':');
        medicationSchedule.push({
          time: `${hours}:${minutes}`,
          medicationName: data.medication,
          recipientEmail: data.userId,
        });
      });
    });

    // Schedule emails based on fetched medication schedules
    scheduleEmails(medicationSchedule);
  } catch (error) {
    console.error('Error fetching medication schedules:', error);
  }
}



// Fetch medication schedules from Firestore and schedule emails
fetchMedicationSchedules();
