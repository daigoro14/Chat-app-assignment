import {express, passport} from "./app"

const router = express.Router()

const {User} = require('./models/user')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.use(passport.authenticate('session'))

router.get('/data', async (req: any, res: any) => {
        console.log(req.user)
})

exports.router = router