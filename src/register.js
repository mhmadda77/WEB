const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async(event)=> {
  event.preventDefault();

  // take input values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const isAdmin = false;
  registerMessage.textContent = "";

  // check if both passwords match
  if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
        return;
 }

 try {
    let users = JSON.parse(localStorage.getItem('users')) || []; 

    // check if username or email already exist in local db
    if (users.some(user => user.username === username || user.email === email)) {
      registerMessage.textContent = "Username or email already exists.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // if first user to register -> becomes admin
    if (users.length==0){
        users.push({username,email,password,dob,"isAdmin":true});
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        users.push({username,email,password,dob,"isAdmin":false});
        localStorage.setItem('users', JSON.stringify(users));
    }

    // show success
    registerMessage.textContent = "Registration successful! (Data stored in local storage)";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");
 }catch(error){
    // show error
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
 } 


})
