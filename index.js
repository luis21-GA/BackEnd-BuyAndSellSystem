import express from 'express';
//const express = require('express');
import morgan from 'morgan';
//const morgan = require('morgan');
import cors from 'cors';
//const cors = require('cors');
import path from 'path';
import mongoose from 'mongoose';

//cadena de conexion a la base de datos MongoDB
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbSistema';
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(mongoose => console.log('Conectando a la BD'))
.catch(err => console.log(err));

const app = express();
app.use(morgan('dev'));
app.use(cors());

//analiza JSON de las cargas entrantes (recibe JSON)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configurando la ruta para los archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//asignando un puerto no estatico
app.set('port', process.env.PORT || 4000)

app.listen( app.get('port'), () => {
    console.log('Servidor puerto ' + app.get('port') );
    //console.log(path.join(__dirname, 'public'));
});
