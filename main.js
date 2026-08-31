// Main shared script for PADHLE.com

// 1. Initialize Databases in LocalStorage if not exists
function initDatabase() {
    const stored = localStorage.getItem('padhle_papers');
    let needsReset = false;
    
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            const hasOtherUniv = parsed.some(p => 
                p.category === 'university' && 
                p.university !== 'Delhi Technical University (DTU)' && 
                p.university !== 'YMCA University'
            );
            const hasEsc101 = parsed.some(p => p.id === 'univ-ymca-1st-esc101-2023');
            const hasEgd = parsed.some(p => p.id === 'univ-ymca-2nd-egd-2023');
            if (hasOtherUniv || !hasEsc101 || !hasEgd) {
                needsReset = true;
            }
        } catch (e) {
            needsReset = true;
        }
    } else {
        needsReset = true;
    }

    if (needsReset) {
        localStorage.setItem('padhle_papers', JSON.stringify(DEFAULT_PAPERS));
        localStorage.setItem('padhle_pending', JSON.stringify([]));
    }
}

// 2. Load Approved Papers
function getApprovedPapers() {
    initDatabase();
    return JSON.parse(localStorage.getItem('padhle_papers'));
}

// 3. Load Pending Papers
function getPendingPapers() {
    initDatabase();
    return JSON.parse(localStorage.getItem('padhle_pending'));
}

// 4. Update databases
function savePapers(papers) {
    localStorage.setItem('padhle_papers', JSON.stringify(papers));
}

function savePendingPapers(papers) {
    localStorage.setItem('padhle_pending', JSON.stringify(papers));
}

// 5. Theme Toggle Handler
function initTheme() {
    const savedTheme = localStorage.getItem('padhle_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set theme icon accordingly on pages that have it
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('padhle_theme', newTheme);
    updateThemeIcon(newTheme);
    showAlert(`Switched to ${newTheme} mode!`, 'success');
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
        }
    }
}

// 6. Navigation and Footer dynamic template insertion
// Using JS to generate headers/footers ensures consistency and DRY code
function insertCommonLayout() {
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');

    // Get current path to highlight active nav link
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);

    if (headerEl) {
        headerEl.innerHTML = `
            <div class="container nav-container">
                <a href="index.html" class="logo">
                    <i class="fa-solid fa-graduation-cap" style="color: var(--accent);"></i>
                    PADHLE<span>.com</span>
                    <span class="logo-badge">PYQs</span>
                </a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="index.html" class="${page === 'index.html' || page === '' ? 'active' : ''}">Home</a></li>
                        <li><a href="browse.html" class="${page === 'browse.html' ? 'active' : ''}">Browse Papers</a></li>
                        <li><a href="upload.html" class="${page === 'upload.html' ? 'active' : ''}">Upload Paper</a></li>
                        <li><a href="admin.html" class="${page === 'admin.html' ? 'active' : ''}">Admin Portal</a></li>
                    </ul>
                </nav>
                <div class="nav-actions">
                    <button class="icon-btn" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme">
                        <i class="fa-regular fa-sun"></i>
                    </button>
                    <a href="browse.html" class="btn-primary" style="padding: 10px 20px; font-size: 14px;">
                        <i class="fa-solid fa-download"></i> Get Papers
                    </a>
                </div>
            </div>
        `;
    }

    if (footerEl) {
        footerEl.innerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="index.html" class="logo">
                            <i class="fa-solid fa-graduation-cap" style="color: var(--accent);"></i>
                            PADHLE<span>.com</span>
                        </a>
                        <p>PADHLE.com is your one-stop library for high-quality, verified previous year question papers for Boards, Universities, and Competitive Exams.</p>
                    </div>
                    <div class="footer-links-col">
                        <h4>Explore Sections</h4>
                        <ul>
                            <li><a href="browse.html?cat=university">University Papers</a></li>
                            <li><a href="browse.html?cat=board">Board Exams</a></li>
                            <li><a href="browse.html?cat=competitive">Competitive Exams</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Quick Actions</h4>
                        <ul>
                            <li><a href="upload.html">Upload a Paper</a></li>
                            <li><a href="admin.html">Admin Verification Dashboard</a></li>
                            <li><a href="browse.html">Browse All</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} PADHLE.com. Built for students with ❤️</p>
                    <p>Designed with Modern Web Standards</p>
                </div>
            </div>
        `;
    }
}

// 7. Global Notification Pop-up
function showAlert(message, type = 'success') {
    // Remove existing if any
    const existing = document.querySelector('.alert-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = `alert-popup ${type}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'error') iconClass = 'fa-circle-xmark';

    popup.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(popup);
    
    // Trigger transition
    setTimeout(() => popup.classList.add('show'), 10);

    // Hide after 3.5 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 400);
    }, 3500);
}

// 8. Dynamic Modal for Simulated PDF Downloads / Previews
function openPreviewModal(paperId) {
    const papers = getApprovedPapers().concat(getPendingPapers());
    const paper = papers.find(p => p.id === paperId);

    if (!paper) {
        showAlert("Question Paper file not found", "error");
        return;
    }

    // Modal template injection
    let modal = document.getElementById('preview-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'preview-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${paper.title}</h3>
                <button class="modal-close" onclick="closePreviewModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="pdf-placeholder">
                    <i class="fa-solid fa-file-pdf"></i>
                    <h4>Simulated Document PDF: ${paper.fileName}</h4>
                    <p style="color: var(--text-secondary); max-width: 400px; text-align: center; margin: 10px 0 20px 0;">
                        This simulates the file preview for <strong>${paper.subject}</strong>. In production, this renders the official PDF viewer.
                    </p>
                    <button class="btn-primary" onclick="simulateDownload('${paper.id}')">
                        <i class="fa-solid fa-circle-arrow-down"></i> Download Original PDF File
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function simulateDownload(paperId) {
    const papers = getApprovedPapers();
    const paperIdx = papers.findIndex(p => p.id === paperId);
    
    if (paperIdx !== -1) {
        papers[paperIdx].downloads += 1;
        savePapers(papers);
        // Refresh cards download count if on browse page
        if (typeof renderPapers === 'function') {
            renderPapers();
        }
    }

    showAlert("Preparing download...", "warning");
    
    setTimeout(() => {
        showAlert("Download started successfully! Check your downloads folder.", "success");
        closePreviewModal();
    }, 1500);
}

// 9. Document DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    initTheme();
    insertCommonLayout();
});
