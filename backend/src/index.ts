import { createServer, IncomingMessage, ServerResponse } from "http";
import { config } from "dotenv";
console.log("connecting to backend...");
config();

const PORT = process.env.PORT;

const server = createServer( (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  // Allows any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.writeHead(200, {'Content-Type': 'application/json'});
    const confirm_message = {message: "Blog Backend API"};
    res.end(JSON.stringify(confirm_message));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});