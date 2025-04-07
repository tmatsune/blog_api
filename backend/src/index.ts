import { config } from "dotenv";
import express from 'express';
import cors from 'cors';                //npm i --save-dev @types/cors
import { db } from "./config/db.js";
import { get_users, add_user, get_user } from "./controllers/user_controller.js";
import { get_posts, add_post, get_user_post, get_single_post, delete_single_post } from "./controllers/blog_controller.js";

config();
const PORT = process.env.PORT;
console.log(db);

// CREATE INSTANCE OF APP 
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500'  // 👈 your frontend origin
}));

// DEFINE SIMPLE ROUTE
app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send({"message": "Connected to BLOG API"});
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

// POSTS ROUTE
app.get('/posts', async(req, res) => {
    try {
        const posts = await get_posts();
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(posts));
    } catch(err) {
        res.status(500).send(`ERROR getting posts: ${err}`);
    }
});

app.post('/post', async(req, res) => {
    try{
        const { user_id, content } = req.body;
        await add_post(user_id, content);
        res.status(200);
        res.send({"message": "Success"});
    } catch(err) {
        res.status(500).send(`ERROR posting post: ${err}`);
    }
});

app.get('/posts/:id', async(req, res) => {
    const user_id = Number(req.params.id);
    try{
        const users_posts = await get_user_post(user_id);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users_posts));
    } catch(err){
        res.status(500).send(`ERROR getting posts for user: ${err}`)
    }
});

app.delete('/post/:post_id', async(req, res) => {
    const post_id = Number(req.params.post_id);
    try{
        await delete_single_post(post_id);
        res.status(200);
        res.send({"message": "Success"})
    }catch(err){
        res.status(500).send(`ERROR getting posts for user: ${err}`)
    }
})

// START SERVER 
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}/`);
});