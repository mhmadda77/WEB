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
    // if user already exists
    if(find(username)){
        registerMessage.textContent = "Username or email already exists.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
        return;
    }
    // if first user to register -> becomes admin
    if (users.length==0) isAdmin = true  
    
    add(username,email,password,dob,isAdmin)

    // show success
    registerMessage.textContent = "Registration successful!";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");
 }catch(error){
    // show error
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
 } 
})
