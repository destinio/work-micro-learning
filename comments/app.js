"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var crypto_1 = __importDefault(require("crypto"));
var cors_1 = __importDefault(require("cors"));
var PORT = 4001;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var commentsByPostId = {};
app.use(express_1.default.json());
app.get('/posts/:id/comments', function (req, res) {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', function (req, res) {
    var commentId = crypto_1.default.randomUUID();
    var content = req.body.content;
    var comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content: content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});
app.listen(PORT, function () { return console.log("Server is running at http://localhost:".concat(PORT)); });
