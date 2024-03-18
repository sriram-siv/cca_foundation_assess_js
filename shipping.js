import https from "https";

export async function getCountryRegion(country) {
  const url = `https://npovmrfcyzu2gu42pmqa7zce6a0zikbf.lambda-url.eu-west-2.on.aws/?country=${country}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";

        response.on("data", data.concat);

        const handleCompletedResponse = () => {
          try {
            const { region } = JSON.parse(data);
            resolve(region);
          } catch (error) {
            reject(error);
          }
        };

        response.on("end", handleCompletedResponse);
      })
      .on("error", reject);
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
