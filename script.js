// Dynamische achtergrond op basis van het seizoen
function getSeason(date) {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

function setSeasonBackground() {
    const season = getSeason(new Date());
    const background = document.getElementById('season-background');
    const imageMap = {
        spring: 'https://images.unsplash.com/photo-1454510945404-858c1ebaaf91?auto=format&fit=crop&w=1470&q=80',
        summer: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80',
        autumn: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1470&q=80',
        winter: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1470&q=80'
    };
    background.style.backgroundImage = `url(${imageMap[season]})`;
}

// Datum, tijd en week van het jaar voor persoonlijke begroeting
function updateDateTime() {
    const now = new Date();
    const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    const dayName = days[now.getDay()];

    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    document.getElementById('current-day').textContent = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    document.getElementById('current-date').textContent = now.toLocaleDateString('nl-BE');
    document.getElementById('current-time').textContent = now.toLocaleTimeString('nl-BE');
    document.getElementById('day-month').textContent = now.getDate();
    document.getElementById('week-year').textContent = getWeekNumber(now);
}

// Zoekfunctie (eenvoudig demo) - zoekt binnen tekstsecties
function searchSite() {
    const query = document.getElementById('site-search').value.toLowerCase();
    if(!query) return alert('Voer een zoekterm in.');

    const sections = document.querySelectorAll('main section');
    let found = false;

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if(text.includes(query)) {
            section.style.border = '2px solid #ff6600';
            section.scrollIntoView({behavior: 'smooth'});
            found = true;
        } else {
            section.style.border = '';
        }
    });

    if(!found) alert('Geen resultaten gevonden voor "' + query + '".');
}

// Nieuws - voorbeelddata
const nieuwsData = [
    {title: 'Nieuwe wandelroute geopend', date: '2025-11-01', content: 'We hebben een prachtige nieuwe wandelroute toegevoegd in het park.'},
    {title: 'Clubweekend gepland', date: '2025-12-15', content: 'Het jaarlijkse clubweekend vindt plaats in het weekend van 20-22 maart.'},
    {title: 'Lidmaatschap actie', date: '2025-10-20', content: 'Word lid en krijg korting op het clubblaadje!'}
];

function displayNieuws() {
    const container = document.getElementById('news-items');
    container.innerHTML = '';
    nieuwsData.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${item.title}</h3><small>${item.date}</small><p>${item.content}</p>`;
        container.appendChild(div);
    });
}

// Activiteitenkalender januari 2026 tm januari 2027
function generateCalendar() {
    const startDate = new Date(2026, 0, 1); // 1 januari 2026
    const endDate = new Date(2027, 0, 31); // 31 januari 2027
    const container = document.getElementById('calendar');

    let currentDate = new Date(startDate);
    container.innerHTML = '';

    while (currentDate <= endDate) {
        const monthName = currentDate.toLocaleString('nl-BE', { month: 'long' });
        const year = currentDate.getFullYear();
        const monthYearHeader = document.createElement('h3');
        monthYearHeader.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
        container.appendChild(monthYearHeader);

        const daysContainer = document.createElement('div');
        daysContainer.style.display = 'flex';
        daysContainer.style.flexWrap = 'wrap';
        daysContainer.style.marginBottom = '20px';

        const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.style.border = '1px solid #ff6600';
            dayDiv.style.padding = '5px 10px';
            dayDiv.style.margin = '2px';
            dayDiv.style.width = '30px';
            dayDiv.style.textAlign = 'center';
            dayDiv.style.borderRadius = '4px';
            daysContainer.appendChild(dayDiv);
        }

        container.appendChild(daysContainer);

        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
    }
}

// Clubblad sectie met download links (voorbeeld)
const clubbladData = [
    {edition: 'Winter 2024', url: '#'},
    {edition: 'Lente 2024', url: '#'},
    {edition: 'Zomer 2024', url: '#'},
    {edition: 'Herfst 2024', url: '#'},
];

function displayClubblad() {
    const container = document.getElementById('clubblad-editions');
    container.innerHTML = '';
    clubbladData.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${item.edition}</strong> - <a href='${item.url}' download>Download</a>`;
        container.appendChild(div);
    });
}

