const fetch = require('node-fetch');

const getGeoData = async (address, apiKey) => {
  const q = `${encodeURIComponent(address)}, Schweiz`;

  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${q}`);

  if (!response.ok) {
    console.info(response.url);
    console.info(`failed "${address}" (${response.status})!`);

    return null;
  }

  const { results } = await response.json();
  const [first] = results;

  if (!first) {
    console.info(`no results for ${address}!`);
    return null;
  }

  const {
    geometry: { lat, lng },
    components: { state },
  } = first;

  return { state, lat, lng };
};

module.exports = { getGeoData };
