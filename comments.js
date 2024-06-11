// Create web server
import express from 'express';
const app = express();
import { urlencoded, json } from 'body-parser';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/comments', (req, res) => {
  const comments = JSON.parse(readFileSync('./comments.json', 'utf8'));
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(readFileSync('./comments.json', 'utf8'));
  const newComment = req.body;
  comments.push(newComment);
  writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(newComment);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});