const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
 admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail:process.env.CLIENT_EMAIL,
    privateKey:process.env.PRIVIATE_KEY,
    projectId:process.env.PROJECT_ID
  }),
});

app.get('/ping', async (req, res) => {
  res.send({
    isWork: true,
  });
});

app.get('/push/test', async (req, res) => {

  const token = req.query?.token?.toString() || 'dJOftuSwfQpu5qQFWdn-DQ:APA91bF9l_S47fh5Dw-64aOkpU6EP-XhT-AUN3S1bllHmwpwzUDF0-dmwHw2Tnhq1qG0UEkFc6Q4QJ-IN5hm8GZn7XdnwrGiVZCqxSRxWQ_VDvP6oNvq86s'
  const bodyTest = {
    message: {
      notification: {
        title: 'messageObj',
        body: 'messageObj',
      },
      data: {
        id: '1',
        name: 'test',
      },
    },
    listToken: [token],
  };

  const messageArr = bodyTest.listToken.map((token) => ({
    ...bodyTest.message,
    token,
  }));
   

  await admin
    .messaging()
    .sendEach(messageArr)
    .then((result) => { 
      res.send({
        success: true,
        data:JSON.stringify(result.responses)
      });
    })
    .catch((err) => {
      console.log({ err });
      res.send({
        err,
      });
    });
});


app.get('/noti/push', async (req, res) => {
  try {
    const queryString = req.query?.query;
    if (typeof queryString === 'string') {
      const data = JSON.parse(queryString);
      const listToken = data.listToken;
      const messageObj = data.message;
      const messageArr = listToken.map((token) => ({
        ...messageObj,
        token,
      }));
      await admin.messaging().sendEach(messageArr)
    } else {
      res.status(400).send({
        error: true,
      });
    }

    res.send({
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      error: true,
    });
  }
});

app.listen(process.env.PORT || 3005, () => {
  // app.listen(3002, () => {
  console.log('listening on port', process.env.PORT || 3005);
});
