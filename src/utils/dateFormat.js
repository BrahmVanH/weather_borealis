export const formatDate = (dateString) => {
	let formattedDate = '';
	if (dateString !== '') {
		formattedDate =dateString.slice(0, 16);
	} else {
		console.log('date string empty, cannot format');
	}
	return formattedDate;
};
