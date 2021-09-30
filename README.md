# PROJECT OCEAN VESSEL TRACKER

This project is for tracking the tanker vessels with provided search parameters via map.

## Installation

1. Run `yarn` inside `po-fe-react-ts` and `po-be-node-ts` to install dependencies for frontend
2. Run `yarn dev` inside `po-be-node-ts` to start backend
3. Run `yarn start` inside `po-fe-react-ts` to start frontend
4. Add API_KEY for Mapbox and connection URI for MongoDB inside `.env` files

## How To Use?
Open `localhost:5000`, you will see form & empty map

1. You can search for:
- Destination port: For vessels that have destination to that port (from dropdown)
- Date ranges to get vessels that will arrive to destination port between selected dates (time pickers)
- Distance: Vessels that are far away between [1 - entered distance]
- Include Idle Vessels: To include vessels that are IDLE.

! - Search button will disabled until you enter all inputs correctly

! - You need to use mouse/trackpad to enter dates in time pickers to be able to send data to BE correctly (Just click and search for a date and click it ¯\\_(ツ)_/¯  )

After making successful search you will see the vessels inside the map, some of them might be in near locations so you can zoom in the map to see all vessels

You can click the any vessel (which are not IDLE) and see more information

2. On top you can click `Go To AIS JSON Upload` button

Here you can upload new AIS file (must be json file) and make search based on new data

! Ps. old AIS data will be removed after you upload new one, because of scalability and performance issues. ᕙ(⇀‸↼‶)ᕗ

3. Enjoy the system (ᵔᴥᵔ)

#### For technical details, see READMEs inside each project

## Contributing
(☞ﾟ∀ﾟ)☞

## License
[MIT](https://choosealicense.com/licenses/mit/)
