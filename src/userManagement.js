
 let loggedIn = JSON.parse(localStorage.getItem('currentUser'));
 let users = JSON.parse(localStorage.getItem('users')) || [];
 const tableBody = document.getElementById('usersTableBody');


 document.getElementById('welcome').innerHTML = "Welcome "+loggedIn.username+"!";

 tableBody.innerHTML = "";

users.forEach(user => {
const row = document.createElement('tr');

  row.innerHTML = `
    <td class="bg-gray border p-2">${user.username}</td>
    <td class="bg-gray border p-2">${user.email}</td>
    <td class="bg-gray border p-2">${user.dob}</td>
  `;

  tableBody.appendChild(row);
});