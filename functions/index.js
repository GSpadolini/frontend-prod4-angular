const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const dataCollection = 'data/{docId}';

const sendNotification = (title, body, data) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    topic: 'travels',
  };

  return admin.messaging().send(message)
    .then(response => {
      console.log('Notification sent successfully:', response, message);
      return response;
    })
    .catch(error => {
      console.error('Error sending notification:', error, message);
    });
};

exports.onDocumentWrite = functions.firestore
  .document(dataCollection)
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const title = 'Document Changed onDocumentWrite';
    const body = 'Final Data: ' + JSON.stringify(document);

    return sendNotification(title, body, { type: 'write' });
  });

exports.onDocumentUpdated = functions.firestore
  .document(dataCollection)
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const title = 'Document Updated onDocumentUpdated';
    const body = 'Final Data: ' + JSON.stringify(newValue);

    return sendNotification(title, body, { type: 'update' });
  });
