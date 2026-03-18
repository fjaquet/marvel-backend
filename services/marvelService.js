const axios = require("axios");

const apiUrl =
  process.env.MARVEL_API_PROTO + "://" + process.env.MARVEL_API_FQDN;
const apiKey = process.env.MARVEL_API_KEY;

const fetchAll = async (route, query) => {
  const response = await axios({
    method: "get",
    url: `${apiUrl}${route}`,
    params: { ...query, apiKey },
  });

  return response;
};

const fetchById = async (route, id) => {
  const response = await axios({
    method: "get",
    url: `${apiUrl}${route}/${id}`,
    params: { apiKey },
  });

  return response;
};

module.exports = { fetchAll, fetchById };
