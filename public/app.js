let dashboardData = null;

/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();
        loadFiles();


    updateClock();

    setInterval(updateClock, 1000);

    setupSearch();

    setupExport();

    // Auto refresh every 30 seconds
    setInterval(loadDashboard, 30000);

});

/* =========================
   FETCH DATA
========================= */

async function loadDashboard() {

    try {

        const response =
            await fetch("/api/system-info");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data =
            await response.json();

        dashboardData = data;

        populateQuickStats(data);

        renderSystemInfo(
            data.systemInfo
        );

        renderEnvironmentVariables(
            data.environmentVariables
        );

        renderPathEntries(
            data.environmentVariables.path
        );

        updateLastUpdated();

        hideLoader();

    }
    catch (error) {

        console.error(error);

        showToast(
            "Failed to load data"
        );

    }

}

/* =========================
   QUICK STATS
========================= */

function populateQuickStats(data) {

    document.getElementById("osName")
        .textContent =
        data.systemInfo.operatingSystem;

    document.getElementById("nodeVersion")
        .textContent =
        data.systemInfo.nodeVersion;

    document.getElementById("architecture")
        .textContent =
        data.systemInfo.cpuArchitecture;

    document.getElementById("hostname")
        .textContent =
        data.systemInfo.hostname;

}

/* =========================
   SYSTEM INFO CARD
========================= */

function renderSystemInfo(info) {

    const container =
        document.getElementById(
            "systemInfo"
        );

    container.innerHTML = "";

    Object.entries(info)
        .forEach(([key, value]) => {

            const row =
                document.createElement("div");

            row.className =
                "info-row";

            row.innerHTML = `

                <span class="key">
                    ${formatKey(key)}
                </span>

                <div>

                    <span class="value">
                        ${value}
                    </span>

                    <button
                        class="copy-btn"
                        data-copy="${value}"
                    >
                        📋
                    </button>

                </div>

            `;

            container.appendChild(row);

        });

}

/* =========================
   ENV VARIABLES CARD
========================= */

function renderEnvironmentVariables(env) {

    const container =
        document.getElementById(
            "envInfo"
        );

    container.innerHTML = "";

    Object.entries(env)
        .forEach(([key, value]) => {

            if (key === "path") return;

            const row =
                document.createElement("div");

            row.className =
                "info-row";

            row.innerHTML = `

                <span class="key">
                    ${formatKey(key)}
                </span>

                <div>

                    <span class="value">
                        ${value}
                    </span>

                    <button
                        class="copy-btn"
                        data-copy="${value}"
                    >
                        📋
                    </button>

                </div>

            `;

            container.appendChild(row);

        });

}

/* =========================
   PATH EXPLORER
========================= */

function renderPathEntries(paths) {

    const container =
        document.getElementById(
            "pathContainer"
        );

    container.innerHTML = "";

    if (!Array.isArray(paths)) {

        paths = [];

    }

    document.getElementById(
        "pathCount"
    ).textContent =
        `${paths.length} Entries`;

    paths.forEach(path => {

        const div =
            document.createElement("div");

        div.className =
            "path-item";

        div.innerHTML = `

            ${path}

            <button
                class="copy-btn"
                data-copy="${path}"
            >
                📋
            </button>

        `;

        container.appendChild(div);

    });

}

/* =========================
   SEARCH PATH
========================= */

function setupSearch() {

    const searchBox =
        document.getElementById(
            "searchPath"
        );

    searchBox.addEventListener(
        "input",
        function () {

            const term =
                this.value
                    .toLowerCase();

            document
                .querySelectorAll(
                    ".path-item"
                )
                .forEach(item => {

                    item.style.display =
                        item.textContent
                            .toLowerCase()
                            .includes(term)
                            ? "block"
                            : "none";

                });

        }
    );

}

/* =========================
   EXPORT JSON
========================= */

function setupExport() {

    document
        .getElementById(
            "exportBtn"
        )
        .addEventListener(
            "click",
            exportJSON
        );

}

