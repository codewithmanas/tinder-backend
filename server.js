import express from "express";
import mongoose from "mongoose";
import process from 'process';
import Cors from 'cors';
import dotenv from 'dotenv';

import Cards from './dbCards.js';



// App Config
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Developers!"));

app.post('/tinder/cards', async (req, res) => {
    try {
      const dbCard = req.body;
      const card = await Cards.create(dbCard);
      res.status(201).send(card);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/tinder/cards', async (req, res) => {
    try {
      const cards = await Cards.find();
      res.status(200).send(cards);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
 