const http = require("http");
const fs = require("fs");
const path = require("path");

const AppEmitter = require("./events/AppEmitter");
const TextTransform = require("./streams/TextTransform");
const EchoDuplex = require("./streams/EchoDuplex");

const emitter = new AppEmitter();

let eventCount = 0;

emitter.on("visit", (user) => {
  eventCount++;
  fs.appendFileSync("./data/log.txt", `${user} triggered event\n`);
});

const server = http.createServer((req, res) => {
  // URL API mới (không còn cảnh báo)
  const myURL = new URL(req.url, `http://${req.headers.host}`);

  const pathname = myURL.pathname;
  const query = Object.fromEntries(myURL.searchParams);

  // CSS
  if (pathname === "/css/style.css") {
    const css = fs.readFileSync("./public/css/style.css");

    res.writeHead(200, { "Content-Type": "text/css" });

    res.end(css);
  }

  // HOME
  else if (pathname === "/") {
    const html = fs.readFileSync("./views/index.html");

    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(html);
  }

  // EVENTS
  else if (pathname === "/events") {
    emitter.emit("visit", "Student");

    const html = fs.readFileSync("./views/events.html");

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(html);

    res.write(`<p class="box">Total events triggered: ${eventCount}</p>`);

    res.end();
  }

  // REQUEST INFO
  else if (pathname === "/request") {
    const html = fs.readFileSync("./views/request.html");

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(html);

    res.write(`<div class="box">`);

    res.write(`<h3>Request Information</h3>`);

    res.write(`<p><b>URL:</b> ${req.url}</p>`);
    res.write(`<p><b>Method:</b> ${req.method}</p>`);

    res.write(`<h4>Query Parameters</h4>`);
    res.write(`<pre>${JSON.stringify(query, null, 2)}</pre>`);

    res.write(`<h4>Headers</h4>`);

    for (let key in req.headers) {
      res.write(`<p><b>${key}</b>: ${req.headers[key]}</p>`);
    }

    res.write(`</div>`);

    res.end();
  }

  // STREAM PAGE
  else if (pathname === "/streams") {
    const html = fs.readFileSync("./views/streams.html");

    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(html);
  }

  // READABLE STREAM
  else if (pathname === "/read-stream") {
    const read = fs.createReadStream("./data/story.txt", "utf8");

    res.writeHead(200, { "Content-Type": "text/plain" });

    read.pipe(res);
  }

  // WRITABLE STREAM
  else if (pathname === "/write-stream") {
    let text = query.text || "empty";

    const write = fs.createWriteStream("./data/log.txt", { flags: "a" });

    write.write(text + "\n");

    write.end();

    res.end("Data written to log file");
  }

  // TRANSFORM STREAM
  else if (pathname === "/transform") {
    const read = fs.createReadStream("./data/story.txt");

    const transform = new TextTransform();

    res.writeHead(200, { "Content-Type": "text/plain" });

    read.pipe(transform).pipe(res);
  }

  // DUPLEX STREAM
  else if (pathname === "/duplex") {
    const duplex = new EchoDuplex();

    req.pipe(duplex).pipe(res);
  }

  // JSON API
  else if (pathname === "/json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        project: "NodeJS Learning Hub",
        version: "1.0",
        student: "Your Name",
      }),
    );
  }

  // IMAGE STREAM
  else if (pathname === "/image") {
    const img = fs.createReadStream("./public/images/test.jpg");

    res.writeHead(200, { "Content-Type": "image/jpeg" });

    img.pipe(res);
  }

  // DOWNLOAD LOG
  else if (pathname === "/download-log") {
    const log = fs.createReadStream("./data/log.txt");

    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Content-Disposition": "attachment; filename=log.txt",
    });

    log.pipe(res);
  }

  // 404
  else {
    res.writeHead(404);

    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
