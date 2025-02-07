/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
// const {getFirestore} = require("firebase-admin/firestore");
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp();

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.docWritten = functions.firestore
  .document("data/{dayId}")
  .onWrite((change, context) => {
    console.log("change", change);
    let numeroDia = null;
    if (change.after.exists) { numeroDia = change.after.data().numero_dia; }
    else { numeroDia = change?.before?.data()?.numero_dia; }
    const msg = {
      notification: {
        title: "Día cambiado",
        body: "Se ha cambiado el día " + numeroDia
      },
      topic: "all"
    };

    console.log("I'm going to send a message 1", msg);
    return admin.messaging().send(msg)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return response;
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        return error;
      });
  });

exports.docUpdated = functions.firestore
  .document("data/{dayId}")
  .onUpdate((change, context) => {
    console.log("change", change);
    const msg = {
      notification: {
        title: "Día actualizado",
        body: "Se ha actualizado el día " + change?.after?.data()?.numero_dia
      },
      topic: "all"
      // token: "fxxYPMZC_jOBdWx1GC9sYV:APA91bFko22NAmyBAXkO9s2_VZjsAPahI8IlEselajL8kwULhswSZwGTi-ihU5dSDFitum9tBYmsLEwXaogTg8vFn8kQN-5HQbdECTvcJoBRr3mVbePYcMbZP8-6R-PS6v5Vhx4Fuv1Z"
    };

    console.log("I'm going to send a message 2", msg);
    return admin.messaging().send(msg)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return response;
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        return error;
      });
  });