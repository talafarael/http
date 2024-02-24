const url = require("url")
let body
const authLogin = require("./authLogin")

async function router(req, res) {
    const parsed = url.parse(req.url, true)
	const reqUrl = url.parse(req.url).pathname
	const parts = reqUrl.split("/")
	const firstPart = parts[1]
	const secondPart = parts[2]
	console.log(secondPart)
	
	if (req.method == "POST") {
		if (firstPart == "auth") {
			let data = ""
			await req.on("data", (chunk) => {
				data += chunk
			})
			await req.on("end", () => {
				try {
					const jsonData = JSON.parse(data)
					body = jsonData

					return
				} catch (error) {}
			})

			if (secondPart == "registration") {
				authLogin.registration(req, res, body)
			}
			if (secondPart == "login") {
				authLogin.login(req, res, body)
			}
		}
	}
}

module.exports = router
