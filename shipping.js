import https from "https";

export async function getCountryRegion(country) {
  const url = `https://npovmrfcyzu2gu42pmqa7zce6a0zikbf.lambda-url.eu-west-2.on.aws/?country=${country}`;

  return new Promise((res, rej) => {
    https
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Process the data.
        resp.on("end", () => {
          try {
            const { region } = JSON.parse(data);
            res(region);
          } catch (error) {
            rej(error);
          }
        });
      })
      .on("error", (error) => {
        rej(error);
      });
  });
}

export async function calculateShipping(region, orderTotal) {
  let shipping = 0.0;

  if (region === "UK") {
    if (orderTotal < 100.0) {
      shipping = 4.99;
    }
  } else if (region === "EU") {
    if (orderTotal < 100) {
      shipping = 8.99;
    } else {
      shipping = 4.99;
    }
  } else if (region === "OTHER") {
    shipping = 9.99;
  }

  return shipping;
}
