const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/app_medica'));

app.get('/*',function(req,res){
    res.sendFile('index.html', {root: 'dist/app_medica/'})
});

app.listen(process.env.PORT || 8080);