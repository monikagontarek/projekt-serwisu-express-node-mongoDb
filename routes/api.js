const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {

    const search = req.query.search || "";
    const defaultSort = -1;
    let sort = req.query.search || defaultSort;

    if (sort !== -1 || sort !== 1) {
        sort = defaultSort;
    };


    const findNews = News.find({ title: new RegExp(search.trim(), 'i') }).sort({ created: sort }).select('_id title description');

    findNews.exec((err, data) => {
        res.json(data);
    })

});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const findNews = News.findById(id).select('_id title description');

    findNews.exec((err, data) => {
        res.json(data);
    })

});

module.exports = router;
