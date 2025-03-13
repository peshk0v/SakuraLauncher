var CurrentServer = null;

window.onresize = function () {
    window.resizeTo(1200, 800);
}

function setActiveServer(index) {
    const buttonSv = document.getElementById("svBtn" + index);
    const oldButtonSv = document.getElementById("svBtn" + CurrentServer)
    CurrentServer = index;
    const curColor = "rgba(255, 0, 255, 0.4)";
    const prevColor = "rgba(255, 255, 255, 0.05)";
    buttonSv.style.backgroundColor = curColor;
    oldButtonSv.style.backgroundColor = prevColor;
}

function addServer(name, version, icon, index) {
    const serverList = document.querySelector('.server-list');
    const serverItem = document.createElement('button');
    serverItem.className = 'server-item';
    serverItem.id = "svBtn" + index;
    serverItem.onclick = function() {
        setActiveServer(index);
    };
    serverItem.innerHTML = `
        <img src="${icon}" class="server-icon">
        <div class="server-info">
            <span class="server-name">${name}</span>
            <span class="server-version">${version}</span>
        </div>
    `;
    serverList.appendChild(serverItem);
}