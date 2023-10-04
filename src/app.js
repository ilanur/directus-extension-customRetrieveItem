import { defineOperationApp } from "@directus/extensions-sdk";

export default defineOperationApp({
	id: 'get-angel',
	name: 'Get Angel',
	icon: 'box',
	description: 'Get the angel corresponding to the given date',
	overview: ({ date }) => [
		{
			label: 'Date',
			text: date,
		},
	],
	options: [
		{
			field: 'date',
			name: 'Date',
			type: 'date',
			meta: {
				width: 'full',
				interface: 'date',
			},
		},
	],
});
