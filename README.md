# react-google-map-vehicle-tracking [![Netlify Status](https://api.netlify.com/api/v1/badges/644fd02e-5d2c-45a4-8b0b-7ac931d36664/deploy-status)](https://app.netlify.com/sites/react-google-map-vehicle-live-tracking/deploys)
## Demo Link: https://react-google-map-vehicle-live-tracking.netlify.app/

#

Created a Single page application in ReactJS which uses the provided data from mock API which display a live tracking of a vehicle. Rendered Map have below things:

- A Path ( polyline) - based on the path data provided in API-1
- Stops ( Markers ) - based on the stops data provided in API-2
- A Live Vehicle Tracker - Simulation which moves the vehicle very two seconds on the displayed path ( polyline )
- Start Simulation Button - Which starts the simulation


#### API-1 : `https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/path`
#### API-2 : `https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/stops`

#

![GMap-Simulator](https://user-images.githubusercontent.com/1678725/149657446-39f3f0f9-364c-4a16-b339-f3921172ef32.gif)


#
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#

