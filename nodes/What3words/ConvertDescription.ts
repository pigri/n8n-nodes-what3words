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
				name: '3 Word to Coordinate',
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
		description: 'The coordinate to convert to 3 word address',
	},
	{
		displayName: 'Words',
		name: 'words',
		required: true,
		type: 'string',
		placeholder: 'index.home.raft',
		displayOptions: {
			show: {
				operation: ['3wa2conv'],
				resource: ['convert'],
			},
		},
		default: '',
		description: 'The 3 word address to convert to coordinate',
	},
];
