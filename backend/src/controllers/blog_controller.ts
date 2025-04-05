import { db } from "../config/db.js";

export const add_post = async(user_id: number, content: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, user_id, content, (err:any) => {
            if(err) reject(err);
            else resolve();
        });
    })
}

export const get_posts = async(): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from posts`, (err, rows) => {
           if(err) reject(err);
           else resolve(rows); 
        });
    })
}

export const get_user_post = async(user_id: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT users.first_name, users.last_name, posts.content, posts.created_at
                FROM posts 
                INNER JOIN users 
                ON posts.user_id = users.id
                WHERE users.id = ?;`, 
                [user_id] ,(err, rows) => {
                    if(err) reject(err);
                    else resolve(rows);
                });
    });
}

export const get_single_post = async(post_id: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT users.first_name, users.last_name, posts.content, posts.created_at
                FROM posts 
                INNER JOIN users 
                ON posts.user_id = users.id
                WHERE posts.id = ?;`, 
                [post_id] ,(err, rows) => {
                    if(err) reject(err);
                    else resolve(rows);
                });
    });
}

export const delete_single_post = async(post_id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM posts WHERE id = ?`, [post_id], (err:any) => {
            if(err)reject(err);
            else resolve();
        });

    })
}