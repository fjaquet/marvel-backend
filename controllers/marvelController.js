const { fetchAll, fetchById } = require("../services/marvelService");

const getAll = (route) => async (req, res, next) => {
  try {
    const response = await fetchAll(route, req.query);

    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

const getById = (route, paramId) => async (req, res, next) => {
  try {
    const response = await fetchById(route, req.params[paramId]);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
