const handler = require('@asymmetrik/fhir-response-util');

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
      .then((results) => handler.read(req, res, results))
      .catch(next);
  };
};
