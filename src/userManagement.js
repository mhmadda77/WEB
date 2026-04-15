const html = document.documentElement;
const userName = document.getElementById('userName');

window.onload = function() {
  let user = JSON.parse(localStorage.getItem('currentUser'))
  userName.innerHTML = "Welcome " + user.username

  // send request to fetch data from db.json
  fetch('db.json')
      .then(response => response.json())
      .then(jsonData => {
        users = jsonData.users
        populateTable('usersData',jsonData)
       })
}

function populateTable(tableId,jsonData){
  const table = document.getElementById(tableId)
  const thead = table.querySelector('thead tr')
  const tbody = table.querySelector('tbody')
  thead.innerHTML = '';
  tbody.innerHTML = '';

  if (jsonData.users.length>0){
    const headers = Object.keys(jsonData.users[0])      //take data keys into headers
    
    // for each key (attr) we create a 'th' (unless password) and add it into thead
    headers.forEach(header => {
      if (header!='password'){
        const th = document.createElement('th')
        th.textContent = header
        th.classList.add('px-4','py-2','text-left')
        thead.appendChild(th)
      }
    })
    
    // for each object (user) we create a 'tr' (unless password) and add it into tbody 
    jsonData.users.forEach(item => {
      const tr = document.createElement('tr')
      headers.forEach(header => {
        if (header!='password'){
          const td = document.createElement('td')
          td.textContent = item[header]
          td.classList.add('border','px-4','py-2')
          td.addEventListener("dblclick",()=>editable.edit(td))
          tr.appendChild(td)
        }
      })
      tbody.appendChild(tr)
    })
  }
  else {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.textContent = "No data found!"
    tbody.appendChild(tr)
  }
}

let editable = {
  ccell : null,
  cval : null,
  edit : cell => {    // on double click
    editable.ccell = cell;    // save cell that was clicked
    editable.cval = cell.innerHTML // save cell value that was clicked
    cell.classList.add("edit") // visual clicking style
    cell.contentEditable = true // edit mode on
    cell.focus() 
    cell.onblur = editable.done // finish when clicking outside the cell
    cell.onkeydown = e => {   // finish when clicking enter or escape
      if (e.key == "Enter") editable.done()
      if (e.key == "Escape") editable.done(1)
    }
  },
  done : discard => { // finishing edit
    editable.ccell.onblur = ""
    editable.ccell.onkeydown = ""
    editable.ccell.classList.remove("edit")
    editable.ccell.contentEditable = false
    if (discard==1) editable.ccell.innerHTML = editable.cval   // return to previous value when 'Escape'
    if (editable.ccell.innerHTML != editable.cval){     // update file if value changed
      console.log("change")
      updateData()
    }
  }
}
