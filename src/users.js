const file="db.json"
let users = []

function initUsers(){
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET",file,false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState==4){
            if (rawFile.status==200 || rawFile.status==0){
                let allText = rawFile.responseText;
                let data = JSON.parse(allText);
                users = data.users
            }
        }
    }
    rawFile.send(null)
}

function find(nameOrEmail){
    if (users.length==0) initUsers()
    return users.find(u=>u.username==nameOrEmail || u.email==nameOrEmail);
}

function updateData(){
    let data = '{"users":'+JSON.stringify(users)+'}'
    const blob = new Blob([data],{type:'application/json'}) // binary data object
    const url = URL.createObjectURL(blob) // temp URL for object
    const a = document.createElement('a') // for downloading file
    a.download = file // init saved file name
    a.href = url // temp URL for file
    a.click() // click simulation
    URL.revokeObjectURL(url) // clean memory
}

function add(username,email,password,dob,isAdmin){
    initUsers()
    let user = {"username":username,"email":email,"password":password,"dob":dob,"isAdmin":isAdmin}
    users.push(user)
    updateData()
}
