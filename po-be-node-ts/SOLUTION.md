# PROJECT OCEAN - BE - Solution

In this document I will explain somethings more detailed item by item
- Choosing MongoDB Atlas: Not losing time with configuring database on local and advantage of not using `flyway` or migration files just giving database ready to anyone.

- Structure: I choose similar to MVC architecture because I think its more readable while evaluating the code since its an interview question (▀̿Ĺ̯▀̿ ̿)

- Problems: I decided to leave some problem solutions since they require more research and implementation to avoid time-sink because its an interview and we can discuss possible solutions during the interview. I made some research regarding to the problems and include some proposals inside `README.md` files of projects

- Database Queries: In the requirements its stated that some algorithms need to be implemented, I tried to implement them on `repository` to not load server more

- About the algorithms (I will include method names inside both repository and service to give you more clear idea): 
1. `createAISData`: When I search the bulk insert to upload the file into database, I saw lots of advices are inserting the records one by one that's why I use this way, I don't know the reason but it can be good discussion point on the interview session. My guess is keeping consistency, i.e handling insertion errors more easily when inserting one by one

2. `deleteAllAISData`: I think new AIS data should overwrite the old one because same vessel can exists in both and it cause losing having consistent data.

3. `findAISDataByFilters`: 
    a. When user clicks `include idle vessels` checkbox, I need to search for `DEST=""` also, so I found a way implementing this that's why I put `exludeParameter` parameter.
    b. For searching with wrong, I saw that location is exists one way or another in most cases, so I decided to make 2nd search with regex search on fail of 1st search.

4. `getAllPortsUNLOCODE`: I store `UNLOCODE` also to show user more detailed port data on dropdown.

5. `getCoordinatesByDest`: Since click on vessels should show the way, I need to know the coordinates of selected port, right? ¯\\_(ツ)_/¯

6. `findAISDataByFilters`: User select port with `Country`, `Location` and `Name` data, but I need to search by each of them in necessary places, so I took them merged in request and split them inside. And also search needs to return 2 data, 1 for selected port(coordinates) and 1 for vessels heading to selected port.

7. `calculateDistanceBetweenCoordinates`: In the requirements, I need to handle the distance search also, but couldn't manage it. Algorithm part is exist on code base inside `search.service.ts`. I tried to use it but type errors wouldnt let me. Since I am going to submit this project in 1 hour, I am leaving it out as future work for me : The reason of the problem is I didnt keep the consistency on types (ಥ﹏ಥ)

- Renaming of the files: I put prefix to the files, to be able to distinguish in the future works (in tests maybe)

- Environment Variables: At first, I put MongoDB credentials inside `database.config` file for easiness, but after that I put them inside `.env` file which actually needs be implemented at first, since my commit history is visible, I changed the credentials and removed the old one. (⌐■_■)

- Future Work: I put `What can be improved` section because I really liked the project and spend time to think about what can be done better and further (ง'̀-'́)ง