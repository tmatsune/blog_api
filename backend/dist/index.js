var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import express from 'express';
import { db } from "./config/db.js";
import { get_users, add_user, get_user } from "./controllers/user_controller.js";
import { get_posts, add_post, get_user_post, delete_single_post } from "./controllers/blog_controller.js";
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
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield get_users();
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    }
    catch (err) {
        res.status(500).send(`Error fetching users: ${err}`);
    }
}));
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name } = req.body;
    try {
        yield add_user(first_name, last_name);
        res.status(200);
        res.send({ "message": "Success" });
    }
    catch (err) {
        res.status(500).send(`ERROR saving data: ${err}`);
    }
}));
app.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.id);
    try {
        const user = yield get_user(user_id);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    }
    catch (err) {
        res.status(500).send(`ERROR saving data: ${err}`);
    }
}));
// POSTS ROUTE
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield get_posts();
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(posts));
    }
    catch (err) {
        res.status(500).send(`ERROR getting posts: ${err}`);
    }
}));
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, content } = req.body;
        yield add_post(user_id, content);
        res.status(200);
        res.send({ "message": "Success" });
    }
    catch (err) {
        res.status(500).send(`ERROR posting post: ${err}`);
    }
}));
app.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.id);
    try {
        const users_posts = yield get_user_post(user_id);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users_posts));
    }
    catch (err) {
        res.status(500).send(`ERROR getting posts for user: ${err}`);
    }
}));
app.delete('/post/:post_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = Number(req.params.post_id);
    try {
        yield delete_single_post(post_id);
        res.status(200);
        res.send({ "message": "Success" });
    }
    catch (err) {
        res.status(500).send(`ERROR getting posts for user: ${err}`);
    }
}));
// START SERVER 
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}/`);
});
//# sourceMappingURL=index.js.map