"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const message_1 = require("../models/message");
const { ensureLoggedIn } = require('connect-ensure-login');
const router = app_1.express.Router();
const { User } = require('../models/user');
app_1.passport.use(User.createStrategy());
app_1.passport.serializeUser(User.serializeUser());
app_1.passport.deserializeUser(User.deserializeUser());
router.use(app_1.passport.authenticate('session'));
router.use(ensureLoggedIn("/auth/login"));
router.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_1.Message.find();
    const user = req.user;
    res.json({ user, messages });
}));
router.post('/sendMessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createMessage = new message_1.Message({ username: req.user.username, message: req.body.createMessage });
    yield createMessage.save();
    res.redirect("/page/data");
}));
exports.router = router;
