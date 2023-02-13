const { Router } = require('express');
const router = Router();
const authCont = require('../controllers/authControllers');
const { requireAuth,checkUser } = require('../middlewares/authMiddleware');


router.get('*', checkUser);
router.get('/', authCont.home_page);
router.get('/blog' ,requireAuth, authCont.blog_page);
router.get('/login', authCont.login_page);
router.post('/login', authCont.login_page_post);
router.get('/signup', authCont.signup_page);
router.post('/signup', authCont.signup_page_post);
router.get('/logout', authCont.logout_page);



module.exports = router;