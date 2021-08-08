require("dotenv").config();
const express = require("express");

//mongoose connection
const connectDb = require("./connection");

//mongoose model
const userModel = require("./user")

const app = express();

//configuration
app.use(express.json());

//route:          /
//description:    To get all the users
//paramater:      none
app.get("/", async (req,res) => {
  try{
    const user = await userModel.find();
  return res.json({user}); 
  }
  catch(error)
  {
    return res.status(500).json({error : error.message});
  }
  
})
//output : empty array and no collection created




//route:          /user/new
//description:    To add new users
//paramater:      none
//request body:   user object
app.post("/user/new", async (req,res) => {
  try{
  const {newUser} = req.body;

  await userModel.create(newUser);

  return res.json({message :"User is created"});
  }
  catch(error){
    return res.status(500).json({error : error.message});
}
})

//route:          /user/type/:type
//description:    To get all users of some type
//paramater:      type
app.get("/user/type/:type", async (req,res) => {
  try{
    const {type} = req.params;
  
    const user = await userModel.find({userType : type});
    
    if(!user)
    {
      return res.json({message : "No user found"});
    }
  
    return res.json({user}); 
  }catch(error){
      return res.status(500).json({error : error.message});
  }
  
});


//route:          /user/:_id
//description:    To get user by id
//paramater:      id
app.get("/user/:_id", async (req,res) => {
  try{
    const {_id} = req.params;
  
    const user = await userModel.findById({_id});
    
    if(!user)
    {
      return res.json({message : "No user found"});
    }
  
    return res.json({user}); 
  }catch(error){
      return res.status(500).json({error : error.message});
  }
  
});


//route:          /user/update/:_id
//description:    To update user details based on id
//paramater:      _id
//request body:   user object
app.put("/user/update/:_id" , async (req,res) => {
  try{
    const { _id } = req.params;

    const { userData } = req.body;
  
    const updateUser = await userModel.findByIdAndUpdate(_id, {$set : userData} , {new:true});
  
    return res.json({userrr: updateUser});
  }catch(error){
      return res.status(500).json({error : error.message});
  }
  
});

//route:          /user/delete/:_id
//description:    To delete user details based on id
//paramater:      _id
//request body:   none
app.delete("/user/delete/:_id" , async (req,res) =>
{
  try{
    const {_id }=  req.params;
    await userModel.findByIdAndDelete(_id);
    return res.json({message : "User deleted"});
  }catch(error){
      return res.status(500).json({error : error.message});
  }
  
});


//route:          /user/delete/type/:usertype
//description:    To delete user details based on the userType
//paramater:      userType
//request body:   none
app.delete("/user/delete/type/:userType" , async (req,res) =>
{
  try{
    const { userType }=  req.params;
    await userModel.findOneAndDelete({userType});
    return res.json({message : "User deleted"});
  }catch(error){
      return res.status(500).json({error : error.message});
  }
  
});


// app.get("/" , (req,res) => { 
//   return res.json({message : "Success"});
// });

// app.post("/user/:id" , (req,res) => {
//   return res.json(req.params);
// });

// app.listen(process.env.PORT , () => 
//     connectDb().then(() => console.log("Server is running" ))
//     .catch((error) => console.log(error))
// );