import eel
import json
import os
import minecraft_launcher_lib as mll
import subprocess

config = json.load(open('config.json', "r"))
profiles = json.load(open(f'{config["path"]}profiles.json', "r"))
servers = json.load(open(f'{config["path"]}servers.json', "r"))
configurator = json.load(open(f'{config["path"]}configurator.json', "r"))

def addInstances():
    instances = os.listdir(f"{config['path']}instances")

    for i in range(len(instances)):
        bdata = json.load(open(f'{config["path"]}instances/{instances[i]}/buildInfo.json', "r"))
        eel.addBuild(bdata["Name"], f"{bdata['Version']} {bdata['ModLoader']}", bdata["Icon"], i)

def addUsersNames(profiles):
    for i in range(len(profiles)):
        eel.addProfile(profiles["profiles"][i][0], i)

if __name__ == '__main__':
    eel.init('web')

    if configurator["newUser"] == True:
        eel.showNotification("<h2>Приветствуём тебя пользователь!</h2>Мы - SakuraProject, создатели этого лаунчера!<br>Надеемся тебе понравиться использовать наш продукт!<br>Подробнее о нас ты можешь узнать перейдя на страницу информации", 30000)
        configurator["newUser"] = False
        json.dump(configurator, open(f'{config["path"]}configurator.json', "w"))

    eel.addServers(servers)
    addInstances()
    addUsersNames(json.load(open(f'{config["path"]}profiles.json', "r")))
    eel.setCurProfile(profiles["curIndex"], profiles["profiles"][int(profiles["curIndex"])][1])

    @eel.expose
    def addServerFromGui(name, adress, instance, resPack):
        # print(name, "|", adress, "|", instance, "|", resPack)
        icon = None
        resourcePack = None
        if resPack == 0:
            resourcePack = False
        elif resPack == 2:
            resourcePack = True

        insta = getInstances()[0][int(instance)]
        servers.append([name, adress, insta, icon, resourcePack])
        eel.addServer(name, insta, icon, len(servers))
        json.dump(servers, open(f'{config["path"]}servers.json', "w"))

    @eel.expose
    def getInstances():
        instances = os.listdir(f"{config['path']}instances")
        buildInforms = []
        for i in range(len(instances)):
            buildInforms.append(json.load(open(f'{config["path"]}instances/{instances[i]}/buildInfo.json', "r")))
        return [instances, buildInforms]

    @eel.expose
    def initBuild(index):
        ginstanc = getInstances()
        instanceFolder = f"{config['path']}instances/{ginstanc[1][index]['Name']}/"
        lsInstFold = os.listdir(instanceFolder)

        if "versions" in lsInstFold:
            pass
        else:
            mll.install.install_minecraft_version(versionid=ginstanc[1][index]['Version'], minecraft_directory=instanceFolder)
    
    @eel.expose
    def installVer(index):
        ginstanc = getInstances()
        instanceFolder = f"{config['path']}instances/{ginstanc[1][index]['Name']}/"

        if ginstanc[1][index]['ModLoader'] == "vanila":
            mll.install.install_minecraft_version(versionid=ginstanc[1][index]['Version'], minecraft_directory=instanceFolder)
        elif ginstanc[1][index]['ModLoader'] == "forge":
            mll.install.install_forge_version(versionid=ginstanc[1][index]['Version'], minecraft_directory=instanceFolder)
        elif ginstanc[1][index]['ModLoader'] == "fabric":
            mll.install.install_fabric_version(versionid=ginstanc[1][index]['Version'], minecraft_directory=instanceFolder)
        elif ginstanc[1][index]['ModLoader'] == "quilt":
            mll.install.install_quilt(versionid=ginstanc[1][index]['Version'], minecraft_directory=instanceFolder)
        else:
            return "Error"

    @eel.expose
    def getProfiles():
        return json.load(open(f'{config["path"]}profiles.json', "r"))
    
    @eel.expose
    def setCurProf(index):
        profiles["curIndex"] = index
        json.dump(profiles, open(f'{config["path"]}profiles.json', "w"))

    @eel.expose
    def manageProfiles():
        print("Soon...")

    eel.start('index.html', size=(600, 1000))