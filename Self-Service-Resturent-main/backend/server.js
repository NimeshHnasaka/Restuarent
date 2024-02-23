// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const app = express();
// const upload = multer();

// // Enable CORS
// app.use(cors());

// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define a schema for storing images
// const imageSchema = new mongoose.Schema({
//     data: Buffer,
//     contentType: String,
//    // objectsDetected: [String],
//     uploadDateTime: { type: Date, default: Date.now } // Add a field for upload date and time
// });
// const Image = mongoose.model('Image', imageSchema);

// // API endpoint for uploading images
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//     try {
//         const newImage = new Image({
//             data: req.file.buffer,
//             contentType: req.file.mimetype
//         });
//         await newImage.save();
//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// });



// // API endpoint for retrieving images
// app.get('/api/images/:id', async (req, res) => {
//     try {
//         // Retrieve the image from MongoDB based on the provided ID
//         const image = await Image.findById(req.params.id);

//         if (!image) {
//             return res.status(404).json({ error: 'Image not found' });
//         }

//         // Set the appropriate content type header
//         res.contentType(image.contentType);

//         // Send the image data
//         res.send(image.data);
//     } catch (error) {
//         console.error('Error retrieving image:', error);
//         res.status(500).json({ error: 'Failed to retrieve image' });
//     }
// });



// // API endpoint for retrieving all images with upload dates
// app.get('/api/images', async (req, res) => {
//     try {
//         // Query the database to fetch all images
//         const images = await Image.find({}, 'uploadDateTime');

//         res.json(images);
//     } catch (error) {
//         console.error('Error retrieving images:', error);
//         res.status(500).json({ error: 'Failed to retrieve images' });
//     }
// });



// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');
const app = express();

// Enable CORS
app.use(cors());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhnfyb9bw',
  api_key: '377977664553313',
  api_secret: 'aDFluxAwYLUgfmgQlU11oIpMmGI'
});

// Define a schema for storing images (you can choose to omit this if you're not storing images locally)
const imageSchema = new mongoose.Schema({
  publicId: String,
  uploadDateTime: { type: Date, default: Date.now }
});
const Image = mongoose.model('Image', imageSchema);

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Change this to your desired folder in Cloudinary
    allowed_formats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Adjust the transformation as needed
  }
});
const upload = multer({ storage: storage });

// API endpoint for uploading images
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Save the image details to MongoDB (optional)
    const newImage = new Image({
      publicId: req.file.public_id
    });
    await newImage.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


