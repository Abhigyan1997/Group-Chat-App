function login(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);
    const loginDetails = {
        email: form.get("email"),
        password: form.get("password")
    }
    console.log(loginDetails)
    axios.post('http://localhost:5000/user/login',loginDetails).then(response => {
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user))
            window.location.href = "../Chat Frontend/chat.html" // change the page on successful login
            alert('User Sucessfully logged in')
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

