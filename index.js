const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


// -middlewares--
app.use(cors());
app.use(express.json());


// --atlas-server-start-
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zearr5n.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();


    // product-database-start-
    const Productdatabase = client.db("ProductDB").collection("Allproducts");


    app.get('/Products', async (req, res) => {
      const cursor = Productdatabase.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/Apple', async (req, res) => {
      const singledata = { "brand_Name": "Apple" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/Samsung', async (req, res) => {
      const singledata = { "brand_Name": "Samsung" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/Sony', async (req, res) => {
      const singledata = { "brand_Name": "Sony" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/Google', async (req, res) => {
      const singledata = { "brand_Name": "Google" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/Intel', async (req, res) => {
      const singledata = { "brand_Name": "Intel" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/LG', async (req, res) => {
      const singledata = { "brand_Name": "LG" }
      const cursor = Productdatabase.find(singledata);
      const result = await cursor.toArray();

      res.send(result)
    })

    app.get('/Products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await Productdatabase.findOne(query)

      res.send(result)
    })



    // ----post--database--
    app.post('/Products', async (req, res) => {
      const newProduct = req.body;
      const productobj = {
        product_Image: newProduct?.ImageUrl,
        product_Name: newProduct.Name,
        brand_Name: newProduct.Brand,
        product_type: newProduct.Type,
        price: newProduct.Price,
        short_description: newProduct.Descripition,
        rating: newProduct.Rating

      }
      const result = await Productdatabase.insertOne(productobj);
      res.send(result);
    })


    // ---delete-from-database--

    app.delete('/Products/:id', async (req, res) => {
      const Id = req.params.id;
      const query = { _id: new ObjectId(Id) }

      const result = await Productdatabase.deleteOne(query)
      res.send(result);
    })


    // ---update-single-data---

    app.put('/products/:id', async (req, res) => {

      const id = req.params.id;

      const query = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateobj = req.body;

      const updateinfo = {
        $set: {
          product_Image: updateobj?.ImageUrl,
          product_Name: updateobj.Name,
          brand_Name: updateobj.Brand,
          product_type: updateobj.Type,
          price: updateobj.Price,
          short_description: updateobj.Descripition,
          rating: updateobj.Rating

        }


      }

      const result = await Productdatabase.updateOne(query, updateinfo, options)
      res.send(result)

    })


    // --product-data-base-end


    //  --User-buy-database-start

    const BuyProductdatabase = client.db('ProductDB').collection('BuyProducts');


    app.post('/buyproducts', async (req, res) => {

      const buyedproduct = req.body;

      const result = await BuyProductdatabase.insertOne(buyedproduct)

      res.send(result)
    })

    app.get('/buyproducts', async (req, res) => {

      const cursor = BuyProductdatabase.find();
      const result = await cursor.toArray();
      res.send(result)

    })

    app.delete('/buyproducts/:id', async (req, res) => {
      const Id = req.params.id;
      const query = { _id: new ObjectId(Id) }
      const result = await BuyProductdatabase.deleteOne(query);
      res.send(result);
    })
//user-buy-database-end

 // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error)
  }
}
run()




app.get('/', (req, res) => {
  res.send('Electro server is running !')
})

app.listen(port, () => {
  console.log(`Electro sever is running on port ${port}`)
})


