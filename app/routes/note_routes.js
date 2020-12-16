var cors = require('cors')

module.exports = function(app, db) {
    app.post('/peli', cors(), (req, res) => {
        peli = {'title': req.body.title, 'poster_path': req.body.poster_path, 'votes': 0}
        db.collection('pelis').insert(peli);
        res.send({'status': '200'})
    });
    app.get('/peli/:name', async(req, res) => {
        movie = await db.collection('pelis').find({'title': req.params.name}).toArray();
        res.send(movie)
    })
     app.get('/pelis/', async (req, res) => {
        movies = await db.collection('pelis').find().toArray();
        res.send(movies)
    })
    app.delete('/peli/:name', async (req, res) => {
        await db.collection('pelis').remove({'title': req.params.name});
        res.send('Removed')
    })
    app.post('/vote', cors(), async (req, res) => {
        if(req.body.votes < 10){
            const movie_votes = await db.collection('pelis').findOne({'title': req.body.title});
            await db.collection('pelis').updateOne(
                { 'title': req.body.title },
                {$set: {'votes':  movie_votes.votes + req.body.votes}}
           );
            res.send('updated!');
        }else {
            res.send('che no te pases de pillo');
        }
    })
};
