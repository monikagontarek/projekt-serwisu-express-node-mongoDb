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
    const newsData = new News({
        title: 'Tytuł testowy',
        description: 'Opis'
    })

    newsData.save((err) => {
        console.log(err);
    })

    console.log(req.session.admin)
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
