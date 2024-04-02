const{ MongoClient, ServerApiVersion }= require ('mongodb');
const URI = "mongodb+srv://analytics:Cekopi4a@cluster0.slg4lq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  client.connect();
  // Send a ping to confirm a successful connection
   client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("Restaurant");

module.exports =  db;
