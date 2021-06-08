const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
    //pobieranie danych z formularza do wyszukiwania newsów, za pomovą req.query bo będziemy przeszukiwać za pomocą querystringów
    console.log(req.query)
    //pod zmienną search będziemy mieć daną wyszukiwaną wartość
    const search = req.query.search || "";

    // do zmiennej findNews przypisujemy to co jest w naszej bazie i sortujemy to metodą sort, w parametrach tej metody mówimy po czym ma być sortowane, -1 wskazuje, że ma być sortowane malejąco, 1 oznaczałoby rosnąco
    // RegExp służy do tego by wyszukiwać po niepełnych nazwach i bez względy na znaki takie jak spacja
    // funkcja trim() służy do tego, że jeżeli ktoś wpisze w wyszukiwaniu najpierw spacja a poóźniej ciąg znaków to sytuacja ta zostanie zdefiniowana poprawnie, w innym wypadku po spacji nie otrzymujemy informacji zwrotnej 
    const findNews = News.find({ title: new RegExp(search.trim(), 'i') }).sort({ created: -1 });

    // to co poniżej to przekazywanie zmiennych do widoku - view - news.jade
    findNews.exec((err, data) => {
        res.render('news', { title: 'News', data, search });
    })

});



module.exports = router;
