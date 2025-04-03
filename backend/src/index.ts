import { createServer, IncomingMessage, ServerResponse } from "http";
import { config } from "dotenv";
console.log("connecting to backend...");
config();

const PORT = process.env.PORT;

const server = createServer( (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Blog API');
});

server.listen(() => {
    console.log(`Server running at http://localhost:${PORT}/`);
});