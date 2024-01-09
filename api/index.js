const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking')
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const { request } = require('http');

require('dotenv').config();
const app = express();
const JwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const PORT = process.env.PORT || 4000;
const bcryptSalt = 10; // Define the number of salt rounds

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Booking App');
});

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, JwtSecret, {}, async (error, userData) => {
      if (error) throw error
      resolve(userData) 
    })
  })
}

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, JwtSecret, {}, (error, token) => {
        if (error) throw err;
        response.cookie('token', token).json(userDoc);
      });
    } else {
      response.status(422).json('pass not ok');
    }
  } else {
    response.json('not found');
  }
})

app.get('/profile', async (request, response) => {
  const { token } = request.cookies;
  if (token) {
    jwt.verify(token, JwtSecret, {}, async (error, userData) => {
      if (error) throw error;

      const user = await User.findById(userData.id);
      if (user) {
        const { name, email, _id } = user;
        response.json({ name, email, _id });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    });
  } else {
    response.status(401).json({ message: 'Unauthorized' });
  }
});


app.post('/upload-by-link', async (request, response) => {
  const { link } = request.body
  const newName = 'photo' + Date.now() + '.jpg'

  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  })
  response.json(newName);
})

const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), async (request, response) => {
  const uploadedFiles = []
  for (let i = 0; i < request.files.length; i++) {
    const { path, originalname } = request.files[i];
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads\\', ''))
  }
  response.json(uploadedFiles)
})

app.post('/places', (request, response) => {
  const { token } = request.cookies;
  const {
    title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = request.body;
  jwt.verify(token, JwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, photos: addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    })
    response.json(placeDoc)
  });
})

app.get('/user-places', (request, response) => {
  const { token } = request.cookies;
  jwt.verify(token, JwtSecret, {}, async (error, userData) => {
    if (error) throw error
    const { id } = userData;
    response.json(await Place.find({ owner: id }))
  })
})

app.get('/places/:id', async (request, response) => {
  const { id } = request.params;
  response.json(await Place.findById(id))
})

app.put('/places', async (request, response) => {
  const { token } = request.cookies;
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = request.body;
  jwt.verify(token, JwtSecret, {}, async (error, userData) => {
    if (error) throw error
    const placeDoc = await Place.findById(id)
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos: addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price,
      })
      placeDoc.save()
      response.json('ok')
    }
  })
})

app.get('/places', async (request, response) => {
  response.json(await Place.find())
})

app.post('/bookings', async (request, response) => {
  const userData = await getUserDataFromReq(request)
  const {
    place, checkIn, checkOut, numberOfGuests, name, mobile, price,
  } = request.body;
  await Booking.create({
    place, checkIn, checkOut, numberOfGuests, name, mobile, price,
    user:userData.id,
  }).then((doc) => {
    response.json(doc)
  }).catch((error) => {
    throw error
  })
})

app.get('/bookings', async(request, response) => {
  const userData = await getUserDataFromReq(request)
  response.json(await Booking.find({user:userData.id}).populate('place'))

})

app.post('/logout', (request, response) => {
  response.clearCookie('token').json({ message: 'Logged out successfully' });
});

/*app.get('/test', (request, response) => {
  response.json('test ok');
});
*/


app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
