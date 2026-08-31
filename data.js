const DEFAULT_PAPERS = [
    // BOARD PAPERS
    {
        id: "board-cbse-12-math-2023",
        title: "CBSE Class 12 Mathematics Question Paper 2023",
        category: "board",
        board: "CBSE",
        classLevel: "12th",
        subject: "Mathematics",
        year: "2023",
        fileName: "cbse_class12_math_2023.pdf",
        downloads: 1245
    },
    {
        id: "board-cbse-10-science-2022",
        title: "CBSE Class 10 Science Question Paper 2022",
        category: "board",
        board: "CBSE",
        classLevel: "10th",
        subject: "Science",
        year: "2022",
        fileName: "cbse_class10_science_2022.pdf",
        downloads: 890
    },
    {
        id: "board-icse-10-english-2023",
        title: "ICSE Class 10 English Literature Paper 2023",
        category: "board",
        board: "ICSE",
        classLevel: "10th",
        subject: "English",
        year: "2023",
        fileName: "icse_class10_english_2023.pdf",
        downloads: 654
    },
    {
        id: "board-isc-12-chemistry-2023",
        title: "ISC Class 12 Chemistry Theory Paper 2023",
        category: "board",
        board: "ICSE", // ISC is run by CISCE/ICSE council
        classLevel: "12th",
        subject: "Chemistry",
        year: "2023",
        fileName: "isc_class12_chemistry_2023.pdf",
        downloads: 780
    },

    // UNIVERSITY PAPERS
    {
        id: "univ-dtu-cse-dsa-2023",
        title: "Delhi Technical University (DTU) B.Tech Computer Science Data Structures Paper (3rd Year, 5th Sem, 2023)",
        category: "university",
        university: "Delhi Technical University (DTU)",
        course: "B.Tech",
        branch: "COMPUTER SCIENCE",
        academicYear: "3rd",
        semester: "5th",
        subject: "Data Structures & Algorithms",
        year: "2023",
        fileName: "dtu_btech_cse_dsa_2023.pdf",
        downloads: 520
    },
    {
        id: "univ-ymca-mech-thermo-2022",
        title: "YMCA University B.Tech Mechanical Thermodynamics Paper (2nd Year, 3rd Sem, 2022)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Mechanical",
        academicYear: "2nd",
        semester: "3rd",
        subject: "Thermodynamics",
        year: "2022",
        fileName: "ymca_be_mech_thermo_2022.pdf",
        downloads: 340
    },
    {
        id: "univ-dtu-ece-signals-2023",
        title: "Delhi Technical University (DTU) B.Tech ELECTRONICS Signals & Systems Question Paper (3rd Year, 5th Sem, 2023)",
        category: "university",
        university: "Delhi Technical University (DTU)",
        course: "B.Tech",
        branch: "ELECTRONICS",
        academicYear: "3rd",
        semester: "5th",
        subject: "Signals and Systems",
        year: "2023",
        fileName: "dtu_be_ece_signals_2023.pdf",
        downloads: 410
    },
    {
        id: "univ-dtu-bsc-physics-2023",
        title: "Delhi Technical University (DTU) B.Sc Physics Classical Mechanics Paper (1st Year, 1st Sem, 2023)",
        category: "university",
        university: "Delhi Technical University (DTU)",
        course: "B.Sc",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "Classical Mechanics",
        year: "2023",
        fileName: "dtu_bsc_phys_2023.pdf",
        downloads: 180
    },
    {
        id: "univ-ymca-bba-mkt-2022",
        title: "YMCA University B.BA Marketing Management Paper (2nd Year, 3rd Sem, 2022)",
        category: "university",
        university: "YMCA University",
        course: "B.BA",
        branch: "Marketing",
        academicYear: "2nd",
        semester: "3rd",
        subject: "Marketing Management",
        year: "2022",
        fileName: "ymca_bba_mkt_2022.pdf",
        downloads: 210
    },

    // YMCA 1st SEM COMMON PAPERS
    {
        id: "univ-ymca-1st-esc101-2023",
        title: "YMCA University ESC-101 Basic Electrical Technology Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "ESC-101 Basic Electrical Technology",
        year: "2023",
        fileName: "ymca_esc101_2023.pdf",
        downloads: 155
    },
    {
        id: "univ-ymca-1st-bsc102-2023",
        title: "YMCA University BSC-102 Chemistry Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "BSC-102 Chemistry",
        year: "2023",
        fileName: "ymca_bsc102_2023.pdf",
        downloads: 122
    },
    {
        id: "univ-ymca-1st-hsmc101-2023",
        title: "YMCA University HSMC-101 English Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "HSMC-101 English",
        year: "2023",
        fileName: "ymca_hsmc101_2023.pdf",
        downloads: 98
    },
    {
        id: "univ-ymca-1st-math101c-2023",
        title: "YMCA University 101-c Maths 101-C Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "101-c Maths 101-C",
        year: "2023",
        fileName: "ymca_math101c_2023.pdf",
        downloads: 198
    },
    {
        id: "univ-ymca-1st-math103a-2023",
        title: "YMCA University 103-a Maths 103-A Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "103-a Maths 103-A",
        year: "2023",
        fileName: "ymca_math103a_2023.pdf",
        downloads: 145
    },
    {
        id: "univ-ymca-1st-math103d-2023",
        title: "YMCA University 103-d Maths 103-D Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "103-d Maths 103-D",
        year: "2023",
        fileName: "ymca_math103d_2023.pdf",
        downloads: 112
    },
    {
        id: "univ-ymca-1st-math103e-2023",
        title: "YMCA University 103-e Maths 103-E Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "103-e Maths 103-E",
        year: "2023",
        fileName: "ymca_math103e_2023.pdf",
        downloads: 87
    },
    {
        id: "univ-ymca-1st-mathhas103c-2023",
        title: "YMCA University has-103-c Maths HAS 103-C Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "has-103-c Maths HAS 103-C",
        year: "2023",
        fileName: "ymca_mathhas103c_2023.pdf",
        downloads: 134
    },
    {
        id: "univ-ymca-1st-physbsc101d-2023",
        title: "YMCA University BSC-101-D Semiconductor Physics Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "BSC-101-D Semiconductor Physics",
        year: "2023",
        fileName: "ymca_phys101d_2023.pdf",
        downloads: 167
    },
    {
        id: "univ-ymca-1st-physbsc101c-2023",
        title: "YMCA University BSC-101-C Waves and Optics Paper (1st Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "1st",
        subject: "BSC-101-C Waves and Optics",
        year: "2023",
        fileName: "ymca_phys101c_2023.pdf",
        downloads: 142
    },

    // YMCA 2nd SEM COMMON PAPERS (ADDED FROM IMAGE DETECTED DATA)
    {
        id: "univ-ymca-2nd-egd-2023",
        title: "YMCA University ESCH-102A-21 EGD Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "ESCH-102A-21 EGD",
        year: "2023",
        fileName: "ymca_egd_2023.pdf",
        downloads: 140
    },
    {
        id: "univ-ymca-2nd-emt-2023",
        title: "YMCA University BSC-101-F Electromagnetic Theory Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "BSC-101-F Electromagnetic Theory",
        year: "2023",
        fileName: "ymca_emt_2023.pdf",
        downloads: 130
    },
    {
        id: "univ-ymca-2nd-ece-2023",
        title: "YMCA University MCEVS-01 Environment & Ecology Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "MCEVS-01 Environment & Ecology",
        year: "2023",
        fileName: "ymca_ece_2023.pdf",
        downloads: 160
    },
    {
        id: "univ-ymca-2nd-m106a-2023",
        title: "YMCA University 106-A Maths 106-A Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "106-A Maths 106-A",
        year: "2023",
        fileName: "ymca_math106a_2023.pdf",
        downloads: 125
    },
    {
        id: "univ-ymca-2nd-m106d-2023",
        title: "YMCA University 106-D Maths 106-D Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "106-D Maths 106-D",
        year: "2023",
        fileName: "ymca_math106d_2023.pdf",
        downloads: 135
    },
    {
        id: "univ-ymca-2nd-m106e-2023",
        title: "YMCA University 106-E Maths 106-E Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "106-E Maths 106-E",
        year: "2023",
        fileName: "ymca_math106e_2023.pdf",
        downloads: 148
    },
    {
        id: "univ-ymca-2nd-pps-2023",
        title: "YMCA University ESC-103 PPS Question Paper (2nd Sem, 2023)",
        category: "university",
        university: "YMCA University",
        course: "B.Tech",
        branch: "Common",
        academicYear: "1st",
        semester: "2nd",
        subject: "ESC-103 PPS",
        year: "2023",
        fileName: "ymca_pps_2023.pdf",
        downloads: 185
    },

    // COMPETITIVE EXAMS
    {
        id: "comp-jee-main-math-2024",
        title: "JEE Main 2024 Session 1 Mathematics Question Paper",
        category: "competitive",
        exam: "JEE MAIN",
        subject: "Mathematics",
        year: "2024",
        fileName: "jee_main_math_2024.pdf",
        downloads: 3450
    },
    {
        id: "comp-jee-adv-paper1-2023",
        title: "JEE Advanced 2023 Question Paper 1 (Physics, Chemistry, Maths)",
        category: "competitive",
        exam: "JEE ADVANCE",
        subject: "All Subjects",
        year: "2023",
        fileName: "jee_advanced_paper1_2023.pdf",
        downloads: 2980
    },
    {
        id: "comp-neet-biology-2023",
        title: "NEET UG 2023 Biology Code F1 Question Paper",
        category: "competitive",
        exam: "NEET",
        subject: "Biology",
        year: "2023",
        fileName: "neet_biology_code_f1_2023.pdf",
        downloads: 4120
    },
    {
        id: "comp-gate-cs-2024",
        title: "GATE 2024 Computer Science & Information Technology Paper",
        category: "competitive",
        exam: "GATE",
        subject: "Computer Science (CS)",
        year: "2024",
        fileName: "gate_cs_2024.pdf",
        downloads: 1890
    },
    {
        id: "comp-upsc-csat-2023",
        title: "UPSC Civil Services Prelims GS Paper II (CSAT) 2023",
        category: "competitive",
        exam: "UPSC",
        subject: "CSAT (Aptitude)",
        year: "2023",
        fileName: "upsc_prelims_csat_2023.pdf",
        downloads: 2450
    }
];