function exportJSON() {

    if (!dashboardData) return;

    const blob =
        new Blob(
            [
                JSON.stringify(
                    dashboardData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "system-info.json";

    link.click();

    URL.revokeObjectURL(url);

    showToast(
        "JSON Exported"
    );

}

/* =========================
   LIVE CLOCK
========================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );

    clock.textContent =
        new Date()
            .toLocaleTimeString();

}

/* =========================
   LAST UPDATED
========================= */

function updateLastUpdated() {

    document.getElementById(
        "lastUpdated"
    ).textContent =

        "Last Updated : " +

        new Date()
            .toLocaleString();

}

/* =========================
   COPY BUTTONS
========================= */

document.addEventListener(
    "click",
    async function (e) {

        if (
            e.target.classList
                .contains(
                    "copy-btn"
                )
        ) {

            const text =
                e.target.dataset
                    .copy;

            try {

                await navigator
                    .clipboard
                    .writeText(text);

                showToast(
                    "Copied Successfully"
                );

            }
            catch {

                showToast(
                    "Copy Failed"
                );

            }

        }

    }
);

/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}

/* =========================
   LOADER
========================= */

function hideLoader() {

    const loader =
        document.getElementById(
            "loader"
        );

    if (loader) {

        loader.style.opacity =
            "0";

        setTimeout(() => {

            loader.style.display =
                "none";

        }, 500);

    }

}

/* =========================
   FORMAT KEYS
========================= */

function formatKey(key) {

    return key

        .replace(
            /([A-Z])/g,
            " $1"
        )

        .replace(
            /^./,
            str => str.toUpperCase()
        );

}

/* =========================
   FILE MANAGER
========================= */

let selectedFile = null;

async function loadFiles() {

    try {

        const response =
            await fetch("/api/files");

        const files =
            await response.json();

        renderFileList(files);

    }
    catch(error){

        showToast(
            "Failed to load files"
        );

    }

}


function renderFileList(files){

    const container =
        document.getElementById(
            "fileList"
        );

    container.innerHTML = "";

    files.forEach(file => {

        const div =
            document.createElement("div");

        div.className =
            "file-item";

        div.textContent =
            file;

        div.addEventListener(
            "click",
            () => {

                openFile(file);

            }
        );

        container.appendChild(div);

    });

}


async function openFile(fileName){

    try{

        const response =
            await fetch(
                `/api/files/${fileName}`
            );

        const data =
            await response.json();

        selectedFile =
            fileName;

        document
            .getElementById(
                "fileName"
            )
            .value =
            fileName;

        document
            .getElementById(
                "fileContent"
            )
            .value =
            data.content;

        showToast(
            `${fileName} opened`
        );

    }
    catch(error){

        showToast(
            "Failed to open file"
        );

    }

}


async function createFile(){

    try{

        const fileName =
            document
            .getElementById(
                "fileName"
            )
            .value;

        const content =
            document
            .getElementById(
                "fileContent"
            )
            .value;

        const response =
            await fetch(
                "/api/files",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({
                        fileName,
                        content
                    })
                }
            );

        const result =
            await response.json();

        showToast(
            result.message
        );

        loadFiles();

    }
    catch(error){

        showToast(
            "Create failed"
        );

    }

}


async function updateFile(){

    try{

        const fileName =
            document
            .getElementById(
                "fileName"
            )
            .value;

        const content =
            document
            .getElementById(
                "fileContent"
            )
            .value;

        const response =
            await fetch(
                `/api/files/${fileName}`,
                {
                    method:"PUT",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({
                        content
                    })
                }
            );

        const result =
            await response.json();

        showToast(
            result.message
        );

        loadFiles();

    }
    catch(error){

        showToast(
            "Update failed"
        );

    }

}


async function deleteFile(){

    try{

        const fileName =
            document
            .getElementById(
                "fileName"
            )
            .value;

        if(
            !confirm(
                `Delete ${fileName}?`
            )
        ){
            return;
        }

        const response =
            await fetch(
                `/api/files/${fileName}`,
                {
                    method:"DELETE"
                }
            );

        const result =
            await response.json();

        showToast(
            result.message
        );

        document
            .getElementById(
                "fileName"
            )
            .value = "";

        document
            .getElementById(
                "fileContent"
            )
            .value = "";

        loadFiles();

    }
    catch(error){

        showToast(
            "Delete failed"
        );

    }

}


document
.getElementById(
    "createBtn"
)
.addEventListener(
    "click",
    createFile
);

document
.getElementById(
    "updateBtn"
)
.addEventListener(
    "click",
    updateFile
);

document
.getElementById(
    "deleteBtn"
)
.addEventListener(
    "click",
    deleteFile
);