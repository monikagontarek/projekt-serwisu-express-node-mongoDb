const express = require('express');
const News = require('../models/news');
const router = express.Router();

// ten rauter będzie nam się odpalał globalnie w całym request użytym dla admina, na każdy adres dla admina put, post, get najpierw odpali się nasza metoda router.all. Dzięki temu będziemy mogli zweryfikować każdy request idący w stronę /admin. czyli wszytsko co się znajduje w /admin będzie chronione
router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return;
        // sprawdzamy czy admin jest zalogowany, jeśli jego sesja jest false to przekierowywujemy na stronę logowania, jeśli się zalogowaliśmy to możemy sobie swobodnie przechodzić między routami dzięki next()
    }

    next();
})
/* GET home page. */
router.get('/', (req, res) => {
    console.log(req.session.admin)
    // pobieranie wszystkich newsów z naszej bazy danych - metoda find wywołana na News
    News.find({}, (err, data) => {
        console.log(data)
        res.render('admin/index', { title: 'Admin', data });
    });

});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
})

router.post('/news/add', (req, res) => {
    // przechwytywanie danych z formularza
    const body = req.body;
    // przypisanie danych z formularza do zabzy danych za pomocą użycia konstruktora new News
    const newsData = new News(body);
    // walidacja danych otrzymanych od req, służy do tego metoda validateSync(), którą wywołujemy na danych pozyskanych z req.body

    const errors = newsData.validateSync();
    console.log("błędy przy walidacji danych", errors)
    newsData.save((err) => {
        if (err) {
            res.render('admin/news-form', { title: 'Dodaj news', errors, body });
            return;
        }

        res.redirect('/admin');

    })
    // dodawanie newsa z tytulem i desc. jak powyżej w momencie zalogowania się jako admin
    // w momencie w którym wystąpiły błędy w zapisie metoda ta zwraca szablon 
    // jeśli wszytsko jest poprawne na koniec przekierowywujemy ścieżkę do admina

});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin')
    })
})


module.exports = router;
