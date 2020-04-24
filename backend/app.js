const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const Clarifai = require('clarifai');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'xzifi',
      password : 'qwaszx123',
      database : 'facerecdb'
    }
});

const clarifai = new Clarifai.App({apiKey: '05137dd3fdf84c358ce2b97f779c8fc6'});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('works');
});
app.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();
    if (email !== '' && password !== '') {
        knex('login').select('*').where('email', '=', email)
        .then(loginInfo => {
            if (bcrypt.compareSync(password, loginInfo[0].hash)) {
                let userInfo;
                knex.select('*').from('users').where('user_id', '=', loginInfo[0].user_id)
                .then(user => {
                    userInfo = user[0]
                    return userInfo;
                })
                .then(() => {
                    return knex.select('url', 'boxes', 'image_id').from('images').where('user_id', '=', loginInfo[0].user_id)
                    .then(imgs => {
                        userInfo=Object.assign(userInfo, {imgArr: imgs})
                    })
                    .catch(err => console.log('Error obtaining images is --- ', err))
                }) //can't do sql joins because if a certain user does not have previous images then the query result will be empty, and I need at least the user
                .then(() => res.json(userInfo))
                .catch(() => res.json('Failed to get user information.'))
            } else {
                res.status(400).json('Wrong password.')
            }
        })
        .catch(() => res.status(400).json("Email doesn't exist."))
    } else {
        res.status(400).json("Login information can't be empty.")
    }
});
app.post('/register', (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    const simpleEmailRegex=/\S+@\S+\.\S+/; //don't want a very complex regex, this is just demo.
    const simplePasswordRegex=/\S{6,}/;
    if (name !== '' && simpleEmailRegex.test(email) && simplePasswordRegex.test(password)) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        knex('users').select('user_id').orderBy('user_id','desc').limit(1).then(userId => { 
            if (userId.length === 0) {
                return 0;
            } else {
                return userId[0].user_id
            }  
        })
        .then(highestId => {
            knex.transaction(trx => {
                return trx('login').insert({
                    email: email,
                    hash: hash,
                    user_id: highestId + 1
                })
                .then(() => {
                    return trx('users').insert({
                        name: name,
                        user_id: highestId + 1
                    })
                    .returning('*')   
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .then(userInfo => res.json(userInfo[0]))
            .catch(() => res.status(400).json('Email already exists.'))
        })
        .catch(() => res.status(400).json('Something went wrong.'))
    }
});
app.post('/image', (req, res) => {
    let {url, userId} = req.body;
    url = url.trim();
    clarifai.models.predict("a403429f2ddf4b49b307e318f00e528b", url)
    .then(faceboxData => {
        let boundingBox=[];
        for (let i=0;i<faceboxData.outputs[0].data.regions.length; i++) {
            boundingBox.push(faceboxData.outputs[0].data.regions[i].region_info.bounding_box);
        }
        knex('images').select('image_id').orderBy('image_id', 'desc').limit(1)
        .then((imageId) => { 
            if (imageId.length === 0) {
                return 0;
            } else {
                return imageId[0].image_id
            }  
        })
        .then(imageId => {
            return knex('images').insert({
                url: url,
                user_id: userId,
                image_id: imageId + 1,
                boxes: JSON.stringify(boundingBox),
            })
        })
        .catch(err => console.log('The error that ocurred is ------------- : ', err))
        .then(() => res.json(boundingBox)) // sending response even if adding to db failed, that's why this then is after the catch.
    })
    .catch(() => {
        res.json('Could not detect any face. Try another picture.')
    })   
})

app.listen(process.env.PORT || 3001, () => console.log('server running'));

/* List of created tables

CREATE TABLE users (name VARCHAR(100) NOT NULL, joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT PRIMARY KEY);
CREATE TABLE login (email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL, user_id INT PRIMARY KEY);
CREATE TABLE images (url VARCHAR(200) NOT NULL, sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT NOT NULL,boxes TEXT, image_id INT PRIMARY KEY);

*/ 