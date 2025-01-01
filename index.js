const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.Port || 5000;

app.use(cors())
app.use(express.json())


//simple-crud

// MongoDB Connection Start


const uri = "mongodb+srv://simple-crud:simple-crud@cluster0.b9e8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    const database = client.db("usersDatabase");
    const usersCollection = database.collection("usersCollection");
    
    // Create a document to insert
    app.get("/addusers", async(req, res)=>{
        
          const result = await usersCollection.insertOne(req.body);

          res.send(result)
    })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MongoDB Connection End




app.get("/", (req, res) =>{
    res.send("Crud Server Running")
})








app.listen(port, ()=>{
    console.log(`Simple crud is running on ${port}`);
})