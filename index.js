const express = require("express");
const MovieInfo = require('./model/movieDb');
const app = new express();
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.get('/',(req,res)=>{
    res.send("Congratulation!! Server is UP");
})
app.get('/api',(req,res)=>{
    res.json([{"m_name":"","m_actor":"","m_actress":"","m_dir":"","m_year":0,"m_camera":"","m_pro":"","m_lan":""}]);
})
app.post('/api/create', async (req,res)=>{
    try{
        console.log(req.body);
        let movie = new MovieInfo(req.body);
        let result = await movie.save();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
    // console.log(req.body);
    // res.send("Data added")
});
app.get('/api/view',async(req,res)=>{
    try{
        let result = await MovieInfo.find();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
   
});
// app.post('/api/update',async (req,res)=>{
//     try{
//         let result = MovieInfo.findByIdAndUpdate(req.body._id,req.body);
//         res.json(result);
//     }
//     catch(error){
//         res.status(500).send(error);
//     }
   
// });
app.post('/api/update',async (req,res)=>{
        try{
            let result = MovieInfo.findByIdAndUpdate(req.body._id,req.body);
            res.send("Updated");
        }
        catch(error){
            res.status(500).send(error);
        }
       
    });
app.post('/api/delete',async (req,res)=>{
    try{
       let result = await MovieInfo.findByIdAndDelete(req.body._id);
       res.json({"success":"Deleted"});
    }
    catch(error){
        res.status(500).send(error);
    }
   
});

app.post('/api/search',async (req,res)=>{
    try{
    //    let result = await MovieInfo.find(req.body);
       let result = await MovieInfo.find({ "m_name": { $regex: '.*' + req.body.m_name + '.*' } });
       res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
   
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname ,'/build/index.html')); }); 


app.listen(8000,()=>{
    console.log("Server is running in port 5000");
})