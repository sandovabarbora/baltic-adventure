/* ========================================
   BALTIC TRIP 2025 - JAVASCRIPT
   ======================================== */

// ========== EXPANDABLE FUNCTIONS ==========
function toggleExpand(element) {
    element.classList.toggle('expanded');
}

function toggleExpandCard(element) {
    element.classList.toggle('expanded');
}

// Expand all / Collapse all
function expandAll() {
    document.querySelectorAll('.timeline-content.expandable').forEach(el => {
        el.classList.add('expanded');
    });
    document.querySelectorAll('.card.expandable').forEach(el => {
        el.classList.add('expanded');
    });
}

function collapseAll() {
    document.querySelectorAll('.timeline-content.expandable').forEach(el => {
        el.classList.remove('expanded');
    });
    document.querySelectorAll('.card.expandable').forEach(el => {
        el.classList.remove('expanded');
    });
}

// ========== THEME SWITCHER ==========
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    localStorage.setItem('balticTheme', theme);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('balticTheme') || 'cyberpunk';
    document.body.setAttribute('data-theme', savedTheme);
    document.querySelector(`.theme-btn:nth-child(${savedTheme === 'cyberpunk' ? 1 : 2})`).classList.add('active');
});

// ========== CUSTOM CURSOR (CYBERPUNK ONLY) ==========
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        if (document.body.getAttribute('data-theme') === 'cyberpunk') {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }
    });
    
    document.querySelectorAll('a, button, .checklist-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ========== LOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// ========== NAVIGATION ==========
// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active nav link and smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== COUNTDOWN TIMER ==========
function updateCountdown() {
    const departure = new Date('2025-10-10T13:30:00+02:00');
    const now = new Date();
    const diff = departure - now;
    
    if (diff > 0) {
        document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ========== MAP INITIALIZATION ==========
let map;

function initMap() {
    const theme = document.body.getAttribute('data-theme');
    const tileUrl = theme === 'cyberpunk' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    
    // Initialize map centered on Baltic region
    map = L.map('map').setView([57.5, 24.5], 5);
    
    // Add tile layer
    L.tileLayer(tileUrl, {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Location markers
    const locations = [
        { name: 'Vilnius', coords: [54.6872, 25.2797], popup: 'Vilnius<br>10.-12.10.' },
        { name: 'Riga', coords: [56.9496, 24.1052], popup: 'Riga<br>12.-15.10.' },
        { name: 'Jūrmala', coords: [56.9729, 23.7987], popup: 'Jūrmala<br>14.10. výlet' },
        { name: 'Tallinn', coords: [59.4370, 24.7536], popup: 'Tallinn<br>15.-17.10.' },
        { name: 'Helsinki', coords: [60.1699, 24.9384], popup: 'Helsinki<br>17.-19.10.' }
    ];
    
    // Add markers
    locations.forEach(loc => {
        L.marker(loc.coords).addTo(map).bindPopup(loc.popup);
    });
    
    // Main route line
    L.polyline([
        [54.6872, 25.2797], // Vilnius
        [56.9496, 24.1052], // Riga
        [59.4370, 24.7536]  // Tallinn
    ], { color: theme === 'cyberpunk' ? '#00FF88' : '#E8B4B8', weight: 3 }).addTo(map);
    
    // Jurmala day trip (dashed line)
    L.polyline([
        [56.9496, 24.1052], // Riga
        [56.9729, 23.7987]  // Jurmala
    ], { color: theme === 'cyberpunk' ? '#FF0055' : '#A8DADC', weight: 2, dashArray: '5, 10' }).addTo(map);
}

// Initialize map after a short delay to ensure DOM is ready
setTimeout(initMap, 1500);

// ========== CHECKLIST FUNCTIONALITY ==========
function toggleCheck(item) {
    const checkbox = item.querySelector('.checklist-checkbox');
    checkbox.checked = !checkbox.checked;
    item.classList.toggle('checked');
    updateChecklistProgress();
    saveChecklistState();
}

function updateChecklistProgress() {
    const total = document.querySelectorAll('.checklist-checkbox').length;
    const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
    const percent = Math.round((checked / total) * 100);
    
    document.getElementById('checklistPercent').textContent = percent;
    document.getElementById('checklistBar').style.width = percent + '%';
}

function saveChecklistState() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const state = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('balticChecklist2025', JSON.stringify(state));
}

function loadChecklistState() {
    const saved = localStorage.getItem('balticChecklist2025');
    if (saved) {
        const state = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach((cb, index) => {
            if (state[index]) {
                cb.checked = true;
                cb.parentElement.classList.add('checked');
            }
        });
        updateChecklistProgress();
    }
}

function saveChecklist() {
    saveChecklistState();
    alert('✅ Checklist uložen!');
}

function resetChecklist() {
    if (confirm('Opravdu chcete resetovat checklist?')) {
        document.querySelectorAll('.checklist-checkbox').forEach(cb => {
            cb.checked = false;
            cb.parentElement.classList.remove('checked');
        });
        updateChecklistProgress();
        localStorage.removeItem('balticChecklist2025');
    }
}

// Load checklist state on page load
window.addEventListener('load', loadChecklistState);

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'cyberpunk' ? 'cozy' : 'cyberpunk';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('balticTheme', newTheme);
        
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.theme-btn:nth-child(${newTheme === 'cyberpunk' ? 1 : 2})`).classList.add('active');
    }
    
    // Escape to close all expanded items
    if (e.key === 'Escape') {
        collapseAll();
    }
});

// ========== PRINT FUNCTION ==========
function printGuide() {
    // Expand all content before printing
    expandAll();
    window.print();
}

// ========== DYNAMIC DATE DISPLAY ==========
function updateDatesDisplay() {
    const today = new Date();
    const tripStart = new Date('2025-10-10');
    const daysUntilTrip = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24));
    
    // Update any elements that show days until trip
    const daysElements = document.querySelectorAll('.days-until-trip');
    daysElements.forEach(el => {
        el.textContent = daysUntilTrip;
    });
}

updateDatesDisplay();

// ========== LOCAL STORAGE UTILITIES ==========
const storage = {
    save: (key, data) => {
        localStorage.setItem(`balticTrip_${key}`, JSON.stringify(data));
    },
    load: (key) => {
        const data = localStorage.getItem(`balticTrip_${key}`);
        return data ? JSON.parse(data) : null;
    },
    remove: (key) => {
        localStorage.removeItem(`balticTrip_${key}`);
    }
};

// ========== TRIP NOTES FUNCTIONALITY ==========
function initTripNotes() {
    const notesContainer = document.getElementById('trip-notes');
    if (notesContainer) {
        const savedNotes = storage.load('notes') || '';
        const textarea = notesContainer.querySelector('textarea');
        if (textarea) {
            textarea.value = savedNotes;
            
            // Auto-save notes
            let saveTimeout;
            textarea.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    storage.save('notes', textarea.value);
                }, 1000);
            });
        }
    }
}

initTripNotes();

// ========== EXPORT DATA FUNCTION ==========
function exportTripData() {
    const data = {
        checklist: storage.load('checklist') || [],
        notes: storage.load('notes') || '',
        theme: localStorage.getItem('balticTheme') || 'cyberpunk',
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baltic-trip-2025-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========== IMPORT DATA FUNCTION ==========
function importTripData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.checklist) {
                localStorage.setItem('balticChecklist2025', JSON.stringify(data.checklist));
                loadChecklistState();
            }
            
            if (data.notes) {
                storage.save('notes', data.notes);
                initTripNotes();
            }
            
            if (data.theme) {
                document.body.setAttribute('data-theme', data.theme);
                localStorage.setItem('balticTheme', data.theme);
            }
            
            alert('✅ Data úspěšně importována!');
        } catch (error) {
            alert('❌ Chyba při importu dat. Zkontrolujte soubor.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// ========== INIT ALL FUNCTIONS ON LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Baltic Trip 2025 Guide loaded successfully!');
    console.log('📍 Press Ctrl+K to toggle theme');
    console.log('📍 Press Escape to collapse all expanded items');
});
