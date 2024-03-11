const https = require('https');

function calculateShipping(country, orderTotal, callback) {
    const url = `https://npovmrfcyzu2gu42pmqa7zce6a0zikbf.lambda-url.eu-west-2.on.aws/?country=${country}`;

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Process the data.
        resp.on('end', () => {
            try {
                const region = JSON.parse(data).region;
                let shipping = 0.0;

                if (region === "UK") {
                    if (orderTotal < 30.0) {
                        shipping = 4.99;
                    }
                } else if (region === "EU") {
                    if (orderTotal < 30) {
                        shipping = 8.99;
                    } else {
                        shipping = 4.99;
                    }
                } else if (region === "OTHER") {
                    shipping = 9.99;
                }

                // Use the callback function to return the result
                callback(shipping);
            } catch (error) {
                // Use the callback to return errors
                callback(error);
            }
        });

    }).on("error", (err) => {
        // Use the callback to return HTTP request errors
        callback(err);
    });
}

module.exports = calculateShipping;