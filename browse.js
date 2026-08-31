// Browse Page Interactive Filters Controller

let selectedCategory = 'all'; // Default tab category state

// 1. Populate Dropdown Lists dynamically from Metadata
function populateDropdownOptions() {
    const yearSelect = document.getElementById('year-select');
    const univSelect = document.getElementById('univ-select');
    const boardSelect = document.getElementById('board-select');
    const classSelect = document.getElementById('class-select');
    const examSelect = document.getElementById('exam-select');

    // Reset dropdowns
    if (yearSelect) yearSelect.innerHTML = '<option value="">All Years</option>';
    if (univSelect) univSelect.innerHTML = '<option value="">Select University</option>';
    if (boardSelect) boardSelect.innerHTML = '<option value="">All Boards</option>';
    if (classSelect) classSelect.innerHTML = '<option value="">All Classes</option>';
    if (examSelect) examSelect.innerHTML = '<option value="">All Exams</option>';

    // Populate Years
    if (yearSelect) {
        FILTER_OPTIONS.years.forEach(year => {
            yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
        });
    }

    // Populate Universities
    if (univSelect) {
        FILTER_OPTIONS.universities.forEach(univ => {
            univSelect.innerHTML += `<option value="${univ}">${univ}</option>`;
        });
    }

    // Populate Boards
    if (boardSelect) {
        FILTER_OPTIONS.boards.forEach(board => {
            boardSelect.innerHTML += `<option value="${board}">${board}</option>`;
        });
    }

    // Populate Classes
    if (classSelect) {
        FILTER_OPTIONS.classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
        });
    }

    // Populate Exams
    if (examSelect) {
        FILTER_OPTIONS.exams.forEach(exam => {
            examSelect.innerHTML += `<option value="${exam}">${exam}</option>`;
        });
    }
}

// 2. Tab Selection Logic (Shows/Hides dynamic input sections)
function selectCategoryTab(category) {
    selectedCategory = category;

    // Reset tab active CSS classes
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Set clicked tab active
    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Display appropriate conditional filter groups
    const univSection = document.getElementById('univ-filters');
    const boardSection = document.getElementById('board-filters');
    const compSection = document.getElementById('comp-filters');

    if (univSection) univSection.style.display = category === 'university' ? 'block' : 'none';
    if (boardSection) boardSection.style.display = category === 'board' ? 'block' : 'none';
    if (compSection) compSection.style.display = category === 'competitive' ? 'block' : 'none';

    // Clear conditional filter values when switching categories
    resetConditionalInputs();
    hideUnivSubFilters();

    handleFilterChange();
}

function hideUnivSubFilters() {
    const courseGroup = document.getElementById('course-filter-group');
    const branchGroup = document.getElementById('branch-filter-group');
    const yearGroup = document.getElementById('academic-year-filter-group');
    const semesterGroup = document.getElementById('semester-filter-group');
    const subjectGroup = document.getElementById('subject-filter-group');

    if (courseGroup) courseGroup.style.display = 'none';
    if (branchGroup) branchGroup.style.display = 'none';
    if (yearGroup) yearGroup.style.display = 'none';
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (subjectGroup) subjectGroup.style.display = 'none';
}

