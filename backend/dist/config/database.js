var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sqlite3 from "sqlite3";
import { open } from "sqlite";
// npm install sqlite3 sqlite @types/sqlite3
const DB = process.env.DB_PATH;
export function connect_db() {
    return __awaiter(this, void 0, void 0, function* () {
        return open({
            filename: `${DB}`,
            driver: sqlite3.Database
        });
    });
}
//# sourceMappingURL=database.js.map