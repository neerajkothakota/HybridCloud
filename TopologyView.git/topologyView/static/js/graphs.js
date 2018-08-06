queue()
    .defer(d3.json, "/topologyview")
    .defer(d3.json, "static/geojson/us-states.json")
    .await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {
	
	//Clean projectsJson data
	var donorschooseProjects = projectsJson;
	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S.fff");
	donorschooseProjects.forEach(function(d) {
	//	d["modified"] = dateFormat.parse(d["modified"]);
	//	d["modified"].setDate(1);
		d["cpuCount"] = +d["cpuCount"];
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(donorschooseProjects);

	//Define Dimensions
//	var dateDim = ndx.dimension(function(d) { return d["modified"]; });
	var resourceTypeDim = ndx.dimension(function(d) { return d["name"]; });
	var povertyLevelDim = ndx.dimension(function(d) { return d["status"]; });
//	var stateDim = ndx.dimension(function(d) { return d["state"]; });
	var totalDonationsDim  = ndx.dimension(function(d) { return d["cpuCount"]; });


	//Calculate metrics
//	var numProjectsByDate = dateDim.group();
	var numProjectsByResourceType = resourceTypeDim.group();
	var numProjectsByPovertyLevel = povertyLevelDim.group();
//	var totalDonationsByState = stateDim.group().reduceSum(function(d) {
//		return d["cpuCount"];
//	});

	var all = ndx.groupAll();
	var totalDonations = ndx.groupAll().reduceSum(function(d) {return d["cpuCount"];});

//	var max_state = totalDonationsByState.top(1)[0].value;

	//Define values (to be used in charts)
//	var minDate = dateDim.bottom(1)[0]["modified"];
//	var maxDate = dateDim.top(1)[0]["modified"];

    //Charts
//	var timeChart = dc.barChart("#time-chart");
//	var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
//	var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
//	var usChart = dc.geoChoroplethChart("#us-chart");
//	var numberProjectsND = dc.numberDisplay("#number-projects-nd");
//	var totalDonationsND = dc.numberDisplay("#total-donations-nd");

   //     var timeChart = dc.barChart("#time-chart");
    	var resourceTypeChart = dc.rowChart("#name-row-chart");
    	var povertyLevelChart = dc.rowChart("#status-row-chart");
    	//var usChart = dc.geoChoroplethChart("#us-chart");
    //	var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    	var totalDonationsND = dc.numberDisplay("#total-cpucount-nd");

//	numberProjectsND
//		.formatNumber(d3.format("d"))
//		.valueAccessor(function(d){return d; })
//		.group(all);

	totalDonationsND
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(totalDonations)
		.formatNumber(d3.format(".3s"));

//	timeChart
//		.width(600)
//		.height(160)
//		.margins({top: 10, right: 50, bottom: 30, left: 50})
//		.dimension(dateDim)
//		.group(numProjectsByDate)
//		.transitionDuration(500)
//		.x(d3.time.scale().domain([minDate, maxDate]))
//		.elasticY(true)
//		.xAxisLabel("Year")
//		.yAxis().ticks(4);

	resourceTypeChart
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .xAxis().ticks(4);

	povertyLevelChart
		.width(300)
		.height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .xAxis().ticks(4);


//	usChart.width(1000)
//		.height(330)
//		.dimension(stateDim)
//		.group(totalDonationsByState)
//		.colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
//		.colorDomain([0, max_state])
////		.overlayGeoJson(statesJson["features"], "state", function (d) {
////			return d.properties.name;
////		}
////		)
//        .projection(d3.geo.albersUsa()
//    				.scale(600)
//    				.translate([340, 150]))
//		.title(function (p) {
//			return "State: " + p["key"]
//					+ "\n"
//					+ "Total cpu: " + Math.round(p["value"]) + " $";
//		})

    dc.renderAll();

};