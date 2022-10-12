import {express, passport} from "./app"
const router = express.Router()

const {User} = require('./models/user')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// router.post('/register', async (req: any, res: any)  => {
//         const user = new User({username: req.body.username})
//         await user.save()
// })

router.post('/register', async (req: any, res: any)  => {
    const user = new User({username: req.body.username, email: req.body.username})
    await user.setPassword(req.body.password)
    await user.save()
})

router.post('/login', passport.authenticate('local', {
    successRedirect: "/page/posts"
}))

exports.router = router