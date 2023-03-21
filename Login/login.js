async function login(event) {
    try{
        event.preventDefault();
        const obj = {
            email:event.target.email.value,
            password:event.target.password.value
        }
     const token=localStorage.getItem('token');

     const response= await axios.post('http://localhost:5000/user/login',obj,{headers:{"Authorization":token}})

        if(response.status=204){
        
             alert("User Succesfully logged in")
        }
        else{
            throw new Error('failed to login')
        }

        }
    catch(err){
        document.body.innerHTML=`<div style="color:red;">${err}</div>`;
    }
}