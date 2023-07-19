"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var crypto_1 = __importDefault(require("crypto"));
var cors_1 = __importDefault(require("cors"));
var PORT = 4000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var post = [
    {
        id: 1,
        title: "Hello World",
        content: "This is my first post"
    },
    {
        id: 2,
        title: "Hello World 2",
        content: "This is my second post"
    },
];
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/posts', function (req, res) {
    res.json(post);
});
app.post('/posts', function (req, res) {
    var id = crypto_1.default.randomUUID();
    res.json({ id: id, title: req.body.title, content: req.body.content });
});
app.listen(PORT, function () { return console.log("Server is running at http://localhost:".concat(PORT)); });
