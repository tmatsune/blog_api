import { db } from "../config/db.js";

export const get_users = async(): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

export const add_user = async(first_name: string, last_name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (first_name, last_name) VALUES (?, ?)`, first_name, last_name, (err:any) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    })
}