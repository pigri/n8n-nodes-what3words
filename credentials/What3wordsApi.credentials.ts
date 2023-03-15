import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class What3wordsApi implements ICredentialType {
	name = 'what3wordsApi';

	displayName = 'What3words API';

	documentationUrl = 'https://docs.what3words.com/api/v3/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

}
