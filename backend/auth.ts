import {express, passport} from "./app"
const router = express.Router()

const {User} = require('./models/user')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


router.post('/register', async (req: any, res: any)  => {
    const user = new User({username: req.body.username, email: req.body.email})
    await user.setPassword(req.body.password)
    await user.save()
})

router.post('/login', passport.authenticate('local', {
    successRedirect: "/page/posts"
}))

router.post('/logOut', async(req: any, res: any, next: any) => {
    req.logout(function(err: any) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  })

exports.router = router