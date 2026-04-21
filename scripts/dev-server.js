const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 5173);
const ROOT = process.cwd();
const DEFAULT_FILE = "Portfolio.html";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  if (!clean) return path.join(ROOT, DEFAULT_FILE);
  return path.join(ROOT, clean);
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const target = resolvePath(req.url || "/");

  fs.stat(target, (statErr, stats) => {
    if (!statErr && stats.isDirectory()) {
      const indexPath = path.join(target, "index.html");
      fs.readFile(indexPath, (indexErr, indexData) => {
        if (indexErr) return send(res, 404, "Not Found");
        send(res, 200, indexData, MIME_TYPES[".html"]);
      });
      return;
    }

    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        if (target !== path.join(ROOT, DEFAULT_FILE)) {
          fs.readFile(path.join(ROOT, DEFAULT_FILE), (fallbackErr, fallbackData) => {
            if (fallbackErr) return send(res, 404, "Not Found");
            send(res, 200, fallbackData, MIME_TYPES[".html"]);
          });
          return;
        }
        return send(res, 404, "Not Found");
      }

      const ext = path.extname(target).toLowerCase();
      send(res, 200, data, MIME_TYPES[ext] || "application/octet-stream");
    });
  });
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
