import express from "express";
import cors from "cors";
import zlib from "zlib";

const app = express();
app.use(cors());

app.get("/login", (req, res) => {
  res.type("text/plain").send("staffeev409626");
});

app.post("/zipper", express.raw({ type: "*/*", limit: "10mb" }), (req, res) => {
  try {
    const compressed = zlib.gzipSync(req.body);
    res.type("application/gzip").set("Content-Disposition", "attachment; filename=result.gz").send(compressed);
  } catch (e) {
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);