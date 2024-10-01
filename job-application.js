import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
const auth = getAuth(app);

async function submitApplication(event) {
  event.preventDefault();
  const form = document.getElementById('jobApplicationForm');
  const formData = new FormData(form);

  const applicationData = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    address: formData.get('address'),
    dob: formData.get('dob'),
    gender: formData.get('gender'),
    race: formData.get('race'),
    citizenship: formData.get('citizenship'),
    disability: formData.get('disability'),
    educationLevel: formData.get('educationLevel'),
    institution: formData.get('institution'),
    graduationYear: formData.get('graduationYear'),
    additionalCourses: formData.get('additionalCourses'),
    experienceYears: formData.get('experienceYears'),
    lastJobTitle: formData.get('lastJobTitle'),
    companyName: formData.get('companyName'),
    industry: formData.get('industry'),
    salaryExpectation: formData.get('salaryExpectation'),
    volunteerExperience: formData.get('volunteerExperience'),
    skills: formData.get('skills'),
    certifications: formData.get('certifications'),
    languages: formData.get('languages'),
    portfolioLink: formData.get('portfolioLink'),
    availabilityDate: formData.get('availabilityDate'),
    workType: formData.get('workType'),
    workMode: formData.get('workMode'),
    locationPreference: formData.get('locationPreference'),
    declaration: formData.get('declaration') === 'on'
  };

  try {
    const user = auth.currentUser;
    if (user) {

      // Upload identity document to Firebase Storage
      const identityFile = formData.get('identity');
      const identityRef = ref(storage, 'identity/' + identityFile.name);
      await uploadBytes(identityRef, identityFile);
      const identityURL = await getDownloadURL(identityRef);

      // Upload CV to Firebase Storage
      const cvFile = formData.get('cv');
      const cvRef = ref(storage, 'cv/' + cvFile.name);
      await uploadBytes(cvRef, cvFile);
      const cvURL = await getDownloadURL(cvRef);

      // Upload other supporting documents to Firebase Storage
      const otherDocuments = formData.getAll('other-documents');
      const otherDocumentsURLs = [];
      for (const file of otherDocuments) {
        const fileRef = ref(storage, 'other-documents/' + file.name);
        await uploadBytes(fileRef, file);
        const fileURL = await getDownloadURL(fileRef);
        otherDocumentsURLs.push(fileURL);
      }

      // Add application data to Firestore
      const docRef = await addDoc(collection(db, "jobApplications"), {
        ...applicationData,
       
        identityURL: identityURL,
        cvURL: cvURL,
        otherDocumentsURLs: otherDocumentsURLs,
        userId: user.uid,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      form.reset();
      alert('Application submitted successfully!');
    } else {
      console.error("No user is signed in.");
      alert('No user is signed in. Please log in and try again.');
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Failed to submit application. Please try again.');
  }
}

// Add event listener to the form
document.getElementById('jobApplicationForm').addEventListener('submit', submitApplication);
