document.addEventListener("DOMContentLoaded", function () {
    // Переключение вкладок
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    function activateTab(index) {
        tabs.forEach((tab, idx) => {
            tab.classList.toggle("active", idx === index);
            tabContents[idx].style.display = idx === index ? "block" : "none";
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            activateTab(index);
        });
    });

    // Автоматически активировать первую вкладку при загрузке
    if (tabs.length > 0) {
        activateTab(0);
    }

    // Поиск
    const searchInput = document.querySelector(".search-bar input");
    const files = document.querySelectorAll(".file-info");

    searchInput.addEventListener("input", function (e) {
        const query = e.target.value.trim().toLowerCase();

        files.forEach(file => {
            const fileName = file.querySelector("h1").textContent.toLowerCase();
            file.style.display = fileName.includes(query) ? "flex" : "none";
        });
    });

    // Прогресс-бар
    const progressBar = document.querySelector(".progress");
    const progressPercentage = 60; // Процент завершения

    function updateProgressBar(percentage) {
        progressBar.style.width = `${percentage}%`;
        progressBar.style.transition = "width 0.5s ease"; // Плавная анимация
    }

    updateProgressBar(progressPercentage);

    // Видеоплеер
    const videoPlayer = document.querySelector(".video-player video");
    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("video-controls");

    const playPauseButton = document.createElement("button");
    playPauseButton.textContent = "Play";

    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("video-progress-bar");

    const videoProgress = document.createElement("div");
    videoProgress.classList.add("video-progress");
    videoProgress.style.width = "0%";
    progressBarContainer.appendChild(videoProgress);

    controlsContainer.appendChild(playPauseButton);
    controlsContainer.appendChild(progressBarContainer);
    document.querySelector(".video-player").appendChild(controlsContainer);

    playPauseButton.addEventListener("click", () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.textContent = "Pause";
        } else {
            videoPlayer.pause();
            playPauseButton.textContent = "Play";
        }
    });

    // Обновление прогресс-бара видео
    videoPlayer.addEventListener("timeupdate", () => {
        const progressPercent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        videoProgress.style.width = `${progressPercent}%`;
    });

    // Прокрутка видео по клику на прогресс-бар
    progressBarContainer.addEventListener("click", (e) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const newTime = (clickPosition / rect.width) * videoPlayer.duration;
        videoPlayer.currentTime = newTime;
    });
});
