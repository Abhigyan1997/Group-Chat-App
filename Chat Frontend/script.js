const createGroupForm = document.querySelector('#create-group-form');
const groupNameInput = document.querySelector('#group-name');
const membersInput = document.querySelector('#members');
const groupsList = document.querySelector('#groups');



function sendMessage(event) {
    event.preventDefault();
    let message = document.getElementById("chat-input").value;
    let obj = {
      message: message,
    };
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/user/message", obj, {
        headers: { Authorization: token },
      })
      .then((response) => {
        alert("Message Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/user/getmessage", {
      headers: { Authorization: token },
    });

    if (response.status == 201) {
      // Clear the chat box
      document.getElementById("chat-messages").innerHTML = "";

      // Display the messages from localStorage
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.forEach((msg) => showOnChatBox(msg.username, msg.message));

      // Display the messages from the server
      for (let i = 0; i < response.data.message.length; i++) {
        showOnChatBox(
          response.data.message[i].username,
          response.data.message[i].message
        );
      }
    }
  } catch (err) {
    console.log(err);
  }

  // Poll the server every 1 seconds
//   setInterval(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/user/getmessage", {
//         headers: { Authorization: token },
//       });

//       if (response.status == 201) {
//         // Display the new messages
//         for (let i = 0; i < response.data.message.length; i++) {
//           showOnChatBox(
//             response.data.message[i].username,
//             response.data.message[i].message
//           );
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }, 10000);
});

async function showOnChatBox(username, message) {
  const parentnode = document.getElementById("chat-messages")
  const childnode = `<p>${username}:${message}</p>`
  parentnode.innerHTML += childnode;

  try {
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push({ username, message });
      await localStorage.setItem("messages", JSON.stringify(messages));
  } catch (error) {
      console.log(error);
  }
}


// async function createGroup(e) {
//   try {
//       const token=localStorage.getItem("token")
//       e.preventDefault();
//       const obj = {
//           group: e.target.groupName.value
//       }
//       await axios.post("http://localhost:5000/user/creategroup",obj,{headers:{Authorization: token }})
//   } catch (err) {
//       console.log(err)
//   }

// }

async function getgroups(){
  const token=localStorage.getItem('token');
  const response = await axios.get("http://localhost:5000/user/getgroupname",{headers: {Authorization :token}});
  const grpdetails=response.data.groupDetails;
  const parent=document.querySelector('#groups');
  for(let i=0;i<grpdetails.length;i++){
      let child=`<li onclick="insideGroup(${grpdetails[i].groupId})">${grpdetails[i].groupName}</li>`
      parent.innerHTML=parent.innerHTML+child

   }
  }

  async function insideGroup(id){
    try{
       localStorage.setItem("groupId",id)
        window.location.href="./groupchat.html"
    }catch(err){
        console.log("error in inside group FE",err)
    }

  }

  createGroupForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    let grpinformation = {
      groupName: groupNameInput.value,
      members: membersInput.value.split(',').map(email => email.trim())
    };

    if (groupNameInput.value && membersInput.value) {
      try {
         const token= localStorage.getItem('token');
         const response = await axios.post("http://localhost:5000/user/creategrp",grpinformation ,{headers: {Authorization :token}});
           console.log(response.data.groupid) ;
        if (response.status==201) {
          // Add new group to list of groups
          const parent=document.querySelector('#groups');

              let child=`<li onclick="insideGroup(${response.data.groupid}); getgroups()">${groupNameInput.value}</li>`
              parent.innerHTML=parent.innerHTML+child


          // Close modal and clear form inputs
         // closeModal();
          groupNameInput.value = '';
          membersInput.value = '';
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please fill out all fields.');
    }
  });