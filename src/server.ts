import http, {IncomingMessage, ServerResponse} from "http";

const PORT = 3000;

//requst handle
const requestListener = (req: IncomingMessage, res: ServerResponse) => {
res.writeHead(200, { "content-type": "application/json" });
res.end(JSON.stringify({ message: "Hello world"}));
};

const server = http.createServer(requestListener)

server.listen(PORT, () => (
    console.log(`Server is running on http://localhost:${PORT}`)
))