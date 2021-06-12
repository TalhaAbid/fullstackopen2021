const logger = require("./logger");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

morgan.token("body", (request, response) => {
  JSON.stringify(request.body);
});
const morganLogger = morgan(
  ":method :url :status :res[content.length] - :response-time ms :body"
);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    request.user = decodedToken;
  } else {
    request.user = null;
  }

  next();
};
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  console.log(error);
  next(error);
};

module.exports = {
  morganLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
};
