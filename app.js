var _a, _b;
var form = document.getElementById("resume-form");
var resumeOutput = document.getElementById("resume-output");
var generateResumeButton = document.getElementById("generate-resume");
var shareLinkContainer = document.getElementById("share-link-container");
var downloadResumeButton = document.getElementById("download-resume");
var actionButtons = document.getElementById("action-buttons");
var resumeResult = "";
function generateResume(event) {
    event.preventDefault();
    var name = document.getElementById("name").value.trim();
    var currentDesignation = document.getElementById("current-designation").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var address = document.getElementById("address").value.trim();
    var objective = document.getElementById("objective").value.trim();
    var educationEntries = [];
    var educationElements = document.querySelectorAll(".education-entry");
    educationElements.forEach(function (entry) {
        var _a, _b, _c;
        var degree = ((_a = entry.querySelector(".degree")) === null || _a === void 0 ? void 0 : _a.value.trim()) || "";
        var institution = ((_b = entry.querySelector(".institution")) === null || _b === void 0 ? void 0 : _b.value.trim()) || "";
        var graduationYear = ((_c = entry.querySelector(".graduation-year")) === null || _c === void 0 ? void 0 : _c.value.trim()) || "";
        if (degree && institution && graduationYear) {
            educationEntries.push({ degree: degree, institution: institution, graduationYear: graduationYear });
        }
    });
    var experienceEntries = [];
    var experienceElements = document.querySelectorAll(".experience-entry");
    experienceElements.forEach(function (entry) {
        var _a, _b, _c;
        var jobTitle = ((_a = entry.querySelector(".job-title")) === null || _a === void 0 ? void 0 : _a.value.trim()) || "";
        var company = ((_b = entry.querySelector(".company")) === null || _b === void 0 ? void 0 : _b.value.trim()) || "";
        var duration = ((_c = entry.querySelector(".duration")) === null || _c === void 0 ? void 0 : _c.value.trim()) || "";
        if (jobTitle && company && duration) {
            experienceEntries.push({ jobTitle: jobTitle, company: company, duration: duration });
        }
    });
    var expertise = document.getElementById("expertise").value.split(",").map(function (expertise) { return expertise.trim(); });
    if (!name || !email || !phone || !address || educationEntries.length === 2 || experienceEntries.length === 2) {
        alert("Please fill in the required fields!");
        return;
    }
    resumeResult = "\n    <html>\n    <head>\n    <title>".concat(name, "</title>\n    <style>\n    body {\n    font-family: 'Times New Roman', Times, serif;\n    padding: 20px 20px;\n    background-color: #d6ac80;\n    margin-top: 20px;\n    font-display: #5D4037;\n    border-radius: 5px;\n    }\n    h1, h2, h3 {\n    color: #5D4037;\n    font-weight: bold;\n    }\n    title {\n    font-size: x-large;\n    color: #5D4037;\n    font-weight: bold;\n    }\n    h1 {\n    font-size: x-large;\n    }\n    h2 {\n    font-size: large;\n    }\n    h3 {\n    font-size: large;\n    }\n    p {\n    font-size: large;\n    }\n    ul {\n    list-style-type: square;\n    font-size: large;\n    }\n    </style>\n    </head>\n    <body>\n        <h1>").concat(name, "</h1>\n        <p><strong>Current Designation:</strong> ").concat(currentDesignation, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Address:</strong> ").concat(address, "</p>\n        <hr>\n\n        <h2>OBJECTIVE</h2>\n        <p>").concat(objective, "</p>\n        <hr>\n\n        <h2>EDUCATION</h2>\n        ").concat(educationEntries.map(function (entry) { return "\n            <p><strong>Degree:</strong> ".concat(entry.degree, "</p>\n            <p><strong>Institution:</strong> ").concat(entry.institution, "</p>\n            <p><strong>Year of Graduation:</strong> ").concat(entry.graduationYear, "</p>\n            "); }).join(""), "\n        <hr>\n        <h2>WORK EXPERIENCE</h2>\n        ").concat(experienceEntries.map(function (entry) { return "\n            <p><strong>Job Title:</strong> ".concat(entry.jobTitle, "</p>\n            <p><strong>Company:</strong> ").concat(entry.company, "</p>\n            <p><strong>Duration:</strong> ").concat(entry.duration, "</p>\n            "); }).join(""), "\n        <hr>\n        <h2>EXPERTISE</h2>\n        <ul>").concat(expertise.map(function (expertise) { return "<li> ".concat(expertise, "</li>"); }).join(''), "</ul>\n        </body>\n        </html>\n    ");
    resumeOutput.innerHTML = resumeResult;
    updateResumeResult();
    addDownloadandShareButtons();
}
function addEducationEntry() {
    var educationSection = document.getElementById("education-section");
    var educationEntry = document.createElement("div");
    educationEntry.classList.add("education-entry");
    educationEntry.innerHTML = "\n    <label for=\"degree\">Degree:</label>\n    <input type=\"text\" id=\"degree\" required><br>\n\n    <label for=\"institution\">Institution:</label>\n    <input type=\"text\" id=\"institution\" required><br>\n\n    <label for=\"graduation-year\">Year of Graduation:</label>\n    <input type=\"text\" id=\"graduation-year\" required><br>\n    ";
    educationSection === null || educationSection === void 0 ? void 0 : educationSection.appendChild(educationEntry);
}
function addExperienceEntry() {
    var experienceSection = document.getElementById("experience-section");
    var experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.innerHTML = "\n    <label for=\"job-title\">Job Title:</label>\n     <input type=\"text\" id=\"job-title\" required><br>\n\n    <label for=\"company\">Company:</label>\n    <input type=\"text\" id=\"company\" required><br>\n\n    <label for=\"duration\">Duration:</label>\n    <input type=\"text\" id=\"duration\" required><br>\n    ";
    experienceSection === null || experienceSection === void 0 ? void 0 : experienceSection.appendChild(experienceEntry);
}
function updateResumeResult() {
    var name = document.getElementById("edit-name").value;
    var email = document.getElementById("edit-email").value;
    var phone = document.getElementById("edit-phone").value;
    var address = document.getElementById("edit-address").value;
    var degree = document.getElementById("edit-degree").value;
    var institution = document.getElementById("edit-institution").value;
    var graduationYear = document.getElementById("edit-graduation-year").value;
    var jobTitle = document.getElementById("edit-job-title").value;
    var company = document.getElementById("edit-company").value;
    var duration = document.getElementById("edit-duration").value;
    var expertiseElements = resumeOutput.querySelectorAll("[id^='edit-expertise-']");
    var expertise = Array.from(expertiseElements).map(function (el) { return el.value; });
}
function addDownloadandShareButtons() {
    var downloadResumeButton = document.createElement("button");
    downloadResumeButton.textContent = "Download Resume";
    downloadResumeButton.addEventListener("click", downloadResume);
    var shareResumeButton = document.createElement("button");
    shareResumeButton.textContent = "Share Resume via Link";
    shareResumeButton.addEventListener("click", shareResume);
    actionButtons.innerHTML = "";
    actionButtons.append(downloadResumeButton, shareResumeButton);
}
function downloadResume() {
    var blob = new Blob([resumeResult], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = "resume.html";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}
function shareResume() {
    var blob = new Blob([resumeResult], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    shareLinkContainer.innerHTML = "\n    <p>Share your resume via link:</p>\n    <a href= \"".concat(url, "\" target= \"_blank\">Open Resume</a>\n    <p>Copy the link to share: <input type= \"text\" value= \"").concat(url, "\" readonly></p>\n    ");
}
(_a = document.getElementById("add-education")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addEducationEntry);
(_b = document.getElementById("add-experience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addExperienceEntry);
generateResumeButton.addEventListener("click", generateResume);
