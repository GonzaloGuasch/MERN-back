module.exports = function(app, db) {
    app.post('/peli', (req, res) => {
        peli = {'nombre': req.body.name}
        db.collection('pelis').insert(peli);
        res.send({'status': '200'})
    });
    app.get('/peli/:name', async(req, res) => {
        movie = await db.collection('pelis').find({'nombre': req.params.name}).toArray();
        res.send(movie)
    })
     app.get('/peli/', async (req, res) => {
        movies = await db.collection('pelis').find().toArray();
        movies.map(aMovie => aMovie.name);
        res.send(movies)
    })
    app.delete('/peli/:name', async (req, res) => {
        await db.collection('pelis').remove({'nombre': req.params.name});
        res.send('Removed')
    })
};
