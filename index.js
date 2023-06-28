
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xy53yfr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  

async function run(){
    try{
        const serviceCollection = client.db('cycle').collection('services');
        const reviewCollection = client.db('cycle').collection('reviews');

        app.post('/services', async(req, res) => {
        
          const service = serviceCollection.insertOne(req.body);
      
          res.send(service);
        })
        app.post('/reviews', async(req, res) => {
        
          const service = reviewCollection.insertOne(req.body);
      
          res.send(service);
        })
        

        

        app.get('/reviews/:id', async(req, res) => {
          const query = {}
          const cursor = serviceCollection.find({userId:req.params.id});
          const services = await cursor.toArray();
          res.send(services);
        })
        app.patch('/reviews/:id', async(req, res) => {
          const query = {}

          const cursor = serviceCollection.findById(req.params.id)
          const rating =     +cursor.rating;
          const cursorres = serviceCollection.findByIdUpdate( req.params.id,
          {$set: { reviews : rating + 1}})
          
         
          res.send(cursorres);
        })


        app.get('/services', async(req, res) => {
          const query = {}
          const cursor = serviceCollection.find(query);
          const services = await cursor.toArray();
          res.send(services);
        })


        app.get('/services/:id', async(req, res) => {
          const query = {}
          const cursor = serviceCollection.find({_id:req.params.id});
          const services = await cursor.toArray();
          res.send(services);
        })
        app.get('/services/:id', async(req, res) => {
          const query = {}
          const cursor = serviceCollection.find({_id:req.params.id});
          const services = await cursor.toArray();
          res.send(services);
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));




app.get('/', (req, res) => {
    res.send('cycle server in runin')
})

app.listen(port, () => {
    console.log(`server raning on ${port}`);
});