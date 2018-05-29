const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./procedure.arguments');
const controller = require('./procedure.controller');

let write_only_scopes = write_scopes('Procedure');
let read_only_scopes = read_scopes('Procedure');

let commonArgsArray = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resourceArgsArray = Object.getOwnPropertyNames(resource_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_args[arg_name]));

const resourceAllArguments = [
	route_args.VERSION,	...commonArgsArray, ...resourceArgsArray,
];

let routes = [
	{
		type: 'get',
		path: '/:version/procedure',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getProcedure
	},
	{
		type: 'post',
		path: '/:version/procedure/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getProcedure
	},
	{
		type: 'get',
		path: '/:version/procedure/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getProcedureById
	},
	{
		type: 'post',
		path: '/:version/procedure',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createProcedure
	},
	{
		type: 'put',
		path: '/:version/procedure/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateProcedure
	},
	{
		type: 'delete',
		path: '/:version/procedure/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteProcedure
	}
];

/**
 * @name exports
 * @summary Procedure config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.PROCEDURE
	},
	routes
};
