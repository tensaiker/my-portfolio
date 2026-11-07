/* ============================================================================
   MINDSPRINT PROJECT PAGE — SCREENSHOTS AND LIVE DEMO

   This file runs only on project-mindsprint.html, NOT on your homepage.
   Existing script.js, Cozy Kana, and 3D model scripts remain unchanged.

   FILE GUIDE:
   All screenshot files must be inside:
   assets/image/mind_sprint_project_image/
   Names are case-sensitive on Vercel. Use these exact filenames.
   ============================================================================ */

(() => {
    'use strict';

    const folder = 'assets/image/mind_sprint_project_image/';

    // The list is organized by the screens in your VS Code screenshot.
    // Add or remove a line here when you add or delete a screenshot file.
    const screenshots = [
        { file: 'logo_and_splashscreen.jpeg', label: 'Logo & Splash', group: 'intro' },
        { file: 'loading_UI.jpeg', label: 'Loading Screen', group: 'intro' },
        { file: 'onboarding_01.jpeg', label: 'Onboarding · Practice', group: 'intro' },
        { file: 'onboarding_02.jpeg', label: 'Onboarding · Challenges', group: 'intro' },
        { file: 'onboarding_03.jpeg', label: 'Onboarding · Progress', group: 'intro' },
        { file: 'welcome.jpeg', label: 'Welcome Screen', group: 'intro' },
        { file: 'home_tab.jpeg', label: 'Home Dashboard', group: 'home' },
        { file: 'game_mode_tab.jpeg', label: 'Game Modes', group: 'home' },
        { file: 'profile_tab.jpeg', label: 'Profile & Preferences', group: 'home' },
        { file: 'about_application.jpeg', label: 'About MindSprint', group: 'home' },
        { file: 'practice_setup.jpeg', label: 'Practice Setup', group: 'practice' },
        { file: 'practice_gameplay.jpeg', label: 'Practice Gameplay', group: 'practice' },
        { file: 'practice_result.jpeg', label: 'Practice Results', group: 'practice' },
        { file: 'rapid_10_setup.jpeg', label: 'Rapid 10 Setup', group: 'rapid' },
        { file: 'rapid_10_gameplay.jpeg', label: 'Rapid 10 Gameplay', group: 'rapid' },
        { file: 'rapid_10_result.jpeg', label: 'Rapid 10 Results', group: 'rapid' },
        { file: 'time_attack_setup.jpeg', label: 'Time Attack Setup', group: 'time' },
        { file: 'time_attack_gameplay.jpeg', label: 'Time Attack Gameplay', group: 'time' },
        { file: 'time_attack_result.jpeg', label: 'Time Attack Results', group: 'time' },
        { file: 'survival_setup.jpeg', label: 'Survival Setup', group: 'survival' },
        { file: 'survival_gameplay.jpeg', label: 'Survival Gameplay', group: 'survival' },
        { file: 'survival_result.jpeg', label: 'Survival Results', group: 'survival' },
        { file: 'perfect_10_setup.jpeg', label: 'Perfect 10 Setup', group: 'perfect' },
        { file: 'perfect_10_gameplay.jpeg', label: 'Perfect 10 Gameplay', group: 'perfect' },
        { file: 'perfect_10_result.jpeg', label: 'Perfect 10 Results', group: 'perfect' },
        { file: 'progress_tab.jpeg', label: 'Overall Progress', group: 'progress' },
        { file: 'practice_progress.jpeg', label: 'Practice Performance', group: 'progress' }
    ];

    const $ = id => document.getElementById(id);
    const screenshotPanel = $('ms-screenshots');
    const livePanel = $('ms-live');
    const screenshotTab = $('ms-tab-screenshots');
    const liveTab = $('ms-tab-live');
    const liveFrame = $('ms-live-frame');
    const mainImage = $('ms-main-image');
    const imageError = $('ms-image-error');
    const imageLabel = $('ms-image-label');
    const imageCount = $('ms-image-count');
    const thumbnailStrip = $('ms-thumbnails');
    const prevButton = $('ms-prev');
    const nextButton = $('ms-next');
    const zoomButton = $('ms-zoom');
    const lightbox = $('ms-lightbox');
    const lightboxImage = $('ms-lightbox-image');
    const lightboxCaption = $('ms-lightbox-caption');
    const categoryButtons = [...document.querySelectorAll('.ms-category')];

    // This file is safe to load only on its intended page.
    if (!mainImage || !thumbnailStrip || !screenshotPanel || !livePanel) return;

    let currentGroup = 'all';
    let visible = screenshots;
    let currentIndex = 0;
    let liveLoaded = false;

    function pathFor(item) {
        return folder + item.file;
    }

    function currentScreenshot() {
        return visible[currentIndex];
    }

    function displayCurrent() {
        const item = currentScreenshot();
        if (!item) return;

        imageError.hidden = true;
        mainImage.hidden = false;
        mainImage.alt = 'MindSprint screenshot: ' + item.label;
        mainImage.src = pathFor(item);
        imageLabel.textContent = item.label;
        imageCount.textContent = `${currentIndex + 1} / ${visible.length}`;

        // Reuse thumbnail buttons. Only the selected state needs updating.
        [...thumbnailStrip.children].forEach((button, index) => {
            const selected = index === currentIndex;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
            // Keep the active thumbnail in view without scrolling the whole page.
            if (selected) {
                const stripRect = thumbnailStrip.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                if (buttonRect.left < stripRect.left) {
                    thumbnailStrip.scrollLeft -= stripRect.left - buttonRect.left + 8;
                } else if (buttonRect.right > stripRect.right) {
                    thumbnailStrip.scrollLeft += buttonRect.right - stripRect.right + 8;
                }
            }
        });

        prevButton.disabled = visible.length < 2;
        nextButton.disabled = visible.length < 2;
    }

    function renderThumbnails() {
        // Build once per filter change, not on every arrow click.
        const fragment = document.createDocumentFragment();
        visible.forEach((item, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'ms-thumb';
            button.setAttribute('aria-label', `Show ${item.label}`);
            button.setAttribute('aria-pressed', 'false');

            const img = document.createElement('img');
            img.src = pathFor(item);
            img.alt = ''; // The neighboring text provides the accessible name.
            img.loading = 'lazy';
            img.decoding = 'async';

            const caption = document.createElement('span');
            caption.textContent = item.label;

            button.append(img, caption);
            button.addEventListener('click', () => {
                currentIndex = index;
                displayCurrent();
            });
            fragment.appendChild(button);
        });
        thumbnailStrip.replaceChildren(fragment);
        displayCurrent();
    }

    function changeCategory(group) {
        currentGroup = group;
        visible = group === 'all' ? screenshots : screenshots.filter(item => item.group === group);
        currentIndex = 0;
        categoryButtons.forEach(button => {
            const selected = button.dataset.category === currentGroup;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        renderThumbnails();
    }

    function navigate(amount) {
        if (visible.length < 2) return;
        currentIndex = (currentIndex + amount + visible.length) % visible.length;
        displayCurrent();
    }

    function setMode(mode) {
        const isLive = mode === 'live';
        livePanel.hidden = !isLive;
        screenshotPanel.hidden = isLive;
        liveTab.classList.toggle('is-active', isLive);
        screenshotTab.classList.toggle('is-active', !isLive);
        liveTab.setAttribute('aria-pressed', String(isLive));
        screenshotTab.setAttribute('aria-pressed', String(!isLive));

        // Load Flutter only when explicitly requested, to improve page speed.
        if (isLive && !liveLoaded) {
            liveFrame.src = liveFrame.dataset.src;
            liveLoaded = true;
        }
    }

    // If one of the screenshot filenames is missing, show a helpful message.
    mainImage.addEventListener('error', () => {
        mainImage.hidden = true;
        imageError.textContent = `Cannot load ${pathFor(currentScreenshot())}. Check the filename and folder location.`;
        imageError.hidden = false;
    });
    mainImage.addEventListener('load', () => {
        imageError.hidden = true;
        mainImage.hidden = false;
    });

    screenshotTab.addEventListener('click', () => setMode('screenshots'));
    liveTab.addEventListener('click', () => setMode('live'));
    prevButton.addEventListener('click', () => navigate(-1));
    nextButton.addEventListener('click', () => navigate(1));
    categoryButtons.forEach(button => button.addEventListener('click', () => changeCategory(button.dataset.category)));

    // Native image zoom. Escape also closes the dialog automatically.
    zoomButton.addEventListener('click', () => {
        if (mainImage.hidden || typeof lightbox.showModal !== 'function') return;
        lightboxImage.src = mainImage.src;
        lightboxImage.alt = mainImage.alt;
        lightboxCaption.textContent = currentScreenshot().label;
        lightbox.showModal();
    });
    $('ms-close-lightbox').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) lightbox.close();
    });

    // Arrow keys work within the screenshot gallery only (not inside the Flutter iframe).
    screenshotPanel.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(event.key === 'ArrowLeft' ? -1 : 1);
        }
    });

    // Initial gallery: all screenshots, showing MindSprint's branding first.
    changeCategory('all');
})();
