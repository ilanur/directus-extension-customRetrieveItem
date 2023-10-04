import { defineOperationApi } from "@directus/extensions-sdk";

export default defineOperationApi({
	id: "get-angel",
	handler: async (
		{
			date,
		},
		{services, database, getSchema}
	) => {
		try {
			const result = await findAngel(date, database);
			return result;
		} catch (error) {
			console.error('Error: ', error);
			return { error: error.message };
		}
	}
});

async function findAngel(date, database) {
	const birthDayDate = new Date(date);

	const day = birthDayDate.getDate();
	const month = birthDayDate.getMonth() + 1; // JavaScript months are 0-11
  
	try {
		const angels = await database.select('*').from('angels');
	  // Filter the angels to find the correct one
	  let foundAngel = angels.find((angel) => {
		let angelStartMonth = angel.from_month;
		let angelStartDay = angel.from_day;
		let angelEndMonth = angel.to_month;
		let angelEndDay = angel.to_day;
  
		// If the angel's period spans over the end of the year
		if (angelStartMonth > angelEndMonth || (angelStartMonth === angelEndMonth && angelStartDay > angelEndDay)) {
		  if ((month > angelStartMonth || (month === angelStartMonth && day >= angelStartDay)) || 
			  (month < angelEndMonth || (month === angelEndMonth && day <= angelEndDay))) {
			return true;
		  }
		} else {
		  if ((month > angelStartMonth || (month === angelStartMonth && day >= angelStartDay)) && 
			  (month < angelEndMonth || (month === angelEndMonth && day <= angelEndDay))) {
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