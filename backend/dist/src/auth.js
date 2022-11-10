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
const router = app_1.express.Router();
const { User } = require('../models/user');
app_1.passport.use(User.createStrategy());
app_1.passport.serializeUser(User.serializeUser());
app_1.passport.deserializeUser(User.deserializeUser());
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User({ username: req.body.username, email: req.body.email });
    yield user.setPassword(req.body.password);
    yield user.save();
    res.json({});
}));
router.post('/login', app_1.passport.authenticate('local', {
    successRedirect: "/page/posts"
}));
router.post('/logOut', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}));
exports.router = router;
