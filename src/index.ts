import express from 'express';
import { main } from './rabbit.js';

const app = express();
app.use(express.json());

app.get('/:provider/:id', async (req, res) => {
  try {
    const { provider, id } = req.params;
    if (!provider.includes(".")){
      res.status(500).json({ 'error': 'Invalid API request' });
      return
    }
    const result = await main(provider, id);
    //console.log("result from index: ", result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Lucky rabbit is running on port ${port}`);
});
