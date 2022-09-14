import express from 'express';

const app = express();

// List games
app.get('/games', (req, res) => {
    return res.json([])
})
// Creat ads
app.post('/ads', (req, res) => {
    return res.status(201).json([])
})
// List discord by ads
app.get('/games/:id/discord', (req, res) => {
    //  const adsID = req.params.id;

    return res.json([]);

});
// List ads by games
app.get('/games/:id/ads', (req, res) => {
    //  const gameId = req.params.id; 

    return res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Luis' },
        { id: 3, name: 'Pedro' },
        { id: 4, name: 'Uanderson' },
        { id: 5, name: 'Aparecida' },
    ]);
});



app.listen(3333);