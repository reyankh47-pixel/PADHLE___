// Admin Portal Security and Moderation logic

// 1. Session state checker
function checkLoginState() {
    const isAuth = sessionStorage.getItem('padhle_admin_auth') === 'true';
    const loginView = document.getElementById('admin-login-view');
    const dashboardView = document.getElementById('admin-dashboard-view');

    if (loginView && dashboardView) {
        if (isAuth) {
            loginView.style.display = 'none';
            dashboardView.style.display = 'block';
            renderAdminDashboard();
        } else {
            loginView.style.display = 'block';
            dashboardView.style.display = 'none';
        }
    }
}

// 2. Login verification handler
function handleAdminLogin(event) {
    event.preventDefault();
    const passcode = document.getElementById('admin-passcode').value;

    if (passcode === 'admin123') {
        sessionStorage.setItem('padhle_admin_auth', 'true');
        showAlert("Dashboard unlocked successfully!", "success");
        checkLoginState();
    } else {
        showAlert("Access Denied: Invalid passcode!", "error");
        document.getElementById('admin-passcode').value = '';
    }
}

// 3. Logout handler
function handleAdminLogout() {
    sessionStorage.removeItem('padhle_admin_auth');
    showAlert("Logged out from admin panel.", "warning");
    checkLoginState();
}

// 4. Statistics counter and Pending list builder
function renderAdminDashboard() {
    const approvedPapers = getApprovedPapers();
    const pendingPapers = getPendingPapers();

    // 4a. Update stats numbers
    const activeCount = document.getElementById('stat-approved-count');
    const pendingCount = document.getElementById('stat-pending-count');
    const downloadsCount = document.getElementById('stat-downloads-count');

    if (activeCount) activeCount.innerText = approvedPapers.length;
    if (pendingCount) pendingCount.innerText = pendingPapers.length;
    
    if (downloadsCount) {
        const totalDownloads = approvedPapers.reduce((sum, paper) => sum + (paper.downloads || 0), 0);
        downloadsCount.innerText = totalDownloads;
    }

    // 4b. Populate pending submissions table
    const tbody = document.getElementById('admin-pending-tbody');
    if (!tbody) return;

    if (pendingPapers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 40px;">
                    <i class="fa-solid fa-square-circle-check" style="font-size: 24px; margin-bottom: 8px; display: block; color: var(--success);"></i>
                    No pending papers to verify. You are all caught up!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = pendingPapers.map(paper => {
        let detailsHtml = '';
        if (paper.category === 'university') {
            detailsHtml = `<strong>Univ:</strong> ${paper.university}<br><strong>Course:</strong> ${paper.course} (${paper.academicYear} Year, ${paper.semester} Sem) | <strong>Branch:</strong> ${paper.branch}`;
        } else if (paper.category === 'board') {
            detailsHtml = `<strong>Board:</strong> ${paper.board}<br><strong>Class:</strong> ${paper.classLevel}`;
        } else if (paper.category === 'competitive') {
            detailsHtml = `<strong>Exam:</strong> ${paper.exam}`;
        }

        return `
            <tr>
                <td>
                    <strong>${paper.uploaderName}</strong><br>
                    <span style="font-size: 12px; color: var(--text-muted);">${paper.uploaderEmail}</span>
                </td>
                <td>
                    <span style="font-size: 13px; font-weight: 600;">${paper.title}</span><br>
                    <span style="font-size: 12px; color: var(--text-secondary);">${detailsHtml} | <strong>Subject:</strong> ${paper.subject} | <strong>Year:</strong> ${paper.year}</span>
                </td>
                <td>
                    <a href="#" onclick="openPreviewModal('${paper.id}')" style="color: var(--accent); text-decoration: underline;" title="Preview PDF document">
                        <i class="fa-solid fa-file-pdf"></i> ${paper.fileName}
                    </a>
                </td>
                <td>
                    <div class="admin-actions-cell">
                        <button class="btn-sm btn-approve" onclick="approvePaper('${paper.id}')">
                            <i class="fa-solid fa-check"></i> Approve
                        </button>
                        <button class="btn-sm btn-reject" onclick="rejectPaper('${paper.id}')">
                            <i class="fa-solid fa-trash"></i> Reject
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// 5. Verification Actions: APPROVE
function approvePaper(paperId) {
    const pendingList = getPendingPapers();
    const approvedList = getApprovedPapers();

    const paperIdx = pendingList.findIndex(p => p.id === paperId);
    if (paperIdx === -1) {
        showAlert("Selected paper not found in pending list", "error");
        return;
    }

    // Extract paper, format ID for active db, push to approved database
    const paper = pendingList.splice(paperIdx, 1)[0];
    paper.id = "approved-" + Date.now(); // assign clean database index
    approvedList.push(paper);

    // Save lists
    savePendingPapers(pendingList);
    savePapers(approvedList);

    showAlert(`Approved: "${paper.subject} (${paper.year})" is now live!`, "success");
    renderAdminDashboard();
}

// 6. Verification Actions: REJECT
function rejectPaper(paperId) {
    const pendingList = getPendingPapers();
    const paperIdx = pendingList.findIndex(p => p.id === paperId);
    
    if (paperIdx === -1) {
        showAlert("Selected paper not found in pending list", "error");
        return;
    }

    if (confirm("Are you sure you want to reject and delete this paper submission? This action cannot be undone.")) {
        const deletedPaper = pendingList.splice(paperIdx, 1)[0];
        savePendingPapers(pendingList);
        
        showAlert(`Rejected submission: ${deletedPaper.subject} ${deletedPaper.year}`, "warning");
        renderAdminDashboard();
    }
}

// Initialize admin portal page
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main.js database initialization
    setTimeout(() => {
        checkLoginState();
    }, 80);
});
