const selector1 = document.getElementById('selector1');
const selector2 = document.getElementById('selector2');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const switchToLogin = document.getElementById('switch-to-login');
const switchToSignup = document.getElementById('switch-to-signup');
const signupPassword = document.getElementById('signup-password');
const strengthBar = document.getElementById('strength-bar');

function switchForm(showSignup) {
    if (showSignup) {
        selector1.classList.add('selected');
        selector2.classList.remove('selected');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    } else {
        selector2.classList.add('selected');
        selector1.classList.remove('selected');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }
}

selector1.addEventListener('click', () => switchForm(true));
selector2.addEventListener('click', () => switchForm(false));

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(false);
});

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(true);
});

signupPassword.addEventListener('input', function () {
    const password = this.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const percentage = (strength / 5) * 100;
    strengthBar.style.width = percentage + '%';

    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#e74c3c';
    } else if (strength <= 3) {
        strengthBar.style.backgroundColor = '#f39c12';
    } else {
        strengthBar.style.backgroundColor = '#27ae60';
    }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Signup submitted:', Object.fromEntries(formData));
    alert('Account created successfully!');
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    console.log('Login submitted:', Object.fromEntries(formData));
    alert('Login successful!');
});

document.getElementById('forgot-password').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.');
});