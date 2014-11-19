
maerskSharepointDashboardApp.filter("dateFilter", function($filter) {
	return function(data) {
		var date = moment(data);

		return date.format('DD-MM-YYYY');
	};
});