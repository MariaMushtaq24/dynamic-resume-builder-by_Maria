const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeOutput = document.getElementById("resume-output") as HTMLDivElement;
const generateResumeButton = document.getElementById("generate-resume") as HTMLButtonElement;
const shareLinkContainer = document.getElementById("share-link-container") as HTMLDivElement;
const downloadResumeButton = document.getElementById("download-resume") as HTMLButtonElement;
const actionButtons = document.getElementById("action-buttons") as HTMLDivElement;
let resumeResult = "";

function generateResume(event: Event) {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const currentDesignation = (document.getElementById("current-designation") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
    const address = (document.getElementById("address") as HTMLInputElement).value.trim();

    const objective = (document.getElementById("objective") as HTMLInputElement).value.trim();

    const educationEntries : { degree: string; institution: string; graduationYear: string; } [] = [];
    const educationElements = document.querySelectorAll(".education-entry");
    educationElements.forEach(entry => {
        const degree = (entry.querySelector(".degree") as HTMLInputElement)?.value.trim() || "";
        const institution = (entry.querySelector(".institution") as HTMLInputElement)?.value.trim() || "";
        const graduationYear = (entry.querySelector(".graduation-year") as HTMLInputElement)?.value.trim() || "";

        if (degree && institution && graduationYear) {
            educationEntries.push({ degree, institution, graduationYear });
        }
    });
    
    const experienceEntries : { jobTitle: string; company: string; duration: string; } [] = [];
    const experienceElements = document.querySelectorAll(".experience-entry");
    experienceElements.forEach(entry => {
        const jobTitle = (entry.querySelector(".job-title") as HTMLInputElement)?.value.trim() || "";
        const company = (entry.querySelector(".company") as HTMLInputElement)?.value.trim() || "";
        const duration = (entry.querySelector(".duration") as HTMLInputElement)?.value.trim() || "";

        if (jobTitle && company && duration) {
            experienceEntries.push({ jobTitle, company, duration });
        }
    });
    
    const expertise = (document.getElementById("expertise") as HTMLInputElement).value.split(",").map(expertise => expertise.trim());


    if (!name || !email || !phone || !address || educationEntries.length === 2 || experienceEntries.length === 2) {
        alert("Please fill in the required fields!");
        return;
    }

   resumeResult = `
    <html>
    <head>
    <title>${name}</title>
    <style>
    body {
    font-family: 'Times New Roman', Times, serif;
    padding: 20px 20px;
    background-color: #d6ac80;
    margin-top: 20px;
    font-display: #5D4037;
    border-radius: 5px;
    }
    h1, h2, h3 {
    color: #5D4037;
    font-weight: bold;
    }
    title {
    font-size: x-large;
    color: #5D4037;
    font-weight: bold;
    }
    h1 {
    font-size: x-large;
    }
    h2 {
    font-size: large;
    }
    h3 {
    font-size: large;
    }
    p {
    font-size: large;
    }
    ul {
    list-style-type: square;
    font-size: large;
    }
    </style>
    </head>
    <body>
        <h1>${name}</h1>
        <p><strong>Current Designation:</strong> ${currentDesignation}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <hr>

        <h2>OBJECTIVE</h2>
        <p>${objective}</p>
        <hr>

        <h2>EDUCATION</h2>
        ${educationEntries.map(entry => `
            <p><strong>Degree:</strong> ${entry.degree}</p>
            <p><strong>Institution:</strong> ${entry.institution}</p>
            <p><strong>Year of Graduation:</strong> ${entry.graduationYear}</p>
            `).join("")}
        <hr>
        <h2>WORK EXPERIENCE</h2>
        ${experienceEntries.map(entry => `
            <p><strong>Job Title:</strong> ${entry.jobTitle}</p>
            <p><strong>Company:</strong> ${entry.company}</p>
            <p><strong>Duration:</strong> ${entry.duration}</p>
            `).join("")}
        <hr>
        <h2>EXPERTISE</h2>
        <ul>${expertise.map(expertise => `<li> ${expertise}</li>`).join('')}</ul>
        </body>
        </html>
    `;

resumeOutput.innerHTML = resumeResult;
updateResumeResult();
addDownloadandShareButtons();
}

function addEducationEntry (){
    const educationSection = document.getElementById("education-section")
    const educationEntry = document.createElement("div");
    educationEntry.classList.add("education-entry");
    educationEntry.innerHTML= `
    <label for="degree">Degree:</label>
    <input type="text" id="degree" required><br>

    <label for="institution">Institution:</label>
    <input type="text" id="institution" required><br>

    <label for="graduation-year">Year of Graduation:</label>
    <input type="text" id="graduation-year" required><br>
    `;
    educationSection?.appendChild(educationEntry);
}

function addExperienceEntry (){
    const experienceSection = document.getElementById("experience-section")
    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.innerHTML= `
    <label for="job-title">Job Title:</label>
     <input type="text" id="job-title" required><br>

    <label for="company">Company:</label>
    <input type="text" id="company" required><br>

    <label for="duration">Duration:</label>
    <input type="text" id="duration" required><br>
    `;
    experienceSection?.appendChild(experienceEntry);
}

function updateResumeResult (){
    const name = (document.getElementById("edit-name") as HTMLInputElement).value;
    const email = (document.getElementById("edit-email") as HTMLInputElement).value;
    const phone = (document.getElementById("edit-phone") as HTMLInputElement).value;
    const address = (document.getElementById("edit-address") as HTMLInputElement).value;
    const degree = (document.getElementById("edit-degree") as HTMLInputElement).value;
    const institution = (document.getElementById("edit-institution") as HTMLInputElement).value;
    const graduationYear = (document.getElementById("edit-graduation-year") as HTMLInputElement).value;
    const jobTitle = (document.getElementById("edit-job-title") as HTMLInputElement).value;
    const company = (document.getElementById("edit-company") as HTMLInputElement).value;
    const duration = (document.getElementById("edit-duration") as HTMLInputElement).value;

    const expertiseElements = resumeOutput.querySelectorAll("[id^='edit-expertise-']");
    const expertise = Array.from(expertiseElements).map(el => (el as HTMLInputElement).value);
}


function addDownloadandShareButtons() {
    const downloadResumeButton = document.createElement("button");
    downloadResumeButton.textContent = "Download Resume";
    downloadResumeButton.addEventListener ("click", downloadResume);

    const shareResumeButton = document.createElement("button");
    shareResumeButton.textContent = "Share Resume via Link";
    shareResumeButton.addEventListener ("click", shareResume);

    actionButtons.innerHTML = "";
    actionButtons.append(downloadResumeButton, shareResumeButton);
}


function downloadResume() {
    const blob = new Blob([resumeResult], { type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `resume.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

function shareResume() {
    const blob = new Blob([resumeResult], {type: 'text/html'});
    const url = URL.createObjectURL(blob);

    shareLinkContainer.innerHTML = `
    <p>Share your resume via link:</p>
    <a href= "${url}" target= "_blank">Open Resume</a>
    <p>Copy the link to share: <input type= "text" value= "${url}" readonly></p>
    `;
}

document.getElementById("add-education")?.addEventListener("click", addEducationEntry);
document.getElementById("add-experience")?.addEventListener("click", addExperienceEntry);
generateResumeButton.addEventListener("click", generateResume);