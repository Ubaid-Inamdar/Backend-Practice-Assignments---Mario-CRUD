
const express = require('express')
const app = express()
const port = 8080
const {newsArticleModel}=require('./connector');


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/newFeeds',(req,res)=>{
    let limit=isNaN(req.query.limit) || !req.query.limit ?10:parseInt(req.query.limit);
    let offset=isNaN(req.query.offset) || !req.query.offset ?0:parseInt(req.query.offset);

    newsArticleModel.find().limit(limit).skip(offset).then((ele)=>{
        res.send(ele);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
