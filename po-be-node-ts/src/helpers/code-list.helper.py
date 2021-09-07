import pymongo
from pymongo import MongoClient
import pandas as pd 
import json

client = pymongo.MongoClient("<ADD_CONNECTION_URI_BEFORE_RUN>")
db = client["OceanDB"]
ports = client["ports"]

# Get data into dataframe
df = pd.read_csv("<PATH_TO_FILE>/code-list_csv.csv", usecols = ['Country','Location', 'Name', 'Function', 'Coordinates']) 

# Drop NAN values since they are errorous
df = df.dropna()

#Function name has -, so remove them
df['Function'] = df['Function'].str.replace('-', '')

#To get only ports from requirements
df = df[(df['Function'].str.startswith('1'))]

# Add new fields
df[['Latitude','Longitude']] = df.Coordinates.str.split(" ",expand=True,)

# Coordinates are DDM format we need to convert them to DD format
def ddmToddLongitude(somestring):
    degree = somestring[:3]
    minutes = somestring[3:-1]
    direction = somestring[-1]
    multiply = 1
    if(direction == 'W'):
        multiply = -1
    longitude = (int(degree) + (int(minutes)/60.)) * multiply
    return longitude

def ddmToddLatitude(somestring):
    degree = somestring[:2]
    minutes = somestring[2:-1]
    direction = somestring[-1]
    multiply = 1
    if(direction == 'S'):
        multiply = -1
    longitude = (int(degree) + (int(minutes)/60.)) * multiply
    return longitude

df['Latitude'] = df.apply(lambda row: ddmToddLatitude(row['Latitude']), axis=1)
df['Longitude'] = df.apply(lambda row: ddmToddLongitude(row['Longitude']), axis=1)

# We dont need Coordinates after adding Longitute and Latitude
df = df.drop('Coordinates', 1)

df['UNLOCODE'] = df[['Country', 'Location']].agg('-'.join, axis=1)

# UNCOMMENT THIS PART AND GENERATE CSV FILE
#df.to_csv('ports.csv', encoding='utf-8', index=False)

# UNCOMMENT THIS PART AND RUN ON BASH, THEN DATA WILL BE UPLOADED TO DATABASE
# !!!! DONT FORGET TO ADD CREDENTIALS
#mongoimport --uri mongodb+srv://<username>:<pass>@cluster0.bfcxb.mongodb.net/<database> --collection ports --type CSV --file ports.csv --fields "Country","Location","Name","Function","Latitude","Longitude","UNLOCODE"

