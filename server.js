const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/chatapp'));

app.get('/*',function(req,res){
    res.sendFile('index.html', {root: 'dist/chatapp/'})
});

app.listen(process.env.PORT || 8080);