// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1dgSwjHONDuaQeWqwdeoG8L2gheKGVDI",
    authDomain: "login-70e58.firebaseapp.com",
    databaseURL: "https://login-70e58-default-rtdb.firebaseio.com",
    projectId: "login-70e58",
    storageBucket: "login-70e58.appspot.com",
    messagingSenderId: "271490799577",
    appId: "1:271490799577:web:ffcf8e33b59c6a4b78abc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Handle form submission
document.getElementById('post-job-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const companyName = document.getElementById('company-name').value;
    const companyLogo = document.getElementById('company-logo').files[0];
    const companyRegistrationNumber = document.getElementById('company-registration-number').value;
    const physicalAddress = document.getElementById('physical-address').value;
    const contactEmail = document.getElementById('contact-email').value;
    const contactPhone = document.getElementById('contact-phone').value;
    const jobTitle = document.getElementById('job-title').value;
    const jobDescription = document.getElementById('job-description').value;
    const employmentType = document.getElementById('employment-type').value;
    const salaryRange = document.getElementById('salary-range').value;
    const applicationDeadline = document.getElementById('application-deadline').value;
    const requiredQualifications = document.getElementById('required-qualifications').value;
    const experience = document.getElementById('experience').value;
    const taxClearanceCertificate = document.getElementById('tax-clearance-certificate').files[0];
    const bbbeeCertificate = document.getElementById('bbbee-certificate').files[0];
    const labourRelationsActCompliance = document.getElementById('labour-relations-act-compliance').files[0];

    try {
        // Upload files to Firebase Storage
        const logoRef = ref(storage, `logos/${companyLogo.name}`);
        await uploadBytes(logoRef, companyLogo);
        const logoURL = await getDownloadURL(logoRef);

        const taxRef = ref(storage, `documents/${taxClearanceCertificate.name}`);
        await uploadBytes(taxRef, taxClearanceCertificate);
        const taxURL = await getDownloadURL(taxRef);

        const bbbeeRef = ref(storage, `documents/${bbbeeCertificate.name}`);
        await uploadBytes(bbbeeRef, bbbeeCertificate);
        const bbbeeURL = await getDownloadURL(bbbeeRef);

        const labourRef = ref(storage, `documents/${labourRelationsActCompliance.name}`);
        await uploadBytes(labourRef, labourRelationsActCompliance);
        const labourURL = await getDownloadURL(labourRef);

        // Save form data to Firestore
        await addDoc(collection(db, 'jobPosts'), {
            companyName,
            companyLogo: logoURL,
            companyRegistrationNumber,
            physicalAddress,
            contactEmail,
            contactPhone,
            jobTitle,
            jobDescription,
            employmentType,
            salaryRange,
            applicationDeadline,
            requiredQualifications,
            experience,
            taxClearanceCertificate: taxURL,
            bbbeeCertificate: bbbeeURL,
            labourRelationsActCompliance: labourURL,
            timestamp: serverTimestamp()
        });

        alert('Job posted successfully!');
        document.getElementById('post-job-form').reset();
    } catch (error) {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
    }
});
