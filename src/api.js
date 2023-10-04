import { defineOperationApi } from "@directus/extensions-sdk";

export default defineOperationApi({
	id: "retrieve-item",
	handler: async (
		{
			date,
			table_name
		},
		{services, database, getSchema}
	) => {
		try {
			const result = await retrieveItem(date, database);
			return result;
		} catch (error) {
			console.error('Error: ', error);
			return { error: error.message };
		}
	}
});


async function retrieveItem(date, database) {

	//HERE GOES THE CUSTOM FUNCTION//
	const birthDayDate = new Date(date);

	const day = birthDayDate.getDate();
	const month = birthDayDate.getMonth() + 1; // JavaScript months are 0-11
  
	try {
		const items = await database.select('*').from(table_name);
	  let foundItem = items.find((item) => {
		let itemStartMonth = item.from_month;
		let itemStartDay = item.from_day;
		let itemEndMonth = item.to_month;
		let itemEndDay = item.to_day;
  
		if (itemStartMonth > itemEndMonth || (itemStartMonth === itemEndMonth && itemStartDay > itemEndDay)) {
		  if ((month > itemStartMonth || (month === itemStartMonth && day >= itemStartDay)) || 
			  (month < itemEndMonth || (month === itemEndMonth && day <= itemEndDay))) {
			return true;
		  }
		} else {
		  if ((month > itemStartMonth || (month === itemStartMonth && day >= itemStartDay)) && 
			  (month < itemEndMonth || (month === itemEndMonth && day <= itemEndDay))) {
			return true;
		  }
		}

		return false;
	  });
  
	  return {
		response: foundAngel
	};
} catch (error) {
	  console.error('Error: ', error);
	}
  }