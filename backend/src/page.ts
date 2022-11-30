import {express, sess} from "./app"
import { Message } from "../models/message"

const router = express.Router()

router.get('/data', async (req: any, res: any) => {
        try {
                const messages = await Message.find()
                const user = sess.user
                res.json({user, messages})
        } catch {
                res.json('LOGIN')
        }

})

router.post('/sendMessage', async (req: any, res: any) => {
        const createMessage = new Message({username: sess.user, message: req.body.createMessage})
        await createMessage.save()
        res.redirect("/page/data")
})

exports.router = router