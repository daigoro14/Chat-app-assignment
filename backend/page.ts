import {express, passport} from "./app"
import { Message } from "./models/message"
const { ensureLoggedIn } = require('connect-ensure-login')

const router = express.Router()

const {User} = require('./models/user')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.use(passport.authenticate('session'))

router.use(ensureLoggedIn("/auth/login"))

router.get('/data', async (req: any, res: any) => {
        const messages = await Message.find()
        const user = req.user
        res.json({user, messages})
})

router.post('/sendMessage', async (req: any, res: any) => {
        const createMessage = new Message({username: req.user.username, message: req.body.createMessage})
        await createMessage.save()
        res.redirect("/page/data")
})

exports.router = router