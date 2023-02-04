mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-102.01925114479658,
        40.62486050490667
    ], // starting position [lng, lat] Reverse from google maps
    zoom: 4, // starting zoom
    projection: 'albers',
});

const mapBoundaries = [
    [-120.2670849330604, 21.172524460032474], // Southwest coordinates
    [-58.38155752203549, 54.107634201936825] // Northeast coordinates
];

const grades = [1000, 5000, 15000, 30000, 50000, 70000],
    colors = ['#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'], //color brewer
    radii = [1.8, 3, 7, 12, 18, 22];

let page = document.body.id; //Find out if the page being accessed is map 1 or map 2

if (page == 'counts') {
    map.on('load', () => {
        map.addSource('covid19Data', {
            type: 'geojson',
            data: 'assets/us-covid-2020-counts.geojson'
        });

        map.addLayer({
            'id': 'covid-point',
            'type': 'circle',
            'source': 'covid19Data',
            'paint': {
                // increase the radii of the circle as mag value increases
                'circle-radius': {
                    'property': 'cases',
                    'stops': [
                        [grades[0], radii[0]],
                        [grades[1], radii[1]],
                        [grades[2], radii[2]],
                        [grades[3], radii[3]],
                        [grades[4], radii[4]],
                        [grades[5], radii[5]]
                    ]
                    //if earthquake mag larger than 6, radius is 20

                },
                // change the color of the circle as mag value increases
                'circle-color': {
                    'property': 'cases', // Look at this property
                    'stops': [ // intervals
                        [grades[0], colors[0]], //Lower bound
                        [grades[1], colors[1]], // if [] then []
                        [grades[2], colors[2]],
                        [grades[3], colors[3]],
                        [grades[4], colors[4]],
                        [grades[5], colors[5]]
                    ]
                },
                'circle-stroke-color': 'white', // circle edge
                'circle-stroke-width': 1.25, // circle edge
                'circle-opacity': 0.5
            }
        });

        // click on tree to view magnitude in a popup
        map.on('click', 'covid-point', (event) => {
            new mapboxgl.Popup()
                .setLngLat(event.features[0].geometry.coordinates)
                .setHTML(`<strong>State:</strong> ${event.features[0].properties.state} <br> <strong>County:</strong> ${event.features[0].properties.county} <br> <strong>Case Count:</strong> ${event.features[0].properties.cases}`)
                .addTo(map);
        });
    });
    // create legend object, it will anchor to the div element with the id legend.
    const legend = document.getElementById('legend');

    //set up legend grades and labels
    var labels = ['<h4>Covid-19 Case Count:</h4>'],
        vbreak;
    //iterate through grades and create a scaled circle and label for each
    for (var i = 0; i < grades.length; i++) {
        vbreak = grades[i];
        // you need to manually adjust the radius of each dot on the legend 
        // in order to make sure the legend can be properly referred to the dot on the map.
        dot_radius = 2.25 * radii[i];
        labels.push(
            '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' +
            dot_radius +
            'px; height: ' +
            dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 +
            'px;">' + vbreak +
            '</span></p>');
    }

    const source =
        '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NYT Covid-19 Data</a></p>';

    // combine all the html codes.
    legend.innerHTML = labels.join('') + source;

} else { //Rate map (map-2)code
    async function geojsonFetch() {
        let response = await fetch('./assets/us-covid-2020-rates.geojson');
        let covid_rate_data = await response.json();

        map.on('load', function loadingData() {
            map.addSource('covid_rate_data', {
                type: 'geojson',
                data: covid_rate_data
            });

            map.addLayer({
                'id': 'covid_rate_data-layer',
                'type': 'fill',
                'source': 'covid_rate_data',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'rates'],
                        '#fff7ec', // stop_output_0
                        10, // stop_input_0
                        '#fee8c8', // stop_output_1
                        20, // stop_input_1
                        '#fdd49e', // stop_output_2
                        50, // stop_input_2
                        '#fdbb84', // stop_output_3
                        70, // stop_input_3
                        '#fc8d59', // stop_output_4
                        90, // stop_input_4
                        '#ef6548', // stop_output_5
                        110, // stop_input_5
                        '#d7301f', // stop_output_6
                        150, // stop_input_6
                        '#7a0000'
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.65,
                }
            });
            const layers = [
                '0-9',
                '10-19',
                '20-49',
                '50-69',
                '70-89',
                '90-109',
                '110-149',
                '150+'
            ];
            const colors = [
                '#fff7ec',
                '#fee8c8',
                '#fdd49e',
                '#fdbb84',
                '#fc8d59',
                '#ef6548',
                '#d7301f',
                '#7a0000'
            ];

            const legend = document.getElementById('legend');
            legend.innerHTML = "<b>Covid-19 Case Rate:<br>(Cases Per 1,000 People)</b><br><br>";

            layers.forEach((layer, i) => {
                const color = colors[i];
                const item = document.createElement('div');
                const key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;

                const value = document.createElement('span');
                value.innerHTML = `${layer}`;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            });

            map.on('mousemove', ({
                point
            }) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['covid_rate_data-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.state}, ${state[0].properties.county} County</h3><p><strong><em>${state[0].properties.rates}</strong> Cases Per 1,000 People</em></p>` :
                    `<p>Hover over a county!</p>`;
            });
        });
    }

    geojsonFetch();

}
function myFunction() { // A simple function that shows map info when a button is clicked
    var x = document.getElementById("info");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
map.setMaxBounds(mapBoundaries); // set map boundaries
