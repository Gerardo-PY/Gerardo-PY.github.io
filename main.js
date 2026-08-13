document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const navbarCollapse = document.getElementById("navbarNav");
    const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
    const player = document.getElementById("customPlayer");
    const audio = document.getElementById("radioAudio");
    const playButton = document.getElementById("playButton");
    const playerStatus = document.getElementById("playerStatus");
    const volumeControl = document.getElementById("volumeControl");
    const volumeIcon = document.getElementById("volumeIcon");

    document.getElementById("anio").textContent =
        `© ${new Date().getFullYear()} | Radio Siete Villarrica`;

    const updateNavigation = () => {
        navbar.classList.toggle("fixed", window.scrollY > 0);

        const currentSection = [...sections]
            .reverse()
            .find((section) => window.scrollY >= section.offsetTop - 100);

        navLinks.forEach((link) => {
            const isActive = currentSection
                && link.getAttribute("href") === `#${currentSection.id}`;
            link.classList.toggle("active", Boolean(isActive));
            link.toggleAttribute("aria-current", Boolean(isActive));
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
        });
    });

    const setPlayerState = (state, message) => {
        const isPlaying = state === "playing";
        player.dataset.state = state;
        playerStatus.textContent = message;
        playButton.setAttribute("aria-pressed", String(isPlaying));
        playButton.setAttribute(
            "aria-label",
            isPlaying ? "Pausar Radio Siete" : "Reproducir Radio Siete"
        );
        playButton.innerHTML = `<i class="bi bi-${isPlaying ? "pause" : "play"}-fill" aria-hidden="true"></i>`;
    };

    playButton.addEventListener("click", async () => {
        if (!audio.paused) {
            audio.pause();
            setPlayerState("paused", "Transmisión pausada");
            return;
        }

        setPlayerState("loading", "Conectando…");

        try {
            audio.load();
            await audio.play();
        } catch {
            setPlayerState("error", "No se pudo conectar. Intenta nuevamente.");
        }
    });

    volumeControl.addEventListener("input", () => {
        audio.volume = Number(volumeControl.value);
        volumeIcon.className = audio.volume === 0
            ? "bi bi-volume-mute-fill"
            : audio.volume < 0.5
                ? "bi bi-volume-down-fill"
                : "bi bi-volume-up-fill";
    });

    audio.volume = Number(volumeControl.value);
    audio.addEventListener("playing", () => setPlayerState("playing", "Transmitiendo ahora"));
    audio.addEventListener("waiting", () => setPlayerState("loading", "Reconectando…"));
    audio.addEventListener("stalled", () => setPlayerState("loading", "Esperando señal…"));
    audio.addEventListener("error", () => setPlayerState("error", "Señal no disponible"));
    audio.addEventListener("pause", () => {
        if (player.dataset.state !== "error") {
            setPlayerState("paused", "Transmisión pausada");
        }
    });

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
});
