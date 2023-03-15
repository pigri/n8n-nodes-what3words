import type { INodeProperties } from 'n8n-workflow';

export const ConvertOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['convert'],
			},
		},
		options: [
			{
				name: 'Cordinate to 3 Words',
				value: 'conv23wa',
				description: 'Convert from coordinate to 3 words',
				action: 'Convert from coordinate to 3 words',
			},
			{
				name: '3 Words to Coordinate',
				value: '3wa2conv',
				description: 'Convert from 3 words to coordinate',
				action: 'Convert from 3 words to coordinate',
			},
		],
		default: 'conv23wa',
	},
];

export const ConvertFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 convert                                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Cordinates',
		name: 'cordinates',
		required: true,
		type: 'string',
		placeholder: '51.521458,-0.172963',
		displayOptions: {
			show: {
				operation: ['conv23wa'],
				resource: ['convert'],
			},
		},
		default: '',
		description: 'The coordinate to convert to 3 words address',
	},
	{
		displayName: 'Words',
		name: 'words',
		required: true,
		type: 'string',
		default: '',
		placeholder: 'index.home.raft',
		displayOptions: {
			show: {
				operation: ['3wa2conv'],
				resource: ['convert'],
			},
		},
		description: 'The 3 words address to convert to coordinate',
	},
	{
		displayName: 'Language Name or ID',
		name: 'language',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getLanguages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['conv23wa'],
				resource: ['convert'],
			},
		},
	},
];
