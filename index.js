const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const serviceAccount = require("./firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/ping", async(req, res) => {
  res.send({
    isWork:true
  })
})

app.post("/noti/push", async(req, res) => {
   
  const listToken = req.body.listToken;
  const messageObj = req.body.message;
  const messageArr=listToken.map(token=>({
    ...messageObj,
    token
  }))
  // const message = {
  //   notification: {
  //     title: messageObj.title,
  //     body: messageObj.body||{},
  //   },
  //   token: listToken,
  //   data: {
  //     id:messageObj.data.id,
  //     name: messageObj.data.name,
  //   },
  // };
 await admin
    .messaging()
    .sendEach(messageArr)
    .then((result) => {
      console.log("====================================");
      console.log({ result });
      console.log("====================================");
      res.sendStatus(200).send({
        success:true, 
      });
    })
    .catch((err) => {
      console.log({err});
      res.sendStatus(400).send({
        err
      });
    });
});

app.listen( process.env.PORT ||3002 , () => {
  // app.listen(3002, () => {
    console.log("listening on port", process.env.PORT || 3002);
  });
