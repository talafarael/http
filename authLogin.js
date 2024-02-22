const jwt = require("jsonwebtoken")
const User = require("./user")
const bcrypt = require("bcryptjs")
const {secret}=require('./config')
const generateAccessToken = (id) => {
	const playold = {
		id,
	}
	return jwt.sign(playold, secret, {expiresIn: "24h"})
}
class authLogin {
	async registr(req, res, body) {
		try {
			const hashpassword = await bcrypt.hash(body.password, 7)
			const check = await User.findOne({email: body.name})
			if (check) {
				return res.end("Користувач не знайдено")
			}
			const user = new User({
				email: body.name,
				password: hashpassword,
			})
			user.save()
		} catch (error) {
			console.error("Ошибка при парсинге JSON:", error)
		}
	}
	async login(req, res, body) {
		try {
						const user = await User.findOne({ email: body.name });
						console.log('1');
						if (!user) {
										res.writeHead(400, { "Content-Type": "application/json" });
										res.end(JSON.stringify({ message: "User not found" }));
										return;
						}
						console.log('2');
						const validPassword = bcrypt.compareSync(body.password, user.password);
						if (!validPassword) {
										res.writeHead(400, { "Content-Type": "application/json" });
										res.end(JSON.stringify({ message: "Invalid password" }));
										return;
						}
						console.log('3');
						const token = generateAccessToken(user._id);
						console.log(token);
						if (token == undefined) {
										// Handle error here if needed
						}
							res.end(JSON.stringify({ token }));
						res.writeHead(200, { "Content-Type": "application/json" });
					
						return;
		} catch (error) {
						console.error("Error:", error);
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ message: "Internal Server Error" }));
						return;


		}
}

}

module.exports = new authLogin()
