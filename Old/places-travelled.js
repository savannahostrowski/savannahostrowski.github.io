function initialize() {
	var mapOptions = { 
		center: new google.maps.LatLng(62.186014,-93.779297),
		zoom: 3,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions:{
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		panControl: true,
		scaleControl: true,
		mapTypeControl: true,
		mapTypeControlOptions:{
		mapTypeIds:[google.maps.MapTypeId.ROADMAP,
					google.maps.MapTypeId.HYBRID],
					style:google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		streetviewControl:true,
		rotateControl:true,
		overviewMapControl:true,
		overviewMapContolOptions:{
			opened:true}
			}
		var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
		addButtons(map);
		drawMarkers(map);
	}
function addButtons(map) {
	document.getElementById('btnTerrain').addEventListener('click',function(){
		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
});
	document.getElementById('btnRoadmap').addEventListener('click',function(){
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
});
	document.getElementById('btnSatellite').addEventListener('click',function(){
		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
});
	document.getElementById('btnHybrid').addEventListener('click',function(){
		map.setMapTypeId(google.maps.MapTypeId.HYBRID);
});
}
function drawMarkers(map){	
	for (var i = 0; i < places.length; i++){
		var place = places[i];
		new google.maps.Marker({
			position: new google.maps.LatLng(place.position.x, place.position.y),
			title: place.title,
			map:map
		});
	}
}
var places = [
	{
		position:{x:41.8919300, y:12.5113300},
		title: "Rome - Summer 2014"
	},
	{
		position:{x:40.8563100, y:14.2464100},
		title: "Naples - Summer 2014"
	},
	{
		position:{x:43.7792500, y:11.2462600},
		title:"Florence - Summer 2014"
	},
	{
		position:{x:44.4938100, y:11.3387500},
		title: "Bologna - Summer 2014"
	},
	{
		position:{x:45.4642700,y:9.1895100},
		title:"Milan - Summer 2014"
	},
	{
		position:{x:45.2501566,y:-75.8002568},
		title: "Ottawa"
	},
	{
		position:{x:43.7182713,y:-79.3777061},
		title:"Toronto"
	},
	{
		position:{x:43.472285,y:-80.544858},
		title: "Waterloo"
	},
	{
		position:{x:48.4025585,y:-89.2719957},
		title: "Thunder Bay"
	},
	{
		position:{x:45.5601451,y:-73.7120832},
		title: "Montreal"
	},
	{
		position:{x:46.8580074,y:-71.3460728},
		title: "Quebec City"
	},
	{
		position:{x:45.2183486,y:-69.0170786},
		title: "Maine"
	},
	{
		position:{x:43.8717545,y:-72.4477828},
		title: "Vermont"
	},
	{
		position:{x:44.0012306,y:-71.5799231},
		title:"New Hampshire"
	},
	{
		position:{x:34.1682185,y:-111.930907},
		title: "Arizona"
	},
	{
		position: {x:39.4997605,y:-111.547028},
		title: "Utah"
	},
	{
		position:{x:38.502032,y:-117.0230604},
		title: "Nevada"
	},
	{
		position:{x:37.2718745,y:-119.2704153},
		title:"California"
	},
	{
		position:{x:31.1693363,y:-100.0768425},
		title: "Texas"
	},
	{
		position:{x:40.7033121,y:-73.979681},
		title:"New York"
	},
	{
		position:{x:42.0629399,y:-71.7183465},
		title:"Massachusetts"
	},
	{
		position:{x:41.5187836,y:-72.757507},
		title:"Connecticut"
	},
	{
		position:{x:40.9945928,y:-77.6046984},
		title:"Pennsylvania"
	},
	{
		position:{x:38.8063524,y:-77.2684162},
		title:"Maryland"
	},
	{
		position:{x:40.1430058,y:-74.7311156},
		title:"New Jersey"
	},
	{
		position:{x:38.0033854,y:-79.4587861},
		title:"Virginia"
	},
	{
		position:{x:38.9201705,y:-80.1816905},
		title:"West Virginia"
	},
	{
		position:{x:35.2145629,y:-79.8912675},
		title:"North Carolina"
	},
	{
		position:{x:33.62505,y:-80.9470381},
		title:"South Carolina"
	},
	{
		position:{x:32.6781248,y:-83.2229758},
		title:"Georgia"
	},
	{
		position:{x:27.9757279,y:-83.8330166},
		title:"Florida"
	},
	{
		position:{x:21.5513258,y:-79.6017351},
		title:"Cuba"
	},
	{
		position:{x:18.7009047,y:-70.1654584},
		title: "Dominican Republic"
	},
	{
		position:{x:17.0856927,y:-61.7897027},
		title:"Antigua"
	},
	{
		position:{x:13.1901325,y:-59.5355639},
		title: "Barbados"
	},
	{
		position:{x:18.0349321,y:-63.0751727},
		title:"St.Maarten"
	},
	{
		position:{x:18.3444102,y:-64.9499517},
		title:"St.Thomas"
	},
	{
		position:{x:18.4210637,y:-64.6353173},
		title:"Tortola"
}];
google.maps.event.addDomListener(window, "load", initialize);

