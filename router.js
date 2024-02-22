const url = require("url");

async function router(req, res) {
    const reqUrl = url.parse(req.url).pathname;
    const parts = reqUrl.split("/");
    const firstPart = parts[1];
    const secondPart = parts[2];
    const authLogin = require('./authLogin');
    const parsed = url.parse(req.url, true);

    console.log(secondPart);

    if (req.method == "POST") {
        if (firstPart == "auth") {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    body = jsonData;
                    authLogin[secondPart](req, res, body);
                    return; 
                } catch (error) {
                 
                }
            });
        } else {
            
        }
    }
}

module.exports = router;