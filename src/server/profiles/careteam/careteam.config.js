const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./careteam.arguments');
const controller = require('./careteam.controller');

let write_only_scopes = write_scopes('CareTeam');
let read_only_scopes = read_scopes('CareTeam');

let commonArgsArray = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resourceArgsArray = Object.getOwnPropertyNames(careteam_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_args[arg_name]));

const resourceAllArguments = [
	route_args.VERSION,	...commonArgsArray, ...resourceArgsArray,
];

let routes = [
	{
		type: 'get',
		path: '/:version/careteam',
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getCareTeam
	},
	{
		type: 'post',
		path: '/:version/careteam/_search',
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getCareTeam
	},
	{
		type: 'get',
		path: '/:version/careteam/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getCareTeamById
	},
	{
		type: 'post',
		path: '/:version/careteam',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createCareTeam
	},
	{
		type: 'put',
		path: '/:version/careteam/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateCareTeam
	},
	{
		type: 'delete',
		path: '/:version/careteam/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteCareTeam
	}
];

/**
 * @name exports
 * @summary CareTeam config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.CARETEAM
	},
	routes
};
