import { createServer, IncomingMessage, ServerResponse } from "http";
import { config } from "dotenv";
import express from 'express';
import { db } from "./config/db.js";
import { get_users, add_user, get_user } from "./controllers/user_controller.js";

config();
const PORT = process.env.PORT;
console.log(db);

// CREATE INSTANCE OF APP 
const app = express();
app.use(express.json());

// DEFINE SIMPLE ROUTE
app.get('/', (req, res) => {
    res.send('Blog API Home');
});

// USER ROUTE 
app.get('/users', async (req, res) => {
    try{
        const users = await get_users();
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    } catch(err) {
        res.status(500).send(`Error fetching users: ${err}`);
    }
});

app.post('/user', async(req, res) => {
    const {first_name, last_name} = req.body;
    try{
        await add_user(first_name, last_name);
        res.status(200);
        res.send({"message": "Success"})
    } catch(err){
        res.status(500).send(`ERROR saving data: ${err}`);
    }   
});

app.get('/user/:id', async(req, res) => {
    const user_id: number = Number(req.params.id);
    try {
        const user = await get_user(user_id);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    } catch(err){
        res.status(500).send(`ERROR saving data: ${err}`);
    }
})

// START SERVER 
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}/`);
})