// Prijsvraag formulier verwerking
const prijsvraagForm = document.getElementById('prijsvraag-form');
prijsvraagForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const naam = this['deelnemer-naam'].value.trim();
    const email = this['deelnemer-email'].value.trim();
    const schiftingsvraag = this['schiftingsvraag'].value.trim();

    if(naam && email && schiftingsvraag) {
        document.getElementById('prijsvraag-feedback').textContent = `Dank voor uw deelname, ${naam}!`;
        prijsvraagForm.reset();
    } else {
        document.getElementById('prijsvraag-feedback').textContent = 'Vul alle velden correct in.';
    }
});

// Fotogalerij voorbeeldafbeeldingen
const wandelingenFotos = [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500534623284-eebf81b40498?auto=format&fit=crop&w=400&q=80'
];

const andereFotos = [
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80'
];

function displayFotos() {
    const wandelingsContainer = document.getElementById('wanderings-album');
    const andereContainer = document.getElementById('other-activities-album');
    wandelingsContainer.innerHTML = '';
    andereContainer.innerHTML = '';

    wandelingenFotos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Foto wandeling';
        wandelingsContainer.appendChild(img);
    });

    andereFotos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Foto andere activiteit';
        andereContainer.appendChild(img);
    });
}

// Reacties sectie
const feedbackForm = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const naam = this['feedback-name'].value.trim();
    const bericht = this['feedback-message'].value.trim();
    if(naam && bericht) {
        const commentDiv = document.createElement('div');
        commentDiv.style.borderBottom = '1px solid #ff6600';
        commentDiv.style.padding = '8px 0';
        commentDiv.innerHTML = `<strong>${naam}</strong><p>${bericht}</p>`;
        feedbackList.prepend(commentDiv);
        this.reset();
    } else {
        alert('Vul beide velden in.');
    }
});

// Poll met directe resultaten
const pollForm = document.getElementById('poll-form');
const pollResults = document.getElementById('poll-results');
const pollData = {
    ja: 0,
    nee: 0,
    geen: 0
};

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const keuze = pollForm.poll.value;
    pollData[keuze]++;
    updatePollResults();
    pollForm.reset();
});

function updatePollResults() {
    const totaal = pollData.ja + pollData.nee + pollData.geen;
    if(totaal === 0) return;
    pollResults.innerHTML = `
        <p>Ja: ${pollData.ja} (${((pollData.ja/totaal)*100).toFixed(1)}%)</p>
        <p>Nee: ${pollData.nee} (${((pollData.nee/totaal)*100).toFixed(1)}%)</p>
        <p>Geen mening: ${pollData.geen} (${((pollData.geen/totaal)*100).toFixed(1)}%)</p>
        <p>Totaal deelnemers: ${totaal}</p>
    `;
}

// Bezoekersteller (lokale opslag)
function updateVisitorCounter() {
    const counterElem = document.getElementById('visitor-count');
    let count = localStorage.getItem('visitorCount');
    if(!count) count = 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    counterElem.textContent = count;
}

// Lidmaatschap - eenvoudige validatie en feedback
const membershipForm = document.getElementById('membership-form');
membershipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this['member-name'].value.trim();
    const email = this['member-email'].value.trim();
    if(name && email) {
        document.getElementById('membership-feedback').textContent = `Bedankt voor je inschrijving, ${name}!`;
        this.reset();
    } else {
        document.getElementById('membership-feedback').textContent = 'Vul minimaal naam en email in.';
    }
});

// Initialiseer alles bij laden
window.onload = () => {
    setSeasonBackground();
    updateDateTime();
    displayNieuws();
    generateCalendar();
    displayClubblad();
    displayFotos();
    updateVisitorCounter();
    updatePollResults();
    setInterval(updateDateTime, 60000); // update tijd elke minuut
};
