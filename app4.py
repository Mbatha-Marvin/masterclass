from flask import Flask, render_template, make_response
from flask_restful import Api, Resource
import sqlite3
import os
import webbrowser
import pandas as pd
import requests
from waitress import serve

app = Flask(__name__, template_folder='templates')
api = Api(app)

class Add(Resource):
    def get(self):
        #fetched data of each year
        fetched_2020_Data = requests.get("https://datausa.io/api/data?drilldowns=State&measures=Population&year=2020").json()
        fetched_2019_Data = requests.get("https://datausa.io/api/data?drilldowns=State&measures=Population&year=2019").json()
        fetched_2018_Data = requests.get("https://datausa.io/api/data?drilldowns=State&measures=Population&year=2018").json()
        
        data_2020 = fetched_2020_Data['data']
        data_2019 = fetched_2019_Data['data']
        data_2018 = fetched_2018_Data['data']

        stateList = []
        for i in range(0, len(data_2020)):
            stateList.append(data_2020[i]["State"])

        #print(len(stateList))

        list_2020 = []
        for i in range(0, len(data_2020)):
            list_2020.append(data_2020[i]["Population"])
        #print("...............list 2020 ................")
        #print(len(list_2020))


        list_2019 = []
        for i in range(0, len(data_2019)):
            list_2019.append(data_2019[i]["Population"])
        #print("...............list 2019 ................")
        #print(len(list_2019))


        list_2018 = []
        for i in range(0, len(data_2018)):
            list_2018.append(data_2018[i]["Population"])
        #print("...............list 2018 ................")
        #print(len(list_2018))

        #preparing data for database population
        tupleList = list(zip(stateList, list_2018, list_2019, list_2020))
        # res = tupleList[-1]


        """Creation of SQLite3 database """
        if (os.path.isfile("mbathamarvin.db")):
            connection = sqlite3.connect("mbathamarvin.db")
            cursor = connection.cursor()
            print("Database already exists .........")
        else:
            connection = sqlite3.connect("mbathamarvin.db")
            cursor = connection.cursor()
            cursor.execute("""create table masterclass ( State text, year_2018 text, year_2019 text, year_2020 text)""")
            connection.commit()
            print("Successfully created the database and table")

        cursor.executemany("insert into masterclass values (?,?,?,?)", tupleList)

        #quering the database and storing response in a pandas dataframe
        query_df = pd.read_sql_query("select * from masterclass", connection)

        connection.close()

        #creating the html file, and templates directory saving it to the curent directory and displaying content in the default browser
        dirName = 'templates'
        try:
            # Create target Directory
            os.mkdir(dirName)
            print("Directory " , dirName ,  " Created ") 
        except FileExistsError:
            print("Directory " , dirName ,  " already exists")
        query_df.to_html("./templates/Table.html")

        if (os.path.isfile("Table.html")):
            query_df.to_html("Table.html")
            print("Table.html created successfuly")
            filename = 'file:///'+os.getcwd()+'/' + 'Table.html'
            #webbrowser.open_new_tab(filename)
            return make_response(render_template("Table.html"))
        else:
            filename = 'file:///'+os.getcwd()+'/' + 'Table.html'
            #webbrowser.open_new_tab(filename)
            return make_response(render_template("Table.html")) 

        # retJson = {
        #     "State": res[0],
        #     "2018": res[1],
        #     "2019": res[2],
        #     "2020": res[3]
        # }

        

        

api.add_resource(Add, '/')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8080)