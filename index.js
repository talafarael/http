const http = require("http")

const router = require("./router")
const mongoose = require("mongoose")
mongoose.connect(
	"mongodb+srv://artemk2504:farashiner@cluster0.1pp5frh.mongodb.net/"
)
const server = http.createServer(async (req, res) => {
	if (req.method === "OPTIONS") {
		// Handling preflight request for CORS
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		res.setHeader("Access-Control-Allow-Headers", "Content-Type")

		return
	}
	router(req, res)

	res.end()
})

// Have the server listen on port 9000
server.listen(9000)
