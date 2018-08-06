import json
import osbinding3 as osb
import plot_graph as pg
from pymongo import MongoClient

# def ConnectToDB():
#     MONGODB_HOST = 'localhost'
#     MONGODB_PORT = 27017
#     DBS_NAME = 'OneSphereDB'
#     connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
#     db = connection.test
#     print("database test", db)
#     return db

# def BuildDBCollection(db, data, collection_name):
#     collection_data = json.loads(data)
#     recvData = collection_data['members']
#     db.createCollection(collection_name, recvData)

def start():
    # osinst = osb.OSClient('https://onesphere-host-url', 'username', 'password')

    osinst = osb.OSClient('http://localhost:8114', 'admin', 'test')

    # print("GetStatus: " + json.dumps(osinst.GetStatus()))
    # print("GetConnectApp: " + json.dumps(osinst.GetConnectApp("windows")))
    # print("GetSession: " + json.dumps(osinst.GetSession()))
    # print("GetAccount: " + json.dumps(osinst.GetAccount()))
    # print("GetProviderTypes: " + json.dumps(osinst.GetProviderTypes()))
    # print("GetZoneTypes: " + json.dumps(osinst.GetZoneTypes()))
    # print("GetServiceTypes: " + json.dumps(osinst.GetServiceTypes()))
    # print("GetRoles: " + json.dumps(osinst.GetRoles()))
    # print("GetUsers: " + json.dumps(osinst.GetUsers()))
    # print("GetTagKeys: " + json.dumps(osinst.GetTagKeys()))
    # print("GetTags: " + json.dumps(osinst.GetTags()))

    print("Get Providers: " + json.dumps(osinst.GetProviders()))
    # provider_st = json.dumps(osinst.GetProviders())
    # providers = json.loads(provider_st)
    # provider_id = providers['members'][0]['id']
    # region_id = providers['members'][0]['regions'][0]['id']
    # zone_id = providers['members'][0]['regions'][0]['zones'][0]['id']
    #
    # print("provider id" + provider_id)
    # print("region_id" + region_id)
    # print("zone_id" + zone_id)
    #
    # graph = [(provider_id, region_id), (region_id, zone_id), ('service_id', 'deployment_id' ),('deployment_id', zone_id), ('deployment_id', 'project_id'), ('deployment_id', 'project_id') ]
    #
    # pg.draw_graph(graph)

    # print("Get Deployments: " + json.dumps(osinst.GetDeployments()))
    # print(" Get Zones:" + json.dumps(osinst.GetZones()))
    # print(" Get Projects:" + json.dumps(osinst.GetProjects()))
    # print( " Get regions:" + json.dumps(osinst.GetRegions()))
    # print( " Get services:" + json.dumps(osinst.GetServices()))
    # print( " Get users:" + json.dumps(osinst.GetUsers()))
    #db = ConnectToDB()

    #connect to database
    MONGODB_HOST = 'localhost'
    MONGODB_PORT = 27017
    DBS_NAME = 'onespheredb'
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    db = connection.onespheredb
    db = connection.get_database(name=DBS_NAME)
    print("database oneshphere", db)

    #################################################
    ####   building collection   ####################
    #################################################


    # #build providers collection, commenting below lines to avoid duplicate data
    # provider_st = json.dumps(osinst.GetProviders())
    # collection_data = json.loads(provider_st)
    # provider_st = collection_data['members']
    # #creates collection by name providers
    # collect = db.providers
    # db.providers.insert(provider_st)
    #
    # #build deployments collection, commenting below lines to avoid duplicate data
    # deploy_st = json.dumps(osinst.GetDeployments())
    # collection_deploy = json.loads(deploy_st)
    # deploy_st = collection_deploy['members']
    # #creates collection by name deployments
    # collect = db.deployments
    # db.deployments.insert(deploy_st)
    #
    # #build zones collection, commenting below lines to avoid duplicate data
    # zones_st = json.dumps(osinst.GetZones())
    # collection_zones = json.loads(zones_st)
    # zones_st = collection_zones['members']
    # #creates collection by name zones
    # collect = db.zones
    # db.zones.insert(zones_st)
    #
    # #build projects collection, commenting below lines to avoid duplicate data
    # projects_st = json.dumps(osinst.GetProjects())
    # collection_projects = json.loads(projects_st)
    # projects_st = collection_projects['members']
    # #creates collection by name projects
    # collect = db.projects
    # db.projects.insert(projects_st)
    #
    # #build regions collection, commenting below lines to avoid duplicate data
    # regions_st = json.dumps(osinst.GetRegions())
    # collection_regions = json.loads(regions_st)
    # regions_st = collection_regions['members']
    # #creates collection by name regions
    # collect = db.regions
    # db.regions.insert(regions_st)
    #
    # #build services collection, commenting below lines to avoid duplicate data
    # services_st = json.dumps(osinst.GetServices())
    # collection_services = json.loads(services_st)
    # services_st = collection_services['members']
    # #creates collection by name services
    # collect = db.services
    # db.services.insert(services_st)
    #
    # #build users collection, commenting below lines to avoid duplicate data
    # users_st = json.dumps(osinst.GetUsers())
    # collection_users = json.loads(users_st)
    # users_st = collection_users['members']
    # #creates collection by name users
    # collect = db.users
    # db.users.insert(users_st)

    ###################################################################
    ##########   Get collected data ###################################
    ###################################################################

    # get collection data
    print("printing projects")
    collection = connection[DBS_NAME]['providers']
    projects = collection.find()
    #print(collection.count)
    for project in projects:
        print(project)


    del osinst

if __name__=='__main__': start()