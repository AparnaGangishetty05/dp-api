import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// DP API POST route
app.post('/min-energy', (req, res) => {
  const cost = req.body.cost;
  if (!cost || !Array.isArray(cost)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // ---- Your DP Logic ----
  // Minimum energy required
  // Example: cost array = [10, 15, 20]
  let n = cost.length;
  if (n === 0) return res.json({ minimumEnergyRequired: 0 });
  if (n === 1) return res.json({ minimumEnergyRequired: cost[0] });

  const dp = Array(n).fill(0);
  dp[0] = cost[0];
  dp[1] = cost[1];

  for (let i = 2; i < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }

  const minimumEnergyRequired = Math.min(dp[n - 1], dp[n - 2]);
  // -----------------------

  res.json({ minimumEnergyRequired });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DP API running on port ${PORT}`));
