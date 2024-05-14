/* eslint-disable no-undef */
import path from 'path';

import express from 'express';

const app = express();
const port = 4173;


app.use(express.static(path.join(process.cwd(), 'dist')));

// Catch-all handler to return the index.html file for any requests not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
