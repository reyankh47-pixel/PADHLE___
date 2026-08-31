// Upload Page Form Controls

let selectedUploadFile = null;

// 1. Populate Dropdown Selections on startup
function populateUploadSelections() {
    const yearSel = document.getElementById('upload-year');
    const univSel = document.getElementById('upload-univ-name');
    const courseSel = document.getElementById('upload-course');
    const boardSel = document.getElementById('upload-board-name');
    const classSel = document.getElementById('upload-class-level');
    const examSel = document.getElementById('upload-exam-name');

    // Populate Year options
    if (yearSel) {
        yearSel.innerHTML = '<option value="" disabled selected>Choose Year...</option>';
        FILTER_OPTIONS.years.forEach(year => {
            yearSel.innerHTML += `<option value="${year}">${year}</option>`;
        });
    }
    // Populate Univ
    if (univSel) {
        univSel.innerHTML = '<option value="" disabled selected>Choose University...</option>';
        FILTER_OPTIONS.universities.forEach(univ => {
            univSel.innerHTML += `<option value="${univ}">${univ}</option>`;
        });
    }
    // Populate Courses
    if (courseSel) {
        courseSel.innerHTML = '<option value="" disabled selected>Choose Course...</option>';
        FILTER_OPTIONS.courses.forEach(course => {
            courseSel.innerHTML += `<option value="${course}">${course}</option>`;
        });
    }
    // Populate Boards
    if (boardSel) {
        boardSel.innerHTML = '<option value="" disabled selected>Choose Board...</option>';
        FILTER_OPTIONS.boards.forEach(board => {
            boardSel.innerHTML += `<option value="${board}">${board}</option>`;
        });
    }
    // Populate Class Level
    if (classSel) {
        classSel.innerHTML = '<option value="" disabled selected>Choose Class...</option>';
        FILTER_OPTIONS.classes.forEach(cls => {
            classSel.innerHTML += `<option value="${cls}">${cls}</option>`;
        });
    }
    // Populate Exam Names
    if (examSel) {
        examSel.innerHTML = '<option value="" disabled selected>Choose Exam...</option>';
        FILTER_OPTIONS.exams.forEach(exam => {
            examSel.innerHTML += `<option value="${exam}">${exam}</option>`;
        });
    }
}

// 2. Dynamic Course Change Handler for Upload Form
function handleUploadCourseChange() {
    const courseVal = document.getElementById('upload-course').value;
    const branchSel = document.getElementById('upload-branch');
    const academicYearSel = document.getElementById('upload-academic-year');
    const semesterGroup = document.getElementById('upload-semester-group');
    const semesterSel = document.getElementById('upload-semester');
    const branchGroup = document.getElementById('upload-branch-group');

    if (!courseVal) return;

    // Reset Branch and Semester
    if (branchSel) branchSel.value = '';
    if (semesterSel) semesterSel.value = '';
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (branchGroup) branchGroup.style.display = 'block';

    // Populate academic years for this course first
    if (academicYearSel) {
        academicYearSel.innerHTML = '<option value="" disabled selected>Choose Academic Year...</option>';
        const years = FILTER_OPTIONS.academicYears[courseVal] || [];
        years.forEach(yr => {
            academicYearSel.innerHTML += `<option value="${yr}">${yr} Year</option>`;
        });
    }
}

// 3. Dynamic Year Change Handler for Upload Form
function handleUploadYearChange() {
    const courseVal = document.getElementById('upload-course').value;
    const yearVal = document.getElementById('upload-academic-year').value;
    const branchSel = document.getElementById('upload-branch');
    const branchGroup = document.getElementById('upload-branch-group');
    const semesterGroup = document.getElementById('upload-semester-group');
    const semesterSel = document.getElementById('upload-semester');

    if (semesterSel) {
        semesterSel.innerHTML = '<option value="" disabled selected>Choose Semester...</option>';
        semesterSel.required = false;
        semesterSel.value = '';
    }
    if (branchSel) {
        branchSel.innerHTML = '<option value="" disabled selected>Choose Branch...</option>';
        branchSel.required = false;
        branchSel.value = '';
    }

    if (yearVal) {
        if (yearVal === '1st') {
            // For 1st Year: SKIP branch! Directly ask for Semester.
            if (branchGroup) branchGroup.style.display = 'none';
            if (branchSel) branchSel.required = false;
            
            // Show Semester
            if (semesterGroup) semesterGroup.style.display = 'block';
            if (semesterSel) {
                semesterSel.required = true;
                const sems = FILTER_OPTIONS.semesters[yearVal] || [];
                sems.forEach(sem => {
                    semesterSel.innerHTML += `<option value="${sem}">${sem} Sem</option>`;
                });
            }
        } else {
            // For other years: SHOW Branch selector first, Semester selector also visible
            if (branchGroup) branchGroup.style.display = 'block';
            if (branchSel) {
                branchSel.required = true;
                const branches = FILTER_OPTIONS.courseBranches[courseVal] || [];
                branches.forEach(branch => {
                    branchSel.innerHTML += `<option value="${branch}">${branch}</option>`;
                });
            }

            if (semesterGroup) semesterGroup.style.display = 'block';
            if (semesterSel) {
                semesterSel.required = true;
                const sems = FILTER_OPTIONS.semesters[yearVal] || [];
                sems.forEach(sem => {
                    semesterSel.innerHTML += `<option value="${sem}">${sem} Sem</option>`;
                });
            }
        }
    } else {
        if (branchGroup) branchGroup.style.display = 'block';
        if (semesterGroup) semesterGroup.style.display = 'none';
    }
}

