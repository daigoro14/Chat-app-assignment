import {express, passport, sess} from "./app"

const router = express.Router()

router.get('/username', async (req: any, res: any) => {
    console.log('den nådde GET', sess.username)
    // res.json({user, messages})
})

exports.router = router