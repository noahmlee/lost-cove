---
title: Node.js
draft: 
tags:
  - notes
  - webdev
  - tools/services
  - node
---
## Node.js

Node.js is a runtime environment that lets you run JavaScript outside the browser — built on Chrome’s V8 engine. It's what you use when you want to build servers, CLIs, scripts, or pretty much anything backend in JavaScript.

---

### Core Concepts

- **Runtime, not a language**  
    Node lets JavaScript interact with the file system, network, and OS. Think of it as the bridge between JS and your machine.
- **Non-blocking I/O**  
    Node handles async operations using an event loop and callbacks (or Promises). Instead of waiting for a file to load or a DB to respond, Node keeps doing other stuff. Efficient for I/O-heavy tasks.
- **Single-threaded, but fast**  
    One thread, but async operations give it superpowers. CPU-heavy tasks? Not its favorite. I/O? All day.

---

### npm & modules

- **npm**: Node’s package manager.  
    `npm install some-package` adds dependencies to your project.
- **CommonJS (`require`) vs ES Modules (`import`)**  
    Node started with `require`, but now supports `import` too — just add `"type": "module"` to `package.json`.
```
// CommonJS
const fs = require('fs');
```
```
// ES Module
import fs from 'fs';
```
---

### File System, HTTP, and Friends

- `fs`: Read/write files
- `http`: Build a basic server
- `path`: File path utilities
- `os`: System info
- `events`: EventEmitter-based pub/sub

---

### Example: Tiny Server
```
const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello from Node!\n');
});
	
server.listen(3000, () => { 
	console.log('Server running at http://localhost:3000/');
});
```
---

### When to use Node

- Real-time apps (chat, multiplayer)
    
- APIs and microservices
    
- Build tools (webpack, vite)
    
- Scripting + automation
    

---

### Notes to Self

- Don’t block the event loop. Avoid CPU-heavy work unless you're using workers.
    
- `fs.promises` > callback-based `fs` for cleaner async.
    
- Use `nodemon` for auto-restart while devving.