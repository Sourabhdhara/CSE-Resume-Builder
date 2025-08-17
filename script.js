// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Add education section
document.getElementById('addEducation').addEventListener('click', () => {
    const eduContainer = document.getElementById('educationContainer');
    const newEdu = document.createElement('div');
    newEdu.className = 'optional-section';
    newEdu.innerHTML = `
        <div class="form-group">
            <label>Degree/Certificate</label>
            <input type="text" class="form-control edu-degree" placeholder="Bachelor of Science in Computer Science">
        </div>
        <div class="form-group">
            <label>Institution</label>
            <input type="text" class="form-control edu-institution" placeholder="University of Technology">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="form-control edu-date" placeholder="2019 - 2023">
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" class="form-control edu-location" placeholder="San Francisco, CA">
        </div>
        <div class="form-group">
            <label>CGPA/Score</label>
            <input type="text" class="form-control edu-score" placeholder="8.96/10.0">
        </div>
        <div class="form-group">
            <label>Relevant Coursework</label>
            <textarea class="form-control edu-coursework" rows="2" placeholder="Computer Architecture, DBMS..."></textarea>
        </div>
        <button class="btn btn-sm remove-btn"><i class="fas fa-trash"></i> Remove</button>
    `;
    eduContainer.appendChild(newEdu);
    newEdu.querySelector('.remove-btn').addEventListener('click', () => {
        newEdu.remove();
        updatePreview();
    });
    newEdu.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
});

