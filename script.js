// script.js
(function() {
    'use strict';

    // localStorage dan saqlash
    const STORAGE_KEY = 'english365_data';

    // Default holat
    let state = {
        currentDay: 1,
        completedDays: []
    };

    // DOM elementlar
    const elements = {
        currentDay: document.getElementById('currentDay'),
        levelBadge: document.getElementById('levelBadge'),
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText'),
        wordList: document.getElementById('wordList'),
        sentenceList: document.getElementById('sentenceList'),
        grammarContent: document.getElementById('grammarContent'),
        totalWords: document.getElementById('totalWords'),
        totalSentences: document.getElementById('totalSentences'),
        daysCompleted: document.getElementById('daysCompleted'),
        prevBtn: document.getElementById('prevDayBtn'),
        nextBtn: document.getElementById('nextDayBtn'),
        resetBtn: document.getElementById('resetBtn')
    };

    // Load state
    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                state = { ...state, ...parsed };
            }
        } catch (e) {
            console.warn('State load error:', e);
        }
    }

    // Save state
    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('State save error:', e);
        }
    }

    // Kun ma'lumotlarini olish
    function getDayData(day) {
        if (!window.lessonData || !window.lessonData[day]) {
            // Agar ma'lumot bo'lmasa, default
            return {
                words: ['Hello - Salom', 'Good - Yaxshi'],
                sentences: ['Hello world! - Salom dunyo!'],
                grammar: 'Bugungi grammatika: Asosiy salomlashish.',
                level: 'A1'
            };
        }
        return window.lessonData[day];
    }

    // Darajani aniqlash
    function getLevel(day) {
        if (day <= 60) return 'A1';
        if (day <= 120) return 'A2';
        if (day <= 180) return 'A2+';
        if (day <= 240) return 'B1';
        if (day <= 300) return 'B1+';
        return 'B2';
    }

    // Sahnani yangilash
    function render() {
        const day = state.currentDay;
        const data = getDayData(day);
        const level = getLevel(day);
        const totalDays = 365;
        const completed = state.completedDays.length;

        // Kun va daraja
        elements.currentDay.textContent = `${day}-kun`;
        elements.levelBadge.textContent = level;

        // Progress
        const progress = Math.round((day / totalDays) * 100);
        elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
        elements.progressText.textContent = `${Math.min(progress, 100)}% tugallandi`;

        // So'zlar
        if (data.words && data.words.length) {
            elements.wordList.innerHTML = data.words.map(w => {
                if (typeof w === 'string') {
                    const parts = w.split(' - ');
                    if (parts.length === 2) {
                        return `<li><strong>${parts[0].trim()}</strong> <span class="meaning">${parts[1].trim()}</span></li>`;
                    }
                    return `<li>${w}</li>`;
                }
                return `<li>${w}</li>`;
            }).join('');
        } else {
            elements.wordList.innerHTML = '<li>⚠️ So\'zlar topilmadi</li>';
        }

        // Jumlalar
        if (data.sentences && data.sentences.length) {
            elements.sentenceList.innerHTML = data.sentences.map(s => {
                if (typeof s === 'string') {
                    const parts = s.split(' - ');
                    if (parts.length === 2) {
                        return `<li><strong>${parts[0].trim()}</strong> <span class="meaning">${parts[1].trim()}</span></li>`;
                    }
                    return `<li>${s}</li>`;
                }
                return `<li>${s}</li>`;
            }).join('');
        } else {
            elements.sentenceList.innerHTML = '<li>⚠️ Jumlalar topilmadi</li>';
        }

        // Grammatika
        elements.grammarContent.innerHTML = data.grammar || '📖 Bugungi grammatika mavzusi: Asosiy tushunchalar.';

        // Statistikalar
        const allWords = Object.values(window.lessonData || {}).reduce((sum, d) => sum + (d.words ? d.words.length : 0), 0);
        const allSentences = Object.values(window.lessonData || {}).reduce((sum, d) => sum + (d.sentences ? d.sentences.length : 0), 0);
        
        elements.totalWords.textContent = allWords || 2880;
        elements.totalSentences.textContent = allSentences || 1980;
        elements.daysCompleted.textContent = completed || 0;

        // Tugmalar holati
        elements.prevBtn.disabled = day <= 1;
        elements.prevBtn.style.opacity = day <= 1 ? '0.4' : '1';
        
        // Kunni tugallangan deb belgilash (agar hali belgilanmagan bo'lsa)
        if (!state.completedDays.includes(day)) {
            state.completedDays.push(day);
            saveState();
        }

        // Telefonda notification uchun
        scheduleNotifications(day);
    }

    // Notification scheduler
    function scheduleNotifications(day) {
        if ('Notification' in window && Notification.permission === 'granted') {
            // Kun davomida 3-4 marta eslatma
            const times = [9, 12, 17, 20];
            const hour = new Date().getHours();
            if (times.includes(hour)) {
                // Faqat bir marta ko'rsatish uchun
                const notifKey = `notif_${day}_${hour}`;
                if (!sessionStorage.getItem(notifKey)) {
                    new Notification('📚 365 English', {
                        body: `${day}-kun! Bugun ${getLevel(day)} darajadagi 8 ta so'z va 5 ta jumla o'rganing!`,
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>'
                    });
                    sessionStorage.setItem(notifKey, 'true');
                }
            }
        }
    }

    // Notification ruxsati
    function requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    // Oldingi kun
    function prevDay() {
        if (state.currentDay > 1) {
            state.currentDay--;
            saveState();
            render();
        }
    }

    // Keyingi kun (bugungi)
    function nextDay() {
        if (state.currentDay < 365) {
            state.currentDay++;
            saveState();
            render();
        } else {
            alert('🎉 Tabriklaymiz! Barcha 365 kunni tugatdingiz!');
        }
    }

    // Qayta boshlash
    function resetAll() {
        if (confirm('Hamma ma\'lumotlarni o\'chirib, qayta boshlashni xohlaysizmi?')) {
            state = {
                currentDay: 1,
                completedDays: []
            };
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.clear();
            render();
        }
    }

    // Keyboard navigatsiya
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevDay();
        if (e.key === 'ArrowRight') nextDay();
    });

    // Event listeners
    elements.prevBtn.addEventListener('click', prevDay);
    elements.nextBtn.addEventListener('click', nextDay);
    elements.resetBtn.addEventListener('click', resetAll);

    // Swipe support (mobil uchun)
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    document.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) nextDay();
            else prevDay();
        }
    });

    // Initialize
    function init() {
        loadState();
        requestNotificationPermission();
        render();
        console.log('📚 365 English Learning App yuklandi!');
    }

    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
