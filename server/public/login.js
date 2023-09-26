$(document).ready(function() {
    


    $(document).on('click','#submit', async function() {


        let name = $("#chatName").val();
        let roomName = $("#roomName").val();
        //request post...


        sessionStorage.clear();


     

        // jq post...
        let sessionID = "";
        let teklifSorgu = new Promise((resolve, reject) => { 
            $.post('/login', { name: name,roomName:roomName }, function (data) {
                sessionID = data.session;
                sessionStorage.setItem('sessionID', sessionID);
                
                resolve(sessionID); 
            });
        });

        await Promise.all([teklifSorgu]);

        console.log(sessionID);



      


    
       
        console.log(sessionID);
      

   
        if (name.trim() === '') {
            alert('Please enter your name.');
            return false;
        }
        //storage ...
     
        sessionStorage.setItem('chatName', name);
        sessionStorage.setItem('roomName', roomName);
        location.href = '/chat';
    });


   



});