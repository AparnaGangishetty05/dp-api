import express from 'express';

const app = express();
app.use(express.json());

app.post('/min-energy', (req, res) => {
    const cost = req.body.cost;
    let n = cost.length;

    if (n === 0) return res.json({ minimumEnergyRequired: 0 });
    if (n === 1) return res.json({ minimumEnergyRequired: cost[0] });

    let dp = new Array(n);
    dp[0] = cost[0];
    dp[1] = cost[1];

    for (let i = 2; i < n; i++) {
        dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
    }

    res.json({ minimumEnergyRequired: Math.min(dp[n - 1], dp[n - 2]) });
});

app.get('/', (req, res) => {
    res.send('DP API Running');
});

app.listen(3000, () => {
    console.log('Server started');
});
