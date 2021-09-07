import pandas as pd 
import json

# Load JSON to dataframe
df = pd.read_json('~/Downloads/long.json')

# Drop NAN values since they are errorous
df = df.dropna()

# Drop unused values
df = df.drop([
    'MMSI',
    'COG',
    'A',
    'B',
    'C',
    'D',
    'HEADING',
    'NAVSTAT',
    'ROT',
    'DRAUGHT',
    'CALLSIGN'
], 1)

# Make correction with types
df['ETA']= pd.to_datetime(df['ETA'])
df['TIME']= pd.to_datetime(df['TIME'])


# UNCOMMENT THIS PART AND GENERATE CSV FILE
#df.to_csv('ais.csv', encoding='utf-8', index=False)

# UNCOMMENT THIS PART AND RUN ON BASH, THEN DATA WILL BE UPLOADED TO DATABASE
# !!!! DONT FORGET TO ADD CREDENTIALS
#mongoimport --uri mongodb+srv://<username>:<pass>@cluster0.bfcxb.mongodb.net/<database> --collection searches --type CSV --file ais.csv --fields "TIME","LONGITUDE","LATITUDE","SOG","IMO","NAME","TYPE","DEST","ETA"