// 4. Toggles conditional fields based on Category selection
function toggleUploadCategoryFields() {
    const category = document.getElementById('upload-category').value;
    
    const univSection = document.getElementById('upload-univ-fields');
    const boardSection = document.getElementById('upload-board-fields');
    const compSection = document.getElementById('upload-comp-fields');

    // Section references
    const univName = document.getElementById('upload-univ-name');
    const course = document.getElementById('upload-course');
    const branch = document.getElementById('upload-branch');
    const branchGroup = document.getElementById('upload-branch-group');
    const academicYear = document.getElementById('upload-academic-year');
    const semester = document.getElementById('upload-semester');
    const boardName = document.getElementById('upload-board-name');
    const classLevel = document.getElementById('upload-class-level');
    const examName = document.getElementById('upload-exam-name');
    const semesterGroup = document.getElementById('upload-semester-group');

    // Reset visibility & required states
    univSection.style.display = 'none';
    boardSection.style.display = 'none';
    compSection.style.display = 'none';
    if (semesterGroup) semesterGroup.style.display = 'none';
    if (branchGroup) branchGroup.style.display = 'block';

    univName.required = false;
    course.required = false;
    branch.required = false;
    academicYear.required = false;
    semester.required = false;
    boardName.required = false;
    classLevel.required = false;
    examName.required = false;

    if (category === 'university') {
        univSection.style.display = 'block';
        univName.required = true;
        course.required = true;
        academicYear.required = true;
    } else if (category === 'board') {
        boardSection.style.display = 'block';
        boardName.required = true;
        classLevel.required = true;
    } else if (category === 'competitive') {
        compSection.style.display = 'block';
        examName.required = true;
    }
}

// 5. Simulated File selection and drag-drop handlers
function handleFileSelect(event) {
    const file = event.target.files[0];
    updateFileUI(file);
}

function updateFileUI(file) {
    const infoText = document.getElementById('file-info-text');
    const dropArea = document.getElementById('file-drop-area');

    if (file) {
        if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
            showAlert("Please upload a PDF file only", "error");
            selectedUploadFile = null;
            document.getElementById('file-uploader-input').value = '';
            infoText.style.display = 'none';
            return;
        }

        selectedUploadFile = file;
        infoText.innerHTML = `<i class="fa-solid fa-file-circle-check"></i> Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        infoText.style.display = 'block';
        showAlert("PDF loaded! Ready to submit.", "success");
    } else {
        selectedUploadFile = null;
        infoText.style.display = 'none';
    }
}

// Drag & drop micro-interactions
function initDragAndDrop() {
    const dropArea = document.getElementById('file-drop-area');
    if (!dropArea) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropArea.style.borderColor = 'var(--accent)';
            dropArea.style.background = 'var(--accent-light)';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropArea.style.borderColor = 'var(--border-color)';
            dropArea.style.background = 'var(--bg-primary)';
        }, false);
    });

    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        const fileInput = document.getElementById('file-uploader-input');
        if (fileInput) {
            fileInput.files = dt.files;
            updateFileUI(file);
        }
    }, false);
}

// 6. Form Submission and Local Storage Save
function handlePaperSubmit(event) {
    event.preventDefault();

    if (!selectedUploadFile) {
        showAlert("Please upload a question paper PDF", "error");
        return;
    }

    // Get basic details
    const name = document.getElementById('uploader-name').value.trim();
    const email = document.getElementById('uploader-email').value.trim();
    const category = document.getElementById('upload-category').value;
    const subject = document.getElementById('upload-subject').value.trim();
    const year = document.getElementById('upload-year').value;

    let paperTitle = '';
    const newPaper = {
        id: "pending-" + Date.now(),
        category: category,
        subject: subject,
        year: year,
        fileName: selectedUploadFile.name,
        downloads: 0,
        uploaderName: name,
        uploaderEmail: email,
        uploadDate: new Date().toLocaleDateString()
    };

    // Category conditional extra details
    if (category === 'university') {
        const univ = document.getElementById('upload-univ-name').value;
        const course = document.getElementById('upload-course').value;
        const academicYear = document.getElementById('upload-academic-year').value;
        const branch = academicYear === '1st' ? 'Common' : document.getElementById('upload-branch').value;
        const semester = document.getElementById('upload-semester').value;
        
        newPaper.university = univ;
        newPaper.course = course;
        newPaper.branch = branch;
        newPaper.academicYear = academicYear;
        newPaper.semester = semester;
        
        paperTitle = `${univ} ${course} ${branch} ${subject} Paper (${academicYear} Year, ${semester} Sem)`;
    } else if (category === 'board') {
        const board = document.getElementById('upload-board-name').value;
        const cls = document.getElementById('upload-class-level').value;
        newPaper.board = board;
        newPaper.classLevel = cls;
        paperTitle = `${board} Class ${cls} ${subject} Question Paper`;
    } else if (category === 'competitive') {
        const exam = document.getElementById('upload-exam-name').value;
        newPaper.exam = exam;
        paperTitle = `${exam} Exam ${subject} Question Paper`;
    }

    newPaper.title = paperTitle;

    // Load, push, and save
    const pendingList = getPendingPapers();
    pendingList.push(newPaper);
    savePendingPapers(pendingList);

    showAlert("Submission received! Pending admin verification.", "success");

    // Reset Form
    document.getElementById('upload-paper-form').reset();
    selectedUploadFile = null;
    document.getElementById('file-info-text').style.display = 'none';
    toggleUploadCategoryFields();

    // Redirect to browse list after 2 seconds
    setTimeout(() => {
        window.location.href = "browse.html";
    }, 2200);
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    populateUploadSelections();
    initDragAndDrop();
});
