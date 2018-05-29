const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./immunization.arguments');
const controller = require('./immunization.controller');

let write_only_scopes = write_scopes('Immunization');
let read_only_scopes = read_scopes('Immunization');

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
		path: '/:version/immunization',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImmunization
	},
	{
		type: 'post',
		path: '/:version/immunization/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImmunization
	},
	{
		type: 'get',
		path: '/:version/immunization/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getImmunizationById
	},
	{
		type: 'post',
		path: '/:version/immunization',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createImmunization
	},
	{
		type: 'put',
		path: '/:version/immunization/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateImmunization
	},
	{
		type: 'delete',
		path: '/:version/immunization/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteImmunization
	}
];

/**
 * @name exports
 * @summary Immunization config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.IMMUNIZATION
	},
	routes
};