// Add experience section
document.getElementById('addExperience').addEventListener('click', () => {
    const expContainer = document.getElementById('experienceContainer');
    const newExp = document.createElement('div');
    newExp.className = 'optional-section';
    newExp.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="form-control exp-title" placeholder="Software Developer Intern">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="form-control exp-company" placeholder="Tech Solutions Inc.">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="form-control exp-date" placeholder="Jun 2022 - Aug 2022">
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" class="form-control exp-location" placeholder="San Francisco, CA">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control exp-description" rows="2" placeholder="Developed web applications..."></textarea>
        </div>
        <button class="btn btn-sm remove-btn"><i class="fas fa-trash"></i> Remove</button>
    `;
    expContainer.appendChild(newExp);
    newExp.querySelector('.remove-btn').addEventListener('click', () => {
        newExp.remove();
        updatePreview();
    });
    newExp.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
});

// Add project
document.getElementById('addProject').addEventListener('click', () => {
    const projectsContainer = document.getElementById('projectsContainer');
    const newProject = document.createElement('div');
    newProject.className = 'optional-section';
    newProject.innerHTML = `
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="form-control project-title" placeholder="E-Commerce Website">
        </div>
        <div class="form-group">
            <label>Project Link</label>
            <input type="text" class="form-control project-link" placeholder="https://github.com/username/project">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control project-description" rows="2" placeholder="Built a full-stack..."></textarea>
        </div>
        <button class="btn btn-sm remove-btn"><i class="fas fa-trash"></i> Remove</button>
    `;
    projectsContainer.appendChild(newProject);
    newProject.querySelector('.remove-btn').addEventListener('click', () => {
        newProject.remove();
        updatePreview();
    });
    newProject.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
});

// Add certification
document.getElementById('addCertification').addEventListener('click', () => {
    const certsContainer = document.getElementById('certificationsContainer');
    const newCert = document.createElement('div');
    newCert.className = 'optional-section';
    newCert.innerHTML = `
        <div class="form-group">
            <label>Certification Name</label>
            <input type="text" class="form-control cert-name" placeholder="AWS Certified Developer">
        </div>
        <div class="form-group">
            <label>Issuing Organization</label>
            <input type="text" class="form-control cert-org" placeholder="Amazon Web Services">
        </div>
        <button class="btn btn-sm remove-btn"><i class="fas fa-trash"></i> Remove</button>
    `;
    certsContainer.appendChild(newCert);
    newCert.querySelector('.remove-btn').addEventListener('click', () => {
        newCert.remove();
        updatePreview();
    });
    newCert.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
});

// Download PDF functionality
document.getElementById('downloadBtn').addEventListener('click', generatePDF);
document.getElementById('floatingDownloadBtn').addEventListener('click', generatePDF);

function generatePDF() {
    const element = document.getElementById('resumePreview');
    const opt = {
        margin: 10,
        filename: 'professional_resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        enableLinks: true
    };
    const originalText = document.getElementById('downloadBtn').innerHTML;
    document.getElementById('downloadBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    document.getElementById('downloadBtn').disabled = true;
    
    html2pdf().set(opt).from(element).save().then(() => {
        document.getElementById('downloadBtn').innerHTML = originalText;
        document.getElementById('downloadBtn').disabled = false;
    });
}

// Real-time form updates
const inputFields = document.querySelectorAll('.form-control');
inputFields.forEach(input => {
    input.addEventListener('input', updatePreview);
});

function updatePreview() {
    // Update personal info
    document.querySelector('.name').textContent = document.getElementById('fullName').value || 'John Doe';
    document.querySelectorAll('.contact-item')[0].querySelector('span').textContent = document.getElementById('location').value || 'San Francisco, CA';
    document.querySelectorAll('.contact-item')[1].querySelector('span').textContent = document.getElementById('email').value || 'john.doe@example.com';
    document.querySelectorAll('.contact-item')[2].querySelector('span').textContent = document.getElementById('phone').value || '(123) 456-7890';
    document.querySelector('#resumePreview .section p').textContent = document.getElementById('summary').value || 'Recent computer science graduate with a passion for developing scalable web applications and working across the full stack. Seeking to leverage solid development skills with focus on collaboration, communication, and passion.';
    
    // Update social links
    const linkedin = document.getElementById('linkedin').value || '#';
    const github = document.getElementById('github').value || '#';
    const portfolio = document.getElementById('portfolio').value || '#';
    document.querySelectorAll('.social-link')[0].href = linkedin;
    document.querySelectorAll('.social-link')[1].href = github;
    document.querySelectorAll('.social-link')[2].href = portfolio;
    
    // Update skills (now comma-separated italic text)
    const skills = document.getElementById('skills').value || 'Java, Python, React, SQL, Docker';
    const skillsList = document.querySelector('.skills-list');
    
    // Clean up skills formatting
    const formattedSkills = skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
        .join(', ');
        
    skillsList.textContent = formattedSkills;
    
    // Update education
    const eduContainer = document.getElementById('educationContainer');
    const eduItems = eduContainer.querySelectorAll('.optional-section');
    const eduPreview = document.querySelector('#resumePreview .education-table');
    const eduSection = document.querySelector('#resumePreview .section:nth-child(3)');
    
    if (eduItems.length === 0) {
        eduSection.style.display = 'none';
    } else {
        eduSection.style.display = 'block';
        eduPreview.innerHTML = '';
        
        eduItems.forEach((edu, index) => {
            const degree = edu.querySelector('.edu-degree').value || 'Degree';
            const institution = edu.querySelector('.edu-institution').value || 'Institution';
            const date = edu.querySelector('.edu-date').value || 'Duration';
            const location = edu.querySelector('.edu-location').value || 'Location';
            const score = edu.querySelector('.edu-score').value || 'CGPA';
            const coursework = edu.querySelector('.edu-coursework').value || 'Coursework';
            
            const eduHtml = `
                <tr>
                    <td class="education-degree">${degree}</td>
                    <td class="education-date">${date}</td>
                </tr>
                <tr>
                    <td colspan="2" class="education-details">${institution} | ${location}</td>
                </tr>
                <tr>
                    <td colspan="2">${score}</td>
                </tr>
                <tr>
                    <td colspan="2">Relevant Coursework: ${coursework}</td>
                </tr>
            `;
            
            eduPreview.innerHTML += eduHtml;
        });
    }
    
    // Update experience
    const expContainer = document.getElementById('experienceContainer');
    const expItems = expContainer.querySelectorAll('.optional-section');
    const expPreview = document.querySelector('#resumePreview .section:nth-child(4) > div');
    const expSection = document.querySelector('#resumePreview .section:nth-child(4)');
    
    if (expItems.length === 0) {
        expSection.style.display = 'none';
    } else {
        expSection.style.display = 'block';
        expPreview.innerHTML = '';
        
        expItems.forEach((exp, index) => {
            const title = exp.querySelector('.exp-title').value || 'Position Title';
            const company = exp.querySelector('.exp-company').value || 'Company Name';
            const date = exp.querySelector('.exp-date').value || 'Duration';
            const location = exp.querySelector('.exp-location').value || 'Location';
            const description = exp.querySelector('.exp-description').value || 'Description of responsibilities and achievements.';
            
            const expHtml = `
                <div class="item-header">
                    <div>
                        <h4 class="item-title">${title}</h4>
                        <p class="item-subtitle">${company} | ${location}</p>
                    </div>
                    <div class="item-date">${date}</div>
                </div>
                <p class="item-description">${description}</p>
            `;
            
            const expItem = document.createElement('div');
            expItem.innerHTML = expHtml;
            
            if (index > 0) {
                expItem.style.marginTop = '15px';
            }
            
            expPreview.appendChild(expItem);
        });
    }
    
    // Update projects
    const projectsContainer = document.getElementById('projectsContainer');
    const projectItems = projectsContainer.querySelectorAll('.optional-section');
    const projectsPreview = document.querySelector('#resumePreview .section:nth-child(5) > div');
    const projectsSection = document.querySelector('#resumePreview .section:nth-child(5)');
    
    if (projectItems.length === 0) {
        projectsSection.style.display = 'none';
    } else {
        projectsSection.style.display = 'block';
        projectsPreview.innerHTML = '';
        
        projectItems.forEach((project, index) => {
            const title = project.querySelector('.project-title').value || 'Project Title';
            const link = project.querySelector('.project-link').value || '#';
            const description = project.querySelector('.project-description').value || 'Project description';
            
            const projectHtml = `
                <div class="item-header">
                    <h4 class="item-title">
                        <a href="${link}" class="project-link">
                            ${title}
                        </a>
                    </h4>
                </div>
                <p class="item-description">${description}</p>
            `;
            
            const projectItem = document.createElement('div');
            projectItem.innerHTML = projectHtml;
            
            if (index > 0) {
                projectItem.style.marginTop = '15px';
            }
            
            projectsPreview.appendChild(projectItem);
        });
    }
    
    // Update certifications
    const certsContainer = document.getElementById('certificationsContainer');
    const certItems = certsContainer.querySelectorAll('.optional-section');
    const certsPreview = document.querySelector('#resumePreview .section:nth-child(6) > div');
    const certsSection = document.querySelector('#resumePreview .section:nth-child(6)');
    
    if (certItems.length === 0) {
        certsSection.style.display = 'none';
    } else {
        certsSection.style.display = 'block';
        certsPreview.innerHTML = '';
        
        certItems.forEach((cert, index) => {
            const name = cert.querySelector('.cert-name').value || 'Certification Name';
            const org = cert.querySelector('.cert-org').value || 'Issuing Organization';
            
            const certHtml = `
                <div class="item-header">
                    <h4 class="item-title">${name}</h4>
                </div>
                <p class="item-subtitle">${org}</p>
            `;
            
            const certItem = document.createElement('div');
            certItem.innerHTML = certHtml;
            
            if (index > 0) {
                certItem.style.marginTop = '15px';
            }
            
            certsPreview.appendChild(certItem);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.optional-section').remove();
            updatePreview();
        });
    });
});