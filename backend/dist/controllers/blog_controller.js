var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../config/db.js";
export const add_post = (user_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, user_id, content, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
});
export const get_posts = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from posts`, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
});
export const get_user_post = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.all(`SELECT users.first_name, users.last_name, posts.content, posts.created_at
                FROM posts 
                INNER JOIN users 
                ON posts.user_id = users.id
                WHERE users.id = ?;`, [user_id], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
});
export const get_single_post = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.all(`SELECT users.first_name, users.last_name, posts.content, posts.created_at
                FROM posts 
                INNER JOIN users 
                ON posts.user_id = users.id
                WHERE posts.id = ?;`, [post_id], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
});
export const delete_single_post = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM posts WHERE id = ?`, [post_id], (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
});
//# sourceMappingURL=blog_controller.js.map