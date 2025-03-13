let settingsOpenned = false;


window.onresize = function () {
    window.resizeTo(1200, 800);
}

eel.expose(addServer);
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

function addServerGui(event) {
    const adSvForm = document.getElementById('addServerForm');
    event.preventDefault();

    console.log(adSvForm.elements[4].value);
    hideServerPopup();
    eel.addServerFromGui(adSvForm.elements[0].value, adSvForm.elements[1].value, adSvForm.elements[2].value, adSvForm.elements[3].value);
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
function setCurProfile(index, avatar) {
    const profList = document.getElementById('profilesSel');
    const avatarProf = document.getElementById('profileAvatar');
    avatarProf.src = avatar;
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
    const buildSelect = document.getElementById('buildSelect');
    
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
    buildSelect.innerHTML += `<option value="${index}">${name}</option>`;
}

function openInstanceManager() {
    location.href="http://localhost:8000/InstanceManager.html?mode=create";
}

eel.expose(loadNews);
async function loadNews() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/peshk0v/TG-chizn_razraba/refs/heads/main/dbForSLNEWS.json');
        const news = await response.json();
        const newsContainer = document.getElementById('news');
        newsContainer.innerHTML = '<h2>Новости Проекта</h2>';
        
        // Переворачиваем массив новостей, чтобы последние были первыми
        news.reverse().forEach((item, index) => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.style.animationDelay = `${index * 0.1}s`;
            let newsContent = `
                <h3>${item.title}</h3>
                <p>${item.text}</p>
                <span class="news-date">${item.date}</span>
            `;
            
            if (item.image) {
                newsContent += `<img src="${item.image}" class="news-image">`;
            }
            
            newsItem.innerHTML = newsContent;
            newsContainer.appendChild(newsItem);
            
            // Запускаем анимацию с небольшой задержкой
            setTimeout(() => {
                newsItem.classList.add('active');
            }, 50);
        });
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        showNotification('Ошибка при загрузке новостей', 5000);
    }
}

eel.expose(loadAbout);
async function loadAbout() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/peshk0v/TG-chizn_razraba/refs/heads/main/DbForSlAbout.json');
        const aboutUs = await response.json();
        const aboutUsContainer = document.getElementById('about');
        aboutUsContainer.innerHTML = '<h2>О нашем проекте</h2>';
        aboutUsContainer.innerHTML += aboutUs["html"];

    } catch (error) {
        console.error('Ошибка при загрузке AboutUs:', error);
        showNotification('Ошибка при загрузке AboutUs', 5000);
    }
}