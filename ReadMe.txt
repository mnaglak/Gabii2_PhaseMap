Map Name: Gabii2_Phase Map
Author: Matthew Naglak

This interactive Leaflet map allows the reader to examine the spatial data
for the various stratigraphic units (SUs) discussed in the Gabii Volume 2 text.

It was built using Leaflet 1.5.1 with various plugins for extending features.

Plugin List
	Leaflet.PanControl to allow the reader to pan and zoom (https://github.com/kartena/Leaflet.Pancontrol)
	Leaflet-Ajax to import JSON files into the map (https://github.com/calvinmetcalf/leaflet-ajax).
	Leaflet-ruler to allow the reader to take basic measurements (https://github.com/gokertanrisever/leaflet-ruler).
	Leaflet-search to allow the reader to perform searches by SU number (https://github.com/stefanocudini/leaflet-search).

Other functionality includes the ability to click on a stratigraphic unit to gain more information about it, as well as link
out to the database which accompanies Gabii Vol 2.
	
Data for the map are located in GEOJSON files organized by phase. This data was 
collected during the 2008-2010 field seasons in a regional projection 
(Monte Mario Rome Italy Zone 2) and transformed to WGS84 to import to Leaflet.

Airphoto tiles from 2009 and 2010 are also included in the package. 