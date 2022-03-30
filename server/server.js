const express= require("express");
const dotenv=require("dotenv");
const PORT = process.env.PORT || 5000 ;
const connectDB=require ("./config/db.js");
const data = require("./data/people.json");
const favicon =require("serve-favicon");
const path=require("path");
const cors= require("cors");
const bodyparser =require("body-parser");
const Contact = require("./models/contactModel");


dotenv.config();
const app=express();
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(cors());

app.use(favicon(path.join(__dirname,"public","favicon.ico")))
app.use(bodyparser.urlencoded({extended:true})); 
app.use(bodyparser.json());   
connectDB();


//contact
app.route("/contact").post((req,res)=>{
    let newContact= new Contact(req.body);

    newContact.save((err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact);
    })
});


//get all contacts
app.route("/contact").get((req,res)=>{
   

    Contact.find({},(err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact);
    })
});

//
//get  contact by ID
app.route("/contact/:contactId").get((req,res)=>{
   

    Contact.findById(req.params.contactId,(err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact);
    })
});

//edit  contact by ID
app.route("/contact/:contactId").put((req,res)=>{
   

    Contact.findOneAndUpdate(
        {_id:req.params.contactId},req.body, {new:true,  useFindAndModify:false},
        (err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact);
    })
});

//Delete  contact by ID
app.route("/contact/:contactId").delete((req,res)=>{
   
    

    Contact.deleteOne( {_id:req.params.contactId},(err)=>{
        if(err){
            res.send(err)
            
        }
       
    })
})

app.get("/",(req,res)=>{
    res.send("server running on the PAGE")
})

app.get("/user",
(req,res,next)=>{
  // throw new Error();
console.log(req.params.id)
    let user=Number(req.params.id);
   
    console.log(data[user]);
    res.send(data[user]);
  next();
   
}
,(req,res)=>{
    console.log("the 2nd function")
})
app.post((req,res)=>{
    console.log(req.body)
    res.send(req.body);
})
app.put((req,res)=>{
    res.send(`put method succes on ${PORT}`)
})
app.delete((req,res)=>{
    res.send(`Delete method succes on ${PORT}`)
})

//Error Handling
app.use((err,req,res,nexe)=>{
    console.error(err.stack);
    res.status(500).send(`Red Alert ${err.stack}`);
});
app.listen(PORT,console.log(`server running now in ${PORT}`));