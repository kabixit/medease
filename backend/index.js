// Backend: server.js

const express = require('express');
const AgoraRTMTokenBuilder = require('agora-access-token');

const app = express();

// Generate Agora RTM token
app.get('/rtm-token', (req, res) => {
  const appId = '<your_app_id>';
  const appCertificate = '<your_app_certificate>';
  const uid = req.query.uid || 0;
  const expirationTimeInSeconds = 3600;

  const token = AgoraRTMTokenBuilder.buildTokenWithUid(appId, appCertificate, uid, AgoraRTMTokenBuilder.Role.Rtm_User, expirationTimeInSeconds);

  res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
