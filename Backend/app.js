import express from 'express';
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import shortUrlModel from './src/models/shortUrl.model.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/create', (req, res) => {
    const { url } = req.body;
    const shortUrl = nanoid(6);
    const newUrl = new shortUrlModel({
        original_Url: url,
        short_Url: shortUrl,
    });
    newUrl.save()
        .then(() => {
            res.status(201).json({
                message: 'URL created successfully',
                shortUrl: shortUrl,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error creating URL',
                error: error.message,
            });
        });
    res.send(nanaoid(6));
}
);

app.get('/:id', (req, res) => {
    const { id } = req.params;
    shortUrlModel.findOne({ short_Url: id })
        .then((url) => {
            if (!url) {
                return res.status(404).json({
                    message: 'URL not found',
                });
            }
            res.send(url.original_Url);
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error fetching URL',
                error: error.message,
            });
        });
}
);

app.listen(3000, () => {
    connectDB();
    console.log('Connected to MongoDB');
    console.log('Server is running on port 3000');
});

