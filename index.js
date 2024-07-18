const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// middle ware
app.use(cors());
app.use(express.json());

// db connection
// demoUser
// msoi8SXO69FGHaYY

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://demoUser:msoi8SXO69FGHaYY@cluster0.ggulbwq.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("jtDb").collection("users");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.deleteOne(user);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => {
  console.log("Server is Running on port : ", port);
});
