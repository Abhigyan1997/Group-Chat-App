const path = require('path');
const fs=require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');

const app = express();


const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');


const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
    );

var cors = require('cors');
app.use(cors({
    origin:'*',
}));

const userRoutes = require('./routes/user');

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/user',userRoutes);


sequelize 
 .sync({alter:true})
 .then(result => {
    app.listen(5000);
 })
 .catch(err => {
    console.log(err);
 }) 