// import { IncomingMessage, ServerResponse } from "http";
// import { getItems, getItemById, addItem } from "../controllers/item";
// import { error } from "console";
// //http://localhost:3000/items
// export const itemsRoute = (req: IncomingMessage, res: ServerResponse) => {
//   if (req.url?.startsWith("/items")) {
//     console.log(req.url, "request url");

//     const parts = req.url.split("/");
//     const id = parts[2] ? parseInt(parts[2]) : undefined;

//     if (req.method === "GET" && !id) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(getItems()));
//       return;
//     }

//     if (req.method === "GET" && id) {
//       if (isNaN(id)) {
//         res.writeHead(400, { "content-type": "application/json" });
//         res.end(JSON.stringify({ error: "invalid item id" }));
//         return;
//       }
//       const item = getItemById(id);
//       if (!item) {
//         res.writeHead(404, { "content-type": "application/json" });
//         res.end(JSON.stringify({ error: "Item not found" }));
//         return;
//       }
//        res.writeHead(200, { "Content-Type": "application/json" });
//        res.end(JSON.stringify(item));
//        return;
//     }

//     if (req.method === "POST") {
//       let body = "";
//       req.on("data", (chunk) => {
//         body += chunk.toString();
//       });

//       req.on("end", () => {
       
//         try{
//           const { name, quantity, purchased } = JSON.parse(body);
//           if (!name || typeof name !== "string") {
//             res.writeHead(400, { "content-type": "application/json" });
//             res.end(JSON.stringify({ error: "Item name is required" }));
//           }

//           if (!quantity || typeof quantity !== "number") {
//             res.writeHead(400, { "content-type": "application/json" });
//             res.end(JSON.stringify({ error: "Item quantity is required" }));
//           }

//           if (!purchased || typeof purchased !== "boolean") {
//             res.writeHead(400, { "content-type": "application/json" });
//             res.end(JSON.stringify({ error: "purchased status is required" }));
//           }

//           const newItem = addItem(name, quantity, purchased);
//           res.writeHead(201, { "Content-Type": "application/json" });
//           res.end(JSON.stringify(newItem));
//         }catch (error) {
//            res.writeHead(400, { "content-type": "application/json" });
//            res.end(JSON.stringify({ error: "Invalid JSON payload" }));

//         }
//       });
//       return;
//     }
   
//     res.writeHead(405, { "content-type": "application/json" });
//     res.end(JSON.stringify({ error: "method not allowed on /items" }));

//   }
// };




import { IncomingMessage, ServerResponse } from "http";
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/item";

export const itemsRoute = (req: IncomingMessage, res: ServerResponse) => {
  const parts = req.url?.split("/") || [];
  const id = parts[2] ? parseInt(parts[2]) : undefined;

  // ✅ GET /items → all items
  if (req.method === "GET" && !id) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getItems()));
    return;
  }

  // ✅ GET /items/:id → single item
  if (req.method === "GET" && id) {
    if (isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item ID" }));
      return;
    }
    const item = getItemById(id);
    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Item not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
    return;
  }

  // ✅ POST /items → add new item
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const { name, quantity, purchased } = JSON.parse(body);

        if (typeof name !== "string" || !name.trim()) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Item name is required" }));
          return;
        }

        if (typeof quantity !== "number" || quantity <= 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Quantity must be a positive number" })
          );
          return;
        }

        if (typeof purchased !== "boolean") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Purchased must be true or false" }));
          return;
        }

        const newItem = addItem(name, quantity, purchased);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newItem));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
    return;
  }

  // ✅ PUT /items/:id → update item
  if (req.method === "PUT" && id) {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const { name, quantity, purchased } = JSON.parse(body);
        const updatedItem = updateItem(id, name, quantity, purchased);

        if (!updatedItem) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Item not found" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedItem));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
    return;
  }

  // ✅ DELETE /items/:id → delete item
  if (req.method === "DELETE" && id) {
    const success = deleteItem(id);
    if (!success) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Item not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item deleted successfully" }));
    return;
  }

  // ❌ Method not allowed
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Method not allowed" }));
};
