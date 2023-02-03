# Project Name : CalvinUw-Covid19-Mapping
## Calvin Standaert

## Introduction:

This project was created as part of the winter-2023 GEOG458 Advanced digital geographies class at the University of Washington, Seattle.

This project contains two separate web maps made using 2020 data adapted by Steven Bao from the New York Times Covid-19 data tracking project. The maps each depict a different measure of 2020 covid-19 data overlaid on top of an underlying map of the contiguous United States. As the maps contain only information about the mainland US states, both maps are confined to the mainland US and its surrounding regions. Finally, the two maps utilize an Albers conical projection.

The first map contained in this project is a choropleth wherein the rate of covid-19 infection for a given US county’s population in 2020 is represented with a gradient of colors. The colors range from light yellow to dark red and represent the severity of a county’s 2020 covid-19 infection rate, with smaller infection rates being colored light yellow and larger infection rates being colored darker red. Aside from the color alone, the rate of a county is also provided in a box in the top right corner of the map, which indicates the covid-19 rate and state/county name for the county that the mouse is currently hovering over. The map additionally includes a legend that shows the numeric values and colors associated with each rate category and a description box that provides the background information on the map when clicked. 

The second in this project is a proportional symbol map, where the count of 2020 Covid-19 cases are depicted using differently colored and sized circles. More specifically, the circles used in the map represent the number of covid-19 cases counted in a given state, and increase in size and darkness with greater numbers of cases. At the bottom left corner of the map, a legend is provided which shows example case counts and their corresponding circles. Additionally, the map also allows for users to identify the case count indicated by a given symbol through a pop-up information box that appears when a symbol is clicked on.

Data Source:


Credit:

Steve Griffin - Two pages one script https://www.youtube.com/watch?v=7_kaX07tVFc&ab_channel=SteveGriffith-Prof3ssorSt3v3 
This page provided me information on how to combine the javascript code of two different webpages into a single file, and access a given page’s javascript code depending on the body id of the page.

W3 school - https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp 
This page provided me with example code on how to create a information box that appears/disappears when a button is clicked on.

I would like to thank my Professor Bo Zhao for providing the framework for creating both maps, and I would also like to thank my TA Steven Bao for his help in gathering the data.
