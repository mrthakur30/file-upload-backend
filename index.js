require('dotenv').config()
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const port = process.env.PORT ;

cloudinary.config({
    cloud_name:  process.env.cloud_name,
    api_key: process.env.api_key, 
    api_secret : process.env.api_secret,
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
    //use to move files to cloud
})); 

//ejs templating
app.set('view engine','ejs')



app.post('/mypost',async (req, res) =>{ 
    console.log(req.body);
    console.log(req.files);

    //let fileArray = [];

    //case mutliple files

    // if(req.files){
    //     for(let index = 0 ; index < req.files.sample.length ; index++){
    //         let result = await cloudinary.uploader.upload(req.files.sample[index].tempFilePath,{
    //             folder: 'users' 
    //         })
    //     fileArray.push({
    //         public_id: result.public_id,
    //         secure_url : result.secure_url
    //     })
    //     }
    // }

  //  use case for single file/images
    let file = req.files.sample;
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'users'
    })

    const details =  {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        public_id: result.public_id,
        secure_url : result.secure_url
    }
    console.log(details);

    res.send(details);
})



app.get('/mypostform', (req, res) =>{ 
    res.render('postForm')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))