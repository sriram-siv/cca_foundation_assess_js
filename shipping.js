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

export function calculateShipping(region, orderTotal) {
  if (typeof orderTotal !== "number" || orderTotal <= 0) {
    throw new Error("Invalid total");
  }

  if (region === "UK") {
    return orderTotal < 120 ? 4.99 : 0;
  }

  if (region === "EU") {
    return orderTotal < 100 ? 8.99 : 4.99;
  }

  return orderTotal < 200 ? 9.99 : 5.99;
}
