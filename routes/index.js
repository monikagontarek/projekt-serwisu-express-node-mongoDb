const express = require('express');
const router = express.Router();
const login = 'admin';
const password = '123';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie' });
});

router.post('/login', (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {
    // w momencie, w którym się poprawnie zalogujemy to nadajęmy naszemu req.sesion nazwe (u nas admin) i przypisujemy do niego 1
    req.session.admin = 1;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }

});





module.exports = router;
