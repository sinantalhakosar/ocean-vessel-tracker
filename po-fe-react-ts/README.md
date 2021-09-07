# PROJECT OCEAN - FE

## Technologies Used
1. `Typescript/ReactJS` with hooks
2. `Mapbox` (since `GoogleMaps` requires credit card info although its free [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅] )
3. `Material-UI`
4. `clsx` for styling to combine the classes

## Project Structure
`src/common-ui`: Dummy components little bit modified from MaterialUI and added handlers

`src/components`: Components created with combination of dummy components and MaterialUI components

`src/routes`: Components that will be rendered on routes (i.e subdirectory of urls)

`src/services`: To make the requests to BE and get response from BE

`src/utils`: Utilities for projects (e.g constants can be placed here i.e URL for BE placed here)

## Problems & Proposals
#### Dropdown data representation
Problem: In the `code-list_csv.csv` file there are huge number of records (i.e ports), in my design I load all of them to FE inside `useEffect` hook to have it after rendering is completed. Since there are lots of ports `Select` component cannot be able to render all of them at the same time

My Proposal: Search box or pagination can be implemented to show the data in small amounts (i.e show the necessary part of the data)

#### Date time picker date select issue
Problem: One can input by keyboard but keyboard input are not reflecting to the component and dates are passed as `null`

My Proposal: Handling it either by using different component other than `AutoComplete` or by handling events

#### Responsiveness of Map
Problem: Map should be centered, but when you zoom and click the vessel based on the vessel's position on the map it will zoom out to the right or left

My Proposal: Understand the MapBox more clear and use it (defined properties/options) in proper way

#### Uploaded data size
Problem: When any one tried to upload huge file, BE will throw `payload is huge` error.

My Proposal: In the project the uploaded records are sending inside the body of request, instead we need to use file directly either by using multiparty or something else, after getting the file in BE side, save it to database and remove the file \ (•◡•) /

## What Can Be Improved
1. Design obviously ¯\\_(ツ)_/¯
2. Tests, the purpose of the tests are keeping the project as it is, what I mean is for example when we add E2E and Integration tests we will able to keep the business rules so that other people will able to work on the project more securely (for example again, if there are no person inside the team who knows the domain, others can continue developing by passing E2E tests)
3. Load bar to the file upload
4. Adding block ui while loading the data to prevent user interaction and give more natural sense to user
4. Layout can be added to have components that need to be rendered in all routes for example Navigation bar (instead of having 2 buttons to route the pages), Footer and etc.

## Specific Details
Please see other document