// Helper database objects for populating filter options dynamically
const FILTER_OPTIONS = {
    boards: ["CBSE", "ICSE", "State Board"],
    classes: ["10th", "12th"],
    universities: [
        "Delhi Technical University (DTU)",
        "YMCA University"
    ],
    courses: ["B.Tech", "B.Sc", "B.BA"],
    courseBranches: {
        "B.Tech": ["Mechanical", "CIVIL", "COMPUTER ENGINEERING", "COMPUTER SCIENCE", "ELECTRONICS", "ENVIRONMENTAL", "MATHEMATICS AND COMPUTING"],
        "B.Sc": ["Physics", "Chemistry", "Mathematics", "Computer Science"],
        "B.BA": ["Finance", "Marketing", "Human Resource (HR)", "Operations"]
    },
    academicYears: {
        "B.Tech": ["1st", "2nd", "3rd", "4th"],
        "B.Sc": ["1st", "2nd", "3rd"],
        "B.BA": ["1st", "2nd", "3rd"]
    },
    semesters: {
        "1st": ["1st", "2nd"],
        "2nd": ["3rd", "4th"],
        "3rd": ["5th", "6th"],
        "4th": ["7th", "8th"]
    },
    exams: ["JEE MAIN", "JEE ADVANCE", "NEET", "GATE", "UPSC"],
    years: ["2024", "2023", "2022", "2021", "2020", "2019"]
};
