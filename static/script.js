// const passwordInput = document.querySelector('input[name="password"]');


// // let btn = document.querySelector("#btn");
// // let h2 = document.createElement("h2");
// // h2.innerText = "you click the button";
// // btn.addEventListener("click",() =>{
// // console.log(h2);
// // document.body.appendChild(h2)
// // });

// passwordInput.addEventListener('click', () => {

//     const userInputDisplay = document.querySelector('#userInput');
//     const password = passwordInput.value;
//     userInputDisplay.innerText = `You entered: ${password}`;
//     // Optionally, you can integrate the logic here to update the UI dynamically
//     // based on the password strength, using a library like zxcvbn.js (client-side version).
// });


// // Use the zxcvbn library to check password strength
// const result = zxcvbn(password);
// const strength = result.score;
// const feedback = result.feedback.suggestions;


document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.querySelector('#password');
    const userInputDisplay = document.querySelector('#userInput');
    const passwordStrengthDisplay = document.querySelector('#passwordStrength');
    const strengthBar = document.querySelector('#strengthBar');
    
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        userInputDisplay.innerText = `You entered: ${password}`;
        
        // Use the zxcvbn library to check password strength
        const result = zxcvbn(password);
        const strength = result.score; // Score is between 0 and 4
        const feedback = result.feedback.suggestions;
        
        let strengthLabel = '';
        let barWidth = 0;
        let barColor = '#ff0000'; // Default to red
        
        if (strength === 0) {
            strengthLabel = "Weak";
            barWidth = 20; // 20% width for weak
            barColor = '#ff0000'; // Red for weak
        } else if (strength === 1) {
            strengthLabel = "Medium";
            barWidth = 40; // 40% width for medium
            barColor = '#ff7f00'; // Orange for medium
        } else if (strength === 2) {
            strengthLabel = "Good";
            barWidth = 60; // 60% width for good
            barColor = '#ffff00'; // Yellow for good
        } else if (strength === 3) {
            strengthLabel = "Strong";
            barWidth = 80; // 80% width for strong
            barColor = '#00ff00'; // Green for strong
        } else {
            strengthLabel = "Very Strong";
            barWidth = 100; // 100% width for very strong
            barColor = '#008000'; // Dark Green for very strong
        }
        
        // Update the tube and strength label
        strengthBar.style.width = `${barWidth}%`;
        strengthBar.style.backgroundColor = barColor;
        
        passwordStrengthDisplay.innerHTML = `<h2>Strength: ${strengthLabel}</h2>`;
        if (feedback.length > 0) {
            let feedbackList = '<ul>';
            feedback.forEach(item => {
                feedbackList += `<li>${item}</li>`;
            });
            feedbackList += '</ul>';
            passwordStrengthDisplay.innerHTML += feedbackList;
        }
    });
});
