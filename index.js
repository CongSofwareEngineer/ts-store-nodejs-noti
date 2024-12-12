const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const serviceAccount = require('./firebase-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get('/ping', async (req, res) => {
  res.send({
    isWork: true,
  });
});

app.get('/push/test', async (req, res) => {
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
    listToken: ['c_pSI8AgsrbgRWSlojMfPT:APA91bGfg9UOfNeKWYxfGZPivR3aK0EGeFR-tqtxOXjbwAP1ohK9w4H2xkZP9vdeoXLjfLGVm03oXe6Tw95yvfNm7kFGVYp-zP_BzDbnBsZujSAFrQX4q2o'],
  };

  const messageArr = bodyTest.listToken.map((token) => ({
    ...bodyTest.message,
    token,
  }));
  console.log({ messageArr });

  const message = {
    notification: {
      title: 'Hello World',
      body: ' req.body',
    },
    token: 'c_pSI8AgsrbgRWSlojMfPT:APA91bGfg9UOfNeKWYxfGZPivR3aK0EGeFR-tqtxOXjbwAP1ohK9w4H2xkZP9vdeoXLjfLGVm03oXe6Tw95yvfNm7kFGVYp-zP_BzDbnBsZujSAFrQX4q2o',
    data: {
      id: '1',
      name: 'test',
    },
  };

  await admin
    .messaging()
    .sendEach(messageArr)
    .then((result) => {
      console.log('====================================');
      console.log({ result });
      console.log('====================================');
      res.send({
        success: true,
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
    const listToken = data.listToken  ;
    const messageObj = data.message ;
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
