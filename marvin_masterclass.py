import webbrowser
import os
import requests
import sqlite3
import sys
import subprocess

# implement pip as a subprocess to install pandas and requests package if it is not present in the host system
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pandas'])
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests'])
import pandas as pd
pd.set_option("display.max_rows", None,'display.width', None)

print("Fetching data.............. This will take some time(less than a minute) kindly wait...............")
data = requests.get('https://www.datim.org/api/sqlViews/fgUtV6e9YIX/data.json').json()
print("Data fetched successfully....................")

#Extracting the column labels into a list of tuple
gridList = data['listGrid']['headers']
dataColumns = []

for i in range(0,len(gridList)):
    dataColumns.append(gridList[i]['column'])

columnTuple = tuple(dataColumns)


#Extracting the rows data into an array of tuples
dataRows = data['listGrid']['rows']
rowTuple = []

 
for row in range(0,len(dataRows)):
    rowTuple.append(tuple(dataRows[row])) 


"""Creation of SQLite3 database """
if (os.path.isfile("mbathamarvin.db")):
    connection = sqlite3.connect("mbathamarvin.db")
    cursor = connection.cursor()
else:
    connection = sqlite3.connect("mbathamarvin.db")
    cursor = connection.cursor()
    cursor.execute("""create table masterclass ( mechanism text, code text,uid text,
    partner text, primeid text, agency text, ou text,startdate text,enddate text)""")
    connection.commit()

cursor.executemany("insert into masterclass values (?,?,?,?,?,?,?,?,?)", rowTuple )

#quering the database and storing response in a pandas dataframe
query_df = pd.read_sql_query("select * from masterclass", connection)

connection.close()

#creating the html file, saving it to the curent directory and displaying content in the default browser
query_df.to_html("Table.html")

if (os.path.isfile("Table.html")):
    query_df.to_html("Table.html")
    print("Table.html created successfuly")
    filename = 'file:///'+os.getcwd()+'/' + 'Table.html'
    webbrowser.open_new_tab(filename)
else:
    filename = 'file:///'+os.getcwd()+'/' + 'Table.html'
    webbrowser.open_new_tab(filename)
