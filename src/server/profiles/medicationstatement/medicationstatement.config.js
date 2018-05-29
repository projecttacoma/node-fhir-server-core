const {route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./medicationstatement.arguments');
const controller = require('./medicationstatement.controller');

let write_only_scopes = write_scopes('MedicationStatement');
let read_only_scopes = read_scopes('MedicationStatement');

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
		path: '/:version/medicationstatement',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getMedicationStatement
	},
	{
		type: 'post',
		path: '/:version/medicationstatement/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getMedicationStatement
	},
	{
		type: 'get',
		path: '/:version/medicationstatement/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getMedicationStatementById
	},
	{
		type: 'post',
		path: '/:version/medicationstatement',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createMedicationStatement
	},
	{
		type: 'put',
		path: '/:version/medicationstatement/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateMedicationStatement
	},
	{
		type: 'delete',
		path: '/:version/medicationstatement/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteMedicationStatement
	}
];

/**
 * @name exports
 * @summary MedicationStatement config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.MEDICATIONSTATEMENT
	},
	routes
};
