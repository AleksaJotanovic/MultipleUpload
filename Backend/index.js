const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: '../Frontend/src/assets',
  filename: (req, file, cb) => {
    let unique = Date.now() + Math.round(Math.random() * 1e3);
    cb(null, `${unique}.${file.mimetype.split('/')[1]}`)
  }
});
const upload = multer({ storage: storage });


app.post('/multi-upload', upload.array("files"), (req, res) => {
  let modFiles = [];
  for (let file of req.files) {
    let modFile = { name: `assets/${file.filename}` }
    modFiles.push(modFile)
  }
  res.send(modFiles);
});

app.listen(3000, () => console.log('Running on http://localhost:3000/'));
