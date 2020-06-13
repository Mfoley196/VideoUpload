// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })
 
//CREATE EXPRESS APP
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
 
//ROUTES WILL GO HERE
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
 
});

//ROUTES WILL GO HERE
app.get('/successPage',function(req,res){
  res.sendFile(__dirname + '/success.html');
 
});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.redirect("/speechvideos/successPage")
  
})
 
app.listen(8070, () => console.log('Server started on port 8070'));