from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'onespheredb'
COLLECTION_NAME = ['deployments', 'zones', 'projects', 'services', 'providers', 'users']
#FIELDS = {'school_state': True, 'resource_type': True, 'poverty_level': True, 'date_posted': True, 'total_donations': True, '_id': False}

FIELDS = {'state': True, 'name': True, 'status': True, 'modified': True, 'cpuCount': True, '_id': False}
COMMON_FIELDS = {'name': True, 'id': True, 'zoneUri':True, 'serviceUri':True, 'projectUri':True, 'providerUri':True, 'projectUris':True, '_id': False}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/topologyview")
def donorschoose_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    topologyjson = {}
    for colName in COLLECTION_NAME:
        collection = connection[DBS_NAME][colName]
        projects = collection.find(projection=COMMON_FIELDS, limit=200)
        json_projects = []
        for project in projects:
            json_projects.append(project)
        topologyjson[colName] = json_projects
    connection.close()
    json_projects = json.dumps(topologyjson, default=json_util.default)
    print(json_projects)
    return json_projects

if __name__ == "__main__":
    app.run(host='localhost',port=5000,debug=True)