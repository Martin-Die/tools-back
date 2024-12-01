import express from "express";
const app = express();
const API_KEY = process.env.VITE_API_KEY;

app.get("/api/gpt", (req, res) => {
    const body = req.body;
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: body.prompt }]
        })
    })
        .then((data) => data.json())
        .then((data) => {
            // console.log(data);
            const results = JSON.parse(data.choices[0].message.content);
            const syntheses = results.categories.map(category => ({
                category: category.nom,
                synthesis: category.synthese
            }));
            res.send(syntheses);
        })
        .catch(console.log);
});

app.listen(8080, () => console.log("Server ready on port 8080."));

export default app;