function resetConditionalInputs() {
    const inputs = [
        'univ-select', 'course-select', 'branch-select', 
        'academic-year-select', 'semester-select', 'subject-select', 
        'board-select', 'class-select', 'exam-select'
    ];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// 3. Sequential Dropdown Handlers for Universities
function handleUniversityChange() {
    const univVal = document.getElementById('univ-select').value;
    const courseSelect = document.getElementById('course-select');
    const courseGroup = document.getElementById('course-filter-group');

    // Reset subsequent dropdown values
    document.getElementById('course-select').value = '';
    document.getElementById('branch-select').value = '';
    document.getElementById('academic-year-select').value = '';
    document.getElementById('semester-select').value = '';
    document.getElementById('subject-select').value = '';

    // Hide subsequent filters
    hideUnivSubFilters();

    if (univVal) {
        // Show Course Dropdown
        if (courseGroup) courseGroup.style.display = 'block';
        if (courseSelect) {
            courseSelect.innerHTML = '<option value="">Select Course</option>';
            FILTER_OPTIONS.courses.forEach(course => {
                courseSelect.innerHTML += `<option value="${course}">${course}</option>`;
            });
        }
    }

    handleFilterChange();
}

function handleCourseChange() {
    const courseVal = document.getElementById('course-select').value;
    const yearSelect = document.getElementById('academic-year-select');
    const yearGroup = document.getElementById('academic-year-filter-group');

    // Reset subsequent
    document.getElementById('branch-select').value = '';
    document.getElementById('academic-year-select').value = '';
    document.getElementById('semester-select').value = '';
    document.getElementById('subject-select').value = '';

    // Hide subsequent
    const branchGroup = document.getElementById('branch-filter-group');
    const semesterGroup = document.getElementById('semester-filter-group');
    const subjectGroup = document.getElementById('subject-filter-group');
    if (branchGroup) branchGroup.style.display = 'none';
    if (yearGroup) yearGroup.style.display = 'none';
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (subjectGroup) subjectGroup.style.display = 'none';

    if (courseVal) {
        // Show Academic Year Dropdown directly after Course selection
        if (yearGroup) yearGroup.style.display = 'block';
        if (yearSelect) {
            yearSelect.innerHTML = '<option value="">Select Year</option>';
            const years = FILTER_OPTIONS.academicYears[courseVal] || [];
            years.forEach(yr => {
                yearSelect.innerHTML += `<option value="${yr}">${yr} Year</option>`;
            });
        }
    }

    handleFilterChange();
}

function handleAcademicYearChange() {
    const courseVal = document.getElementById('course-select').value;
    const yearVal = document.getElementById('academic-year-select').value;
    
    const branchSelect = document.getElementById('branch-select');
    const branchGroup = document.getElementById('branch-filter-group');
    const semesterSelect = document.getElementById('semester-select');
    const semesterGroup = document.getElementById('semester-filter-group');

    // Reset subsequent
    document.getElementById('branch-select').value = '';
    document.getElementById('semester-select').value = '';
    document.getElementById('subject-select').value = '';

    // Hide subsequent
    const subjectGroup = document.getElementById('subject-filter-group');
    if (branchGroup) branchGroup.style.display = 'none';
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (subjectGroup) subjectGroup.style.display = 'none';

    if (yearVal) {
        if (yearVal === '1st') {
            // For 1st Year: SKIP branch! Directly ask for Semester.
            if (semesterGroup) semesterGroup.style.display = 'block';
            if (semesterSelect) {
                semesterSelect.innerHTML = '<option value="">Select Semester</option>';
                const sems = FILTER_OPTIONS.semesters[yearVal] || [];
                sems.forEach(sem => {
                    semesterSelect.innerHTML += `<option value="${sem}">${sem} Sem</option>`;
                });
            }
        } else {
            // For other years: SHOW Branch selector first
            if (branchGroup) branchGroup.style.display = 'block';
            if (branchSelect) {
                branchSelect.innerHTML = '<option value="">Select Branch</option>';
                const branches = FILTER_OPTIONS.courseBranches[courseVal] || [];
                branches.forEach(branch => {
                    branchSelect.innerHTML += `<option value="${branch}">${branch}</option>`;
                });
            }
        }
    }

    handleFilterChange();
}

function handleBranchChange() {
    const yearVal = document.getElementById('academic-year-select').value;
    const semesterSelect = document.getElementById('semester-select');
    const semesterGroup = document.getElementById('semester-filter-group');

    // Reset subsequent
    document.getElementById('semester-select').value = '';
    document.getElementById('subject-select').value = '';

    // Hide subsequent
    const subjectGroup = document.getElementById('subject-filter-group');
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (subjectGroup) subjectGroup.style.display = 'none';

    const branchVal = document.getElementById('branch-select').value;
    if (branchVal) {
        // Show Semester Dropdown
        if (semesterGroup) semesterGroup.style.display = 'block';
        if (semesterSelect) {
            semesterSelect.innerHTML = '<option value="">Select Semester</option>';
            const sems = FILTER_OPTIONS.semesters[yearVal] || [];
            sems.forEach(sem => {
                semesterSelect.innerHTML += `<option value="${sem}">${sem} Sem</option>`;
            });
        }
    }

    handleFilterChange();
}

function handleSemesterChange() {
    const univVal = document.getElementById('univ-select').value;
    const courseVal = document.getElementById('course-select').value;
    const yearVal = document.getElementById('academic-year-select').value;
    const branchVal = yearVal === '1st' ? 'Common' : document.getElementById('branch-select').value;
    const semesterVal = document.getElementById('semester-select').value;
    
    const subjectSelect = document.getElementById('subject-select');
    const subjectGroup = document.getElementById('subject-filter-group');

    // Reset subsequent
    document.getElementById('subject-select').value = '';
    if (subjectGroup) subjectGroup.style.display = 'none';

    if (semesterVal) {
        // Find matching papers in DB to fetch available subjects
        const papers = getApprovedPapers() || [];
        const matchingSubjects = new Set();

        papers.forEach(paper => {
            if (paper.category === 'university' &&
                paper.university === univVal &&
                paper.course === courseVal &&
                paper.branch === branchVal &&
                paper.academicYear === yearVal &&
                paper.semester === semesterVal) {
                matchingSubjects.add(paper.subject);
            }
        });

        // Show Subject Dropdown
        if (subjectGroup) subjectGroup.style.display = 'block';
        if (subjectSelect) {
            subjectSelect.innerHTML = '<option value="">Select Subject</option>';
            matchingSubjects.forEach(sub => {
                subjectSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
            });
        }
    }

    handleFilterChange();
}

// 4. Filter Processing Engine
function handleFilterChange() {
    const papers = getApprovedPapers() || [];
    
    // Read Filter Input Values
    const searchKeyword = document.getElementById('filter-search-input')?.value.toLowerCase().trim() || '';
    const selectedYear = document.getElementById('year-select')?.value || '';
    
    // University values
    const selectedUniv = document.getElementById('univ-select')?.value || '';
    const selectedCourse = document.getElementById('course-select')?.value || '';
    const selectedAcademicYear = document.getElementById('academic-year-select')?.value || '';
    const selectedBranch = selectedAcademicYear === '1st' ? 'Common' : (document.getElementById('branch-select')?.value || '');
    const selectedSemester = document.getElementById('semester-select')?.value || '';
    const selectedSubject = document.getElementById('subject-select')?.value || '';

    // Board values
    const selectedBoard = document.getElementById('board-select')?.value || '';
    const selectedClass = document.getElementById('class-select')?.value || '';

    // Competitive values
    const selectedExam = document.getElementById('exam-select')?.value || '';
    const sortBy = document.getElementById('sort-select')?.value || 'downloads';

    // Filter Papers Array
    const filtered = papers.filter(paper => {
        // Tab Category Filter
        if (selectedCategory !== 'all' && paper.category !== selectedCategory) {
            return false;
        }

        // Global Keyword Search Filter
        if (searchKeyword) {
            const inTitle = paper.title.toLowerCase().includes(searchKeyword);
            const inSubject = paper.subject.toLowerCase().includes(searchKeyword);
            const inUniv = paper.university ? paper.university.toLowerCase().includes(searchKeyword) : false;
            const inBranch = paper.branch ? paper.branch.toLowerCase().includes(searchKeyword) : false;
            const inBoard = paper.board ? paper.board.toLowerCase().includes(searchKeyword) : false;
            const inExam = paper.exam ? paper.exam.toLowerCase().includes(searchKeyword) : false;
            
            if (!inTitle && !inSubject && !inUniv && !inBranch && !inBoard && !inExam) {
                return false;
            }
        }

        // Year (Calendar Year) Filter
        if (selectedYear && paper.year !== selectedYear) {
            return false;
        }

        // Category-Specific Filters
        if (selectedCategory === 'university') {
            if (selectedUniv && paper.university !== selectedUniv) return false;
            if (selectedCourse && paper.course !== selectedCourse) return false;
            if (selectedAcademicYear && paper.academicYear !== selectedAcademicYear) return false;
            if (selectedAcademicYear === '1st') {
                if (paper.branch !== 'Common') return false;
            } else {
                if (selectedBranch && paper.branch !== selectedBranch) return false;
            }
            if (selectedSemester && paper.semester !== selectedSemester) return false;
            if (selectedSubject && paper.subject !== selectedSubject) return false;
        } else if (selectedCategory === 'board') {
            if (selectedBoard && paper.board !== selectedBoard) return false;
            if (selectedClass && paper.classLevel !== selectedClass) return false;
        } else if (selectedCategory === 'competitive') {
            if (selectedExam && paper.exam !== selectedExam) return false;
        }

        return true;
    });

    // Sort Papers Array
    filtered.sort((a, b) => {
        if (sortBy === 'downloads') {
            return b.downloads - a.downloads;
        } else if (sortBy === 'year-desc') {
            return parseInt(b.year) - parseInt(a.year);
        } else if (sortBy === 'year-asc') {
            return parseInt(a.year) - parseInt(b.year);
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    renderPapers(filtered);
}

// 5. Render Papers to DOM
function renderPapers(papers = []) {
    const grid = document.getElementById('papers-results-grid');
    const countText = document.getElementById('results-count-text');

    if (!grid) return;

    if (countText) {
        countText.innerText = `Found ${papers.length} paper${papers.length === 1 ? '' : 's'}`;
    }

    if (papers.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fa-regular fa-folder-open"></i>
                <h3>No Question Papers Found</h3>
                <p>Try clearing some filters, searching a different keyword, or upload a paper yourself to help out!</p>
                <button class="btn-primary" style="margin-top: 20px;" onclick="window.location.href='upload.html'">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload Paper
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = papers.map(paper => {
        let typeTagClass = '';
        let typeText = '';
        let detailsHtml = '';

        if (paper.category === 'university') {
            typeTagClass = 'tag-university';
            typeText = 'University';
            detailsHtml = `
                <div class="paper-detail-item"><i class="fa-solid fa-graduation-cap"></i> Univ: <span>${paper.university}</span></div>
                <div class="paper-detail-item"><i class="fa-solid fa-book-open"></i> Course: <span>${paper.course} (${paper.academicYear} Year, ${paper.semester} Sem)</span></div>
                <div class="paper-detail-item"><i class="fa-solid fa-code-branch"></i> Branch: <span>${paper.branch}</span></div>
                <div class="paper-detail-item"><i class="fa-solid fa-book"></i> Subject: <span>${paper.subject}</span></div>
            `;
        } else if (paper.category === 'board') {
            typeTagClass = 'tag-board';
            typeText = `${paper.board} Board`;
            detailsHtml = `
                <div class="paper-detail-item"><i class="fa-solid fa-school"></i> Class: <span>${paper.classLevel}</span></div>
                <div class="paper-detail-item"><i class="fa-solid fa-book"></i> Subject: <span>${paper.subject}</span></div>
            `;
        } else {
            typeTagClass = 'tag-competitive';
            typeText = paper.exam;
            detailsHtml = `
                <div class="paper-detail-item"><i class="fa-solid fa-graduation-cap"></i> Exam: <span>${paper.exam}</span></div>
                <div class="paper-detail-item"><i class="fa-solid fa-book"></i> Subject: <span>${paper.subject}</span></div>
            `;
        }

        return `
            <div class="paper-card">
                <div class="paper-meta">
                    <span class="paper-type-tag ${typeTagClass}">${typeText}</span>
                    <span class="paper-year">${paper.year} PYQ</span>
                </div>
                <h3 class="paper-title">${paper.title}</h3>
                <div class="paper-details">
                    ${detailsHtml}
                    <div class="paper-detail-item"><i class="fa-solid fa-circle-down"></i> Downloads: <span>${paper.downloads}</span></div>
                </div>
                <div class="paper-actions">
                    <button class="btn-secondary" onclick="openPreviewModal('${paper.id}')"><i class="fa-solid fa-eye"></i> View</button>
                    <button class="btn-primary" onclick="simulateDownload('${paper.id}')"><i class="fa-solid fa-download"></i> Download</button>
                </div>
            </div>
        `;
    }).join('');
}

// 6. Reset All Form Inputs
function resetFilters() {
    const keywordInput = document.getElementById('filter-search-input');
    const yearSelect = document.getElementById('year-select');
    
    if (keywordInput) keywordInput.value = '';
    if (yearSelect) yearSelect.value = '';
    
    resetConditionalInputs();
    hideUnivSubFilters();
    selectCategoryTab('all');
    showAlert('Filters reset successfully', 'success');
}

// 7. Handle Query Strings on Page Load
function parseQueryParameters() {
    const params = new URLSearchParams(window.location.search);
    
    const searchParam = params.get('search');
    const catParam = params.get('cat');
    const sortParam = params.get('sort');

    if (searchParam) {
        const input = document.getElementById('filter-search-input');
        if (input) input.value = decodeURIComponent(searchParam);
    }

    if (sortParam) {
        const sortSel = document.getElementById('sort-select');
        if (sortSel) sortSel.value = sortParam;
    }

    if (catParam && ['university', 'board', 'competitive'].includes(catParam)) {
        selectCategoryTab(catParam);
    } else {
        selectCategoryTab('all');
    }
}

// Initialize Browse Operations
document.addEventListener('DOMContentLoaded', () => {
    populateDropdownOptions();
    setTimeout(() => {
        parseQueryParameters();
    }, 50);
});
