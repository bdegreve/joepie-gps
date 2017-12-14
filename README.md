Joepie Reverse Geocache Application
===================================

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](./LICENSE)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-blue.svg)](http://standardjs.com/)

Demo
----

A live demo can be accessed at
[degraalridders.be/geo](https://www.degraalridders.be/geo/).

License
-------

ISC, see [LICENSE](./LICENSE) file.

Requirements
------------

-   Node.js (v8.x LTS recommended) and NPM (v5.x recommended). Various download
    options are available at [nodejs.org](https://nodejs.org/en/download/),
    including instructions using [package managers](https://nodejs.org/en/download/package-manager/).
    (NPM usually is included in the Node.js install)
-   Optional: `make`

How to configure
----------------

`app/waypoints.json` contains the gps route in JSON format. You can easily
configure your own route by modifying the `waypoints` array.

-   `accuracy` (in meters): minimum GPS accurracy required before the GPS
    locations is considered as valid. i.e. as long as the GPS error is greater
    than this value, it is assumed you don't have a position fix.
-   `tolerance` (in meters): tolerance of GPS position in respect to waypoint.
    i.e. if GPS position gets closer than this value to the current waypoint,
    it is assumed you have arrived.
-   `maxAge` (in seconds): maximum age of a GPS position. i.e. if last GPS
    reading is older than this amount of seconds, it is assumed you have lost
    signal and your position is no longer valid.
-   `waypoints`: array of waypoint coordinates for the route. Each waypoint has
    two values, defining its position in the 
    [WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System) coordiate
    system, a.k.a. regular GPS coordinates.
    -   `latitude` (in decimal degrees)
    -   `longitude` (in decimal degrees)


How to build
------------

### With `make`

1.  Running a development server:
    -   `make run`
    -   Open a browser and go to [http://localhost:8080](http://localhost:8080).
3.  Building a production version:
    -   `make`
    -   The production files will be in the `dist` folder. Copy them to your
        webserver.

### Without `make`

1.  Installing dependencies: 
    -   `npm install`
2.  Running a development server:
    -   `npm start`
    -   Open a browser and go to [http://localhost:8080](http://localhost:8080).
3.  Building a production version:
    -   `npm run build`
    -   The production files will be in the `dist` folder. Copy them to your
        webserver.

