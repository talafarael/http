const {model, Schema} = require("mongoose")
const user = new Schema({
	email: {type: String, uniqne: true, required: true},
	password: {type: String, required: true},

})
module.exports= model("User", user)