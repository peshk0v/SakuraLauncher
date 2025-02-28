let settingsOpenned = false;


window.onresize = function () {
    window.resizeTo(1000, 600);
}

function addServer(name, version, icon, index, notify=true) {
    const serverList = document.querySelector('.server-list');
    
    const serverItem = document.createElement('button');
    serverItem.className = 'server-item';
    serverItem.onclick = function() {
        console.log(index);
    };
    serverItem.innerHTML = `
        <img src="${icon}" class="server-icon">
        <div class="server-info">
            <span class="server-name">${name}</span>
            <span class="server-version">${version}</span>
        </div>
    `;

    if (notify == true) {
        showNotification('Сервер успешно добавлен!', 5000);
    }
    serverList.appendChild(serverItem);
}

eel.expose(addProfile);
function addProfile(name, index) {
    const profList = document.getElementById('profilesSel');
    profList.innerHTML += `<option value="${index}" onselect="chooseProfile(${index})">${name}</option>`;
}

// function chooseProfile(e) {
//     const profiles = eel.getProfiles();
//     const avatar = document.getElementById('profileAvatar');

//     avatar.src = profiles["profiles"][index.value][1];
//     console.log(e.target.value);
//     if (e.target.value == "add-profile") {
//         eel.manageProfiles();
//     } else {
//         eel.setCurProfile(profilesSel.value);
//     }
// }

eel.expose(setCurProfile);
function setCurProfile(index) {
    const profList = document.getElementById('profilesSel');
    profList.value = index  
}

eel.expose(addServers);
function addServers(servers) {
    for (let i = 0; i < servers.length; i++) {
        addServer(servers[i][0], servers[i][2], `http://localhost:8000/img/servers/${servers[i][3]}`, 0, false);
    }
}

function settingsOpn() {
    if(settingsOpenned == false){
        document.getElementById("settdv").style.display = "block";
        document.getElementById("sttbtn").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
        settingsOpenned = true;
    } else {
        document.getElementById("settdv").style.display = "none";
        document.getElementById("sttbtn").style.backgroundColor = "rgba(255, 255, 255, 0.15)";
        settingsOpenned = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Функция переключения вкладок
    function switchTab(event) {
        // Удаляем активный класс у всех кнопок и контента
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Активируем выбранную вкладку
        event.target.classList.add('active');
        const tabId = event.target.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    // Назначаем обработчики клика
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    // Активируем первую вкладку при загрузке
    document.querySelector('.tab-btn[data-tab="news"]').click();
});

eel.expose(addBuild);
function addBuild(name, version, icon, index) {
    const buildsList = document.querySelector('.builds-list');
    const instancesSelect = document.getElementById('instances');
    
    const buildItem = document.createElement('div');
    buildItem.className = 'build-item';
    buildItem.onclick = function() {console.log(index)};
    buildItem.innerHTML = `
        <img src="${icon}" class="build-icon">
        <div class="build-info">
            <span class="build-name">${name}</span>
            <span class="build-version">${version}</span>
        </div>
        <button class="button build-launch-btn" onClick="startBuild(${index})">▶ Запуск</button>
    `;
    
    instancesSelect.innerHTML += `<option value="${index}">${name}</option>`;
    buildsList.insertBefore(buildItem, document.querySelector('.create-build-btn'));
}

