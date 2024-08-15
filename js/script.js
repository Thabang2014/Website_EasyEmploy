document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jobApplicationForm');

    form.addEventListener('submit', function (event) {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const educationLevel = document.getElementById('educationLevel').value;
        const institution = document.getElementById('institution').value.trim();
        const graduationYear = document.getElementById('graduationYear').value;
        const experienceYears = document.getElementById('experienceYears').value;
        const lastJobTitle = document.getElementById('lastJobTitle').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const resume = document.getElementById('resume').files[0];

        // Validate required fields
        if (!fullName || !email || !phone || !educationLevel || !institution || !graduationYear || !experienceYears || !lastJobTitle || !companyName) {
            alert('Please fill out all required fields.');
            event.preventDefault();
            return;
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
            return;
        }

        // Validate phone number format (simple check for numbers only)
        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number (10-15 digits).');
            event.preventDefault();
            return;
        }

        // Validate graduation year
        const currentYear = new Date().getFullYear();
        if (graduationYear < 1900 || graduationYear > currentYear) {
            alert('Please enter a valid graduation year.');
            event.preventDefault();
            return;
        }

        // Validate resume file format
        if (!resume || resume.type !== 'application/pdf') {
            alert('Please upload your resume in PDF format.');
            event.preventDefault();
            return;
        }
    });
});
