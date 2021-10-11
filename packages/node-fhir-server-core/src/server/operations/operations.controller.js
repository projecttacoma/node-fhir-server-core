const handler = require('@asymmetrik/fhir-response-util');

const express = require('express');
const app = express();
/**
 * Override of Express's status() function to check if a status exists before
 * setting the status to the specified statusCode
 * @param {number} statusCode
 */
// express.response.status = function (statusCode) {
//   if (this.response) {
//     if (this.statusCode === undefined) {
//       this.statusCode = statusCode;
//     }
//   }
// };

function setResponseStatus(res, statusCode) {
  if (res.statusCode === undefined) {
    res.statusCode = statusCode;
  }
}

// brought directly in from fhir-response-util for testing

function read(req, res, json) {
  let fhirVersion = req.params.base_version;
  res.type(handler.getContentType(fhirVersion));
  res.status(200).json(json);
}

/**
 * @description Controller for all POST operations
 */
module.exports.operationsPost = function operationsPost({
  profile,
  name,
  logger: deprecatedLogger,
}) {
  let { serviceModule: service } = profile;

  return (req, res, next) => {
    let { base_version, id } = req.sanitized_args;
    req.sanitized_args.resource = req.body;
    service[name](req.sanitized_args, { req }, deprecatedLogger)
      .then((results) => handler.read(req, res, results))
      .catch(next);
  };
};

/**
 * @description Controller for all GET operations
 */
module.exports.operationsGet = function operationsGet({ profile, name, logger: deprecatedLogger }) {
  let { serviceModule: service } = profile;
  return (req, res, next) => {
    service[name](req.sanitized_args, { req }, deprecatedLogger)
      .then((results) => read(req, res, results)) //handler.read(req, res, results))
      .catch(next);
  };
};
