import http, { IncomingMessage, ServerResponse } from "http";
import { itemsRoute } from "./route/item";

const PORT = 3000;

const requestlistener = (req: IncomingMessage, res: ServerResponse) => {

  if (req.url?.startsWith("/items")) {
    itemsRoute(req, res);
  } else {
    res.writeHead(404, { "context-type": "application/json" });
    res.end(JSON.stringify({ message: "not found" }));
  }
};

const server = http.createServer(requestlistener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
