import axios from "axios";

import { MarvelGetAll } from "../types/marvel";

const { MARVEL_API_PROTO, MARVEL_API_FQDN, MARVEL_API_KEY } = process.env;

if (!MARVEL_API_PROTO || !MARVEL_API_FQDN || !MARVEL_API_KEY) {
  throw new Error("Missing required Marvel API env vars");
}

const apiUrl = `${MARVEL_API_PROTO}://${MARVEL_API_FQDN}`;
const apiKey = MARVEL_API_KEY;

const fetchAll = async (route: string, query: MarvelGetAll) => {
  const response = await axios({
    method: "get",
    url: `${apiUrl}${route}`,
    params: { ...query, apiKey },
  });

  return response;
};

const fetchById = async (route: string, id: string) => {
  const response = await axios({
    method: "get",
    url: `${apiUrl}${route}/${id}`,
    params: { apiKey },
  });

  return response;
};

export { fetchAll, fetchById };
