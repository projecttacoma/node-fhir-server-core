const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./organization.arguments');
const controller = require('./organization.controller');

let write_only_scopes = write_scopes('Organization');
let read_only_scopes = read_scopes('Organization');

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
		path: '/:version/organization',
		corsOptions: {methods: ['GET']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getOrganization
	},
	{
		type: 'post',
		path: '/:version/organization/_search',
		corsOptions: {methods: ['POST']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getOrganization
	},
	{
		type: 'get',
		path: '/:version/organization/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getOrganizationById
	},
	{
		type: 'post',
		path: '/:version/organization',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createOrganization
	},
	{
		type: 'put',
		path: '/:version/organization/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateOrganization
	},
	{
		type: 'delete',
		path: '/:version/organization/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteOrganization
	}
];

/**
 * @name exports
 * @summary Organization config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.ORGANIZATION
	},
	routes
};
