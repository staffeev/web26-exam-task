import express from "express";
import cors from "cors";
import zlib from "zlib";

const app = express();
app.use(cors());

app.get("/login", (_, res) => {
  res.type("text/plain");
  res.end("staffeev409626");
});

function collect(req) {
  return new Promise((resolve) => {
    const buf = [];
    req.on("data", (c) => buf.push(c));
    req.on("end", () => resolve(Buffer.concat(buf)));
  });
}

app.post("/zipper", async (req, res) => {
  try {
    const input = await collect(req);
    const output = zlib.gzipSync(input);
    res.writeHead(200, {"Content-Type": "application/gzip"});
    res.end(output);
  } catch {
    res.status(500).end("err");
  }
});

const port = process.env.PORT;
app.listen(port);