import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

 
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBBK3RB1dR_hYEvWTb9oC8JS9UdMtid6Og",
    authDomain: "treevista-data.firebaseapp.com",
    projectId: "treevista-data",
    storageBucket: "treevista-data.appspot.com",
    messagingSenderId: "286714906288",
    appId: "1:286714906288:web:2af158d2f32cf09b159d75"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Sign up form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target.txt.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                phone: phone
            });
            alert('User registered successfully!');
        })
        .catch((error) => {
            console.error('Error signing up:', error);
            alert('Error signing up: ' + error.message);
        });
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('User logged in successfully!');
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            alert('Error logging in: ' + error.message);
        });
});