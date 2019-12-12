
//Define map start up options, here defined to center on Gabii
		var mapOptions = {
			center: [ 41.887856934, 12.719429433], //set center
			zoom: 20 , //set initial zoom
			maxZoom : 27,  //set max zoom
			minZoom : 10,
			measureControl: true //for measuring purposes
			}
		
//Creates Map according to map options 
		var map = new L.map('map', mapOptions); 
		
		
//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);
			
		
//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available) 
			var airPhoto2009 = L.tileLayer('./2009AirPhoto/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24}).addTo(map);
			var airPhoto2010 = L.tileLayer('./2010AirPhoto/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24});
				airPhoto2010.addTo(map);
//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
		
		
		var webAddress = "https://gabii.cast.uark.edu/data/browse/stratigraphic_units/"
//Specialized Function to allow for popup box containing attributes of Gabii .geojson
			function popUp(f,l){
				var out = [];
				if (f.properties){
					
					var layerType = "";
					if (f.properties.DESCRIPTIO=="TOP") {
					layerType = "Cut";}
					else if (f.properties.DESCRIPTIO=="RD") {
					layerType = "Road"; }
					else if (f.properties.DESCRIPTIO=="FL") {
					layerType = "Floor"; }
					else if (f.properties.DESCRIPTIO=="WL") {
					layerType = "Wall"; }
					else if (f.properties.DESCRIPTIO=="WM") {
					layerType = "Water Feature"; }
					else if (f.properties.DESCRIPTIO=="FEAT") {
					layerType = "Feature"; }
					else if (f.properties.DESCRIPTIO=="TH") {
					layerType = "Threshhold"; }
					else if (f.properties.DESCRIPTIO=="FD") {
					layerType = "Foundation"; }
					else if (f.properties.DESCRIPTIO=="GV") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="GL") {
					layerType = "Grave Lining"; }
					else if (f.properties.DESCRIPTIO=="N-S TOMB") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="E-W TOMB") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="FP") {
					layerType = "Floor Preparation"; }
					else if (f.properties.DESCRIPTIO=="PV") {
					layerType = "Pavement"; }
					else if (f.properties.DESCRIPTIO=="OT") {
					layerType = "Other"; }
					else if (f.properties.DESCRIPTIO=="INT") {
					layerType = "Feature"; }
					else if (f.properties.DESCRIPTIO=="DEP") {
					layerType = "Deposit"; }
					else if (f.properties.DESCRIPTIO=="FILL") {
					layerType = "Fill of Cut"; }
					else if (f.properties.DESCRIPTIO=="BOT") {
					layerType = "Cut"; }
					else if (f.properties.DESCRIPTIO=="STEP") {
					layerType = "Stairs"; }
					else if (f.properties.DESCRIPTIO=="deposit") {
					layerType = "Deposit"; }
					else if (f.properties.DESCRIPTIO=="WF") {
					layerType = "Wall Facing"; }
					else if (f.properties.DESCRIPTIO=="AR") {
					layerType = "Feature"; }
					else if (f.properties.SU == 622) {
					layerType = "Quarry"; }
					
					
					
					out.push("SU: " +f.properties.SU);
					//out.push("Type: " + f.properties.DESCRIPTIO);
					out.push("Type: " + layerType);
					out.push("Phase: " + f.properties.Phase);
					out.push("Total Area (m): " + f.properties.SHAPE_Area);
					out.push("Tomb Number (if available): " +f.properties.tomb_ID);
					out.push("Notes: " +f.properties.notes);
					out.push('<a href="'+ webAddress + f.properties.SU + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
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
	function swapStyle (feature) {
		switch (feature.properties.Phase) {
			case 'A0a' : return {color: "#000000", fillColor: "#ff1500",weight: 2,opacity: 0.5};
			case 'A0b' : return {color: "#000000",fillColor: "#04ff00",weight: 2,opacity: 0.5};
			case 'A1'  : return {color: "#000000",fillColor: "#0008ff",weight: 2,opacity: 0.5};
			case 'A1'  : return {color: "#000000",fillColor: "#0008ff",weight: 2,opacity: 0.5};
			case 'B1a' : return {color: "#000000",fillColor: "#ff4500",weight: 2,opacity: 0.5};
			case 'A2'  : return {color: "#000000",fillColor: "#ff00fa",weight: 2,opacity: 0.5};
			case 'A3'  : return {color: "#000000",fillColor: "#ff4500",weight: 2,opacity: 0.5};
			case 'B3'  : return {color: "#000000",fillColor: "#ff4500",weight: 2,opacity: 0.5};
			case 'A4'  : return {color: "#000000",fillColor: "#FFFFFF",weight: 2,opacity: 0.5};
			case 'A4a' : return {color: "#000000",fillColor: "#FFFFFF",weight: 2,opacity: 0.5};
			case 'B4a' : return {color: "#000000",fillColor: "#FFFFFF",weight: 2,opacity: 0.5};
			case 'A4b' : return {color: "#000000",fillColor: "#ccff00",weight: 2,opacity: 0.5};
			case 'B4b' : return {color: "#000000",fillColor: "#ccff00",weight: 2,opacity: 0.5};
			case 'A4c' : return {color: "#000000",fillColor: "#00ffe9",weight: 2,opacity: 0.5};
			case 'B4c' : return {color: "#000000",fillColor: "#00ffe9",weight: 2,opacity: 0.5};

		}
	}
			
				
//Import of locally hosted geoJSON files with popUp box showing attributes and designated line style, uses AJAX plug in 
		var phase0a = new L.GeoJSON.AJAX("Phase0a.geojson", 
			{style:swapStyle,onEachFeature:popUp}).addTo(map);
			
			phase0a.on('click',function (e) {
			e.layer.setStyle({fillColor: '#B22222', color: '#ff0000'});
			});    
			
			phase0a.on('popupclose', function(e){
			phase0a.setStyle(swapStyle);
		});
			
			
		var phase0b = new L.GeoJSON.AJAX("Phase0b.geojson", 
			{style:swapStyle,onEachFeature:popUp}).addTo(map);     
			phase0b.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			}); 

			phase0b.on('popupclose', function(e){
			phase0b.setStyle(swapStyle);
		});
			
		var phase1 = new L.GeoJSON.AJAX("Phase1.geojson", 
			{style:swapStyle,onEachFeature:popUp}) 
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			}); 
			
			phase1.on('popupclose', function(e){
			phase1.setStyle(swapStyle);
		});
			
			
		var phase2 = new L.GeoJSON.AJAX("Phase2.geojson", 
			{style:swapStyle,onEachFeature:popUp})
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			});  

			phase2.on('popupclose', function(e){
			phase2.setStyle(swapStyle);
		});
			
		var phase3 = new L.GeoJSON.AJAX("Phase3.geojson", 
			{style:swapStyle,onEachFeature:popUp})
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			}); 

			phase3.on('popupclose', function(e){
			phase3.setStyle(swapStyle);
		});
   			
		var phase4a = new L.GeoJSON.AJAX("Phase4a.geojson", 
			{style:swapStyle,onEachFeature:popUp})
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			});   

			phase4a.on('popupclose', function(e){
			phase4a.setStyle(swapStyle);
			});
			
			
		var phase4b = new L.GeoJSON.AJAX("Phase4b.geojson", 
			{style:swapStyle,onEachFeature:popUp})
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			});       

			phase4b.on('popupclose', function(e){
			phase4b.setStyle(swapStyle);
			});			
			
			
		var phase4c = new L.GeoJSON.AJAX("Phase4c.geojson", 
			{style:swapStyle,onEachFeature:popUp})
			.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			});       
	
			phase4c.on('popupclose', function(e){
			phase4c.setStyle(swapStyle);
		});
		var quarry = new L.GeoJSON.AJAX("Phase4Quarry.geojson",
		{style:swapStyle,onEachFeature:popUp})
		.on('click',function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#000000'});
			});    

		quarry.on('popupclose', function(e){
			quarry.setStyle(swapStyle);
		});
		var phase4aWithQuarry = L.layerGroup([phase4a, quarry]).addTo(map);
		
		
		
		
	
		
		//Creation of Layering box for turning on and off basemaps, .geoJSON layers, and other underlays
		var baseLayers = {
			"Satellite Imagery" : Esri_WorldImagery,
			};
			
		var overlayMaps = {
			"Aerial Imagery 2009" : airPhoto2009,
			"Aerial Imagery 2010" : airPhoto2010,
			"Phase0a" : phase0a,
			"Phase0b" : phase0b,
			"Phase1" : phase1,
			"Phase2" : phase2,
			"Phase3" : phase3,
			"Phase4a" : phase4aWithQuarry,
			"Phase4b" : phase4b,
			"Phase4c" : phase4c
			};
			L.control.layers(baseLayers, overlayMaps).addTo(map);
		
		
		var allPhases = L.layerGroup([phase0a, phase0b, phase1, phase2, phase3, phase4aWithQuarry, phase4b, phase4c]);
		
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