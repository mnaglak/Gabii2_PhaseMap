
//Define map start up options, here defined to center on Gabii
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 18 , //set initial zoom
			maxZoom : 24,  //set max zoom
			measureControl: true //for measuring purposes
			}
		
//Creates Map according to map options 
		var map = new L.map('map', mapOptions); 
		
		
//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);
			
		
//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available) 
			var airPhoto2017 = L.tileLayer('./2017AirPhoto/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 25});
			var airPhoto2009 = L.tileLayer('./2009AirPhoto/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 25});
			var airPhoto2010 = L.tileLayer('./2010AirPhoto_highres/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24});
				airPhoto2010.addTo(map);
//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});

/*Placement of manually georeferenced single locally hosted image underlay (no plug in needed, initially turned off)
			NOTE IMAGE BOUNDS ARE NOT EXACT PLACE BECAUSE I DIDNT WANT TO GO THROUGH THE EFFORT
			var imageUrl = 'Gabii2018_frankenphoto_official.jpg',
			imageBounds = [[41.887, 12.719], [41.89, 12.724]];
			var frankenPhoto = L.imageOverlay(imageUrl, imageBounds);
*/
		
//Specialized Function to allow for popup box containing attributes of Gabii .geojson
			function popUp(f,l){
				var out = [];
				if (f.properties){
					out.push("SU: " +f.properties.SU);
					out.push("Type: " + f.properties.Type);
					out.push("Phase: " + f.properties.Phase);
					out.push("Total Area (m): " + f.properties.Shape_Area);
					out.push("Tomb Number (if available): " +f.properties.tomb_ID);
					out.push("Notes: " +f.properties.notes);
					out.push('<a href="'+ f.properties.Database_Link + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
					l.bindPopup(out.join("<br />"));
				}
			
			/* generalized function popup box for any .geojson
					function popUp(f,l){
						var out = [];
				if (f.properties){
					for(key in f.properties){
						if (key == "Database_Link") {
						out.push('<a href="'+ f.properties[key] + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
						else {
						out.push(key+": "+f.properties[key]);
						}
					}
					l.bindPopup(out.join("<br />"));
					}
				}
			*/	
			
//Random Style definitions for individual .geoJson layers
		var myStyle0a = {
				"color": "#ff1500",
				"weight": 2,
				"opacity": 0.5};
		var myStyle0b = {
				"color": "#04ff00",
				"weight": 2,
				"opacity": 0.5};
		var myStyle1 = {
				"color": "#0008ff",
				"weight": 2,
				"opacity": 0.5};
		var myStyle2 = {
				"color": "#ff00fa",
				"weight": 2,
				"opacity": 0.5};
		var myStyle3 = {
				"color": "#ff7b00",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4a = {
				"color": "#ff00d4",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4b = {
				"color": "#ccff00",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4c = {
				"color": "#00ffe9",
				"weight": 2,
				"opacity": 0.5};
				
//Import of locally hosted geoJSON files with popUp box showing attributes and designated line style, uses AJAX plug in 
		var phaseA0a = new L.GeoJSON.AJAX("PhaseA0a_geojsonLocal.geojson", 
			{style:myStyle0a,onEachFeature:popUp});       
			phaseA0a.addTo(map);
		var phaseA0b = new L.GeoJSON.AJAX("PhaseA0b_geojsonLocal.geojson", 
			{style:myStyle0b,onEachFeature:popUp});       
			phaseA0b.addTo(map);
		var phaseA1 = new L.GeoJSON.AJAX("PhaseA1_geojsonLocal.geojson", 
			{style:myStyle1,onEachFeature:popUp});       
			phaseA1.addTo(map);	
		var phaseA2 = new L.GeoJSON.AJAX("PhaseA2_geojsonLocal.geojson", 
			{style:myStyle2,onEachFeature:popUp});       
			phaseA2.addTo(map);
		var phaseA3 = new L.GeoJSON.AJAX("PhaseA3_geojsonLocal.geojson", 
			{style:myStyle3,onEachFeature:popUp});       
			phaseA3.addTo(map);	
		var phaseA4a = new L.GeoJSON.AJAX("PhaseA4a_geojsonLocal.geojson", 
			{style:myStyle4a,onEachFeature:popUp});       
			phaseA4a.addTo(map);
		var phaseA4b = new L.GeoJSON.AJAX("PhaseA4b_geojsonLocal.geojson", 
			{style:myStyle4b,onEachFeature:popUp});       
			phaseA4b.addTo(map);
		var phaseA4c = new L.GeoJSON.AJAX("PhaseA4c_geojsonLocal.geojson", 
			{style:myStyle4c,onEachFeature:popUp});       
			phaseA4c.addTo(map);	

		var phaseB3 = new L.GeoJSON.AJAX("PhaseB3_geojsonLocal.geojson", 
			{style:myStyle3,onEachFeature:popUp});       
			phaseB3.addTo(map);	
		var phaseB4a = new L.GeoJSON.AJAX("PhaseB4a_geojsonLocal.geojson", 
			{style:myStyle4a,onEachFeature:popUp});       
			phaseB4a.addTo(map);
		var phaseB4b = new L.GeoJSON.AJAX("PhaseB4b_geojsonLocal.geojson", 
			{style:myStyle4b,onEachFeature:popUp});       
			phaseB4b.addTo(map);
		var phaseB4c = new L.GeoJSON.AJAX("PhaseB4c_geojsonLocal.geojson", 
			{style:myStyle4c,onEachFeature:popUp});       
			phaseB4c.addTo(map);	

		var quarry = new L.GeoJSON.AJAX("Phase4Quarry.geojson",
		{style:myStyle4c,onEachFeature:popUp});
			quarry.addTo(map);

		//merge A and B phases 3 and 4
		var phase3 = L.layerGroup([phaseA3, phaseB3]);
		var phase4a = L.layerGroup([phaseA4a, phaseB4a, quarry]);
		var phase4b = L.layerGroup([phaseA4b, phaseB4b, quarry]);
		var phase4c = L.layerGroup([phaseA4c, phaseB4c, quarry]);
		
		//Creation of Layering box for turning on and off basemaps, .geoJSON layers, and other underlays
		var baseLayers = {
			"Satellite Imagery" : Esri_WorldImagery,
			};
			
		var overlayMaps = {
			"Airphoto 2009" : airPhoto2009,
			"Airphoto 2010" : airPhoto2010,
			"Airphoto 2017" : airPhoto2017,
			"Phase0a" : phaseA0a,
			"Phase0b" : phaseA0b,
			"Phase1" : phaseA1,
			"Phase2" : phaseA2,
			"Phase3" : phase3,
			"Phase4a" : phase4a,
			"Phase4b" : phase4b,
			"Phase4c" : phase4c
			};
			L.control.layers(baseLayers, overlayMaps).addTo(map);
		
		
		var allPhases = L.layerGroup([phaseA0a, phaseA0b, phaseA1, phaseA2, phase3, phase4a, phase4b, phase4c]);
		
//Creation of pan/scale function like Fulcrum images have. Uses PanControl plugin  
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);
		L.control.ruler().addTo(map);

//create the search control, note that the text within the search box can be edited directly in the .js for the plugin
	var searchControl = new L.Control.Search({
		layer: allPhases,
		propertyName: 'SU',
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});
	
	searchControl.on('search:locationfound', function(e) {
		
		//console.log('search:locationfound', );

		//map.removeLayer(this._markerSearch)

		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		allPhases.eachLayer(function(layer) {	//restore feature color
			allPhases.resetStyle(layer);
		});	
	});
	
	map.addControl( searchControl );  //inizialize search control