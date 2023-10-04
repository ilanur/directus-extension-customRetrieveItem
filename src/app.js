import { defineOperationApp } from "@directus/extensions-sdk";

export default defineOperationApp({
	id: 'retrieve-item',
	name: 'Get Angel',
	icon: 'box',
	description: 'Get the item corresponding to the given date',
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
		{
			field: "table_name",
			name: "Name of the table to retrieve Items from",
			type: "string",
			meta: {
				width: "full",
				interface: "input",
				special: null,
				options: {
					masked: true,
					placeholder: "e.g: posts",
				},
			},
		},
	],
});
