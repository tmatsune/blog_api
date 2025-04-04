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
// START SERVER 
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}/`);
});
//# sourceMappingURL=index.js.map