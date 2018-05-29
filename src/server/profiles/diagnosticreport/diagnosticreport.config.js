const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./diagnosticreport.arguments');
const controller = require('./diagnosticreport.controller');


let write_only_scopes = write_scopes('DiagnosticReport');
let read_only_scopes = read_scopes('DiagnosticReport');


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
		path: '/:version/diagnosticreport',
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getDiagnosticReport
	},
	{
		type: 'post',
		path: '/:version/diagnosticreport/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getDiagnosticReport
	},
	{
		type: 'get',
		path: '/:version/diagnosticreport/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getDiagnosticReportById
	},
	{
		type: 'post',
		path: '/:version/diagnosticreport',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createDiagnosticReport
	},
	{
		type: 'put',
		path: '/:version/diagnosticreport/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateDiagnosticReport
	},
	{
		type: 'delete',
		path: '/:version/diagnosticreport/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteDiagnosticReport
	}
];

/**
 * @name exports
 * @summary DiagnosticReport config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.DIAGNOSTICREPORT
	},
	routes
};
