const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = process.env.FOOTBALL_DATA_API_KEY;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/competitions/CL/matches', {
            headers: { 'X-Auth-Token': apiKey }
        });
        const matches = response.data.matches;
        let table = '<table border="1"><tr><th>Home Team</th><th>Away Team</th><th>Date</th></tr>';
        matches.forEach(match => {
            table += `<tr><td>${match.homeTeam.name}</td><td>${match.awayTeam.name}</td><td>${match.utcDate}</td></tr>`;
        });
        table += '</table>';
        res.send(table);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
