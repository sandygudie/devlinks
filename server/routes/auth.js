const Router = require("express");
const authRouter = Router();
const { googleLogin } = require("../controllers/auth");

authRouter.post("/google", googleLogin);
module.exports = { authRouter };
