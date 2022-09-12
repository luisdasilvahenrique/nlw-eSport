import express from 'express';

const app = express();

app.get('/ads', (request, response) => {
    return response.json([
        {id: 1, name: 'John'},
        {id: 2, name: 'Luis'},
        {id: 3, name: 'Pedro'},
        {id: 4, name: 'Uanderson'},
        {id: 5, name: 'Aparecida'},
    ]);
});

app.listen(3333);