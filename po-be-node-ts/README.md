# PROJECT OCEAN - BE

## Technologies Used
- `Typescript/NodeJS`, ExpressJS and MongoDB Atlas


## Project Structure
`./app.ts`: Has project configurations

`src/configs`: It has configurations (database connection configuration only for now)

`src/controllers`: Has endpoints' implementation (ideally controllers should have business logic but for this project I decided to have it inside `service/` and `repository/`)

`src/models`: Database models

`src/repository`: Database queries

`src/routes`: Routes to connect endpoints and controllers

`src/services`: Have part of business logic and call of repository, provides results to controllers

`src/types`: Have necessary interfaces for the project

## Collection Names
- `searches`: For AIS data, without some fields
- `ports`: `code-list_csv.csv` data that you provide with modifications

## Data Analysis
There are some `Python` files to upload the files provided to database, some filtering operations exists to drop unnecessary fields from the data. See files under `src/helpers`, files are commented for you to understand

## Problems & Proposals
#### Bad usage of Cors
Problem: I need to enable `cors` to get the request from FE properly, but defined with allowing anything from `localhost:5000`

My Proposal: It needs to be defined more explicitly

#### Request Payload Size
Problem: Same problem is mentioned inside `README.md` file FE project. Since request has all json records for uploading data inside the body and since the file has lots of rows, size limit is increased but still not enough.

My Proposal: Handling it by using multiparty or multer, also by implementing stream while `req & res`

#### Inconsistent Response Objects
Problem: FE and BE sides need to be agreed on data that are exchanged, but now they are assumed to agreed on.

My Proposal: Creating api blueprint files in BE side and based on this files, we need to generate data types and serialize/deserialize functions on FE side

#### Schema (Model) restrictions
Problem: Since project is kind of form based, we need to have some restrictions when we defined `Schema`

My Proposal: Analyze the data more and put some restrictions like `nullable: false` , `minLength` etc.

#### Handle Response Cases
Problem: In the project, I feel like some cases for return data is not handled on responses, I mean, more accurate and descriptive responses can be implemented to inform both FE side and user more.

My Proposal: With some use cases and testings, can reveal different results on the system, which can be handled with different responses.

## What Can Be Improved
1. Tests, while writing the project I test them by using `Postman` but these tests should be written and run frequently
2. All hardcoded strings can be stored in BE side, inorder to have I18N & L10N in the future
3. Requests and Responses can be implemented with streams (e.g we might needed to handle lots of records inside `req.body`)
4. This item is kinda question but since its somehow about processing the data, using `Python` in some places or even in all project might be good, for example to load the data to database I made some necessary modifications and used `pandas` on `Python`, you can check the codes inside this repository
## Specific Details
Please see other document