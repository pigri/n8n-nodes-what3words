import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { what3wordsApiRequest } from './GenericFunctions';

import { ConvertFields, ConvertOperations } from './ConvertDescription';

export class What3words implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'What3words',
		name: 'what3words',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:what3words.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume what3words API',
		defaults: {
			name: 'What3words',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'what3wordsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Convert',
						value: 'convert',
					},
				],
				default: 'convert',
			},

			...ConvertOperations,
			...ConvertFields,
		],
	};

	methods = {
		loadOptions: {
			async getLanguages(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const result = await what3wordsApiRequest.call(this, 'GET', '/available-languages');
				for (const language of result.languages) {
					returnData.push({
						name: language.name,
						value: language.code,
					});
				}

				returnData.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return new Promise(async (resolve, reject) => {
			const items = this.getInputData();
			const returnData: INodeExecutionData[] = [];
			const resource = this.getNodeParameter('resource', 0);
			const operation = this.getNodeParameter('operation', 0);
			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				try {
					if (resource === 'convert') {
						if (operation === 'conv23wa') {
							const language = this.getNodeParameter('language', itemIndex) as string;
							const cordinates = this.getNodeParameter('cordinates', itemIndex) as string;
							const responseData = await what3wordsApiRequest.call(
								this,
								'GET',
								`/convert-to-3wa?coordinates=${cordinates}&language=${language}`,
							);
							const result = this.helpers.returnJsonArray(responseData as unknown as IDataObject[]);
							returnData.push(...result);
						}
						if (operation === '3wa2conv') {
							const words = this.getNodeParameter('words', itemIndex) as string;
							const responseData = await what3wordsApiRequest.call(
								this,
								'GET',
								`/convert-to-coordinates?words=${encodeURIComponent(words)}`,
							);
							const result = this.helpers.returnJsonArray(responseData as unknown as IDataObject[]);
							returnData.push(...result);
						}
					}
					return resolve(this.prepareOutputData(returnData));
				} catch (error) {
					reject(error);
				}
			}
		});
	}
}
