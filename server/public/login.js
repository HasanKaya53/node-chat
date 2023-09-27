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

        

   
        if (name.trim() === '') {
            alert('Please enter your name.');
            return false;
        }
        //storage ...
     
        sessionStorage.setItem('chatName', name);
        sessionStorage.setItem('roomName', roomName);

        let socket = io("http://localhost:3000",{ transports : ['websocket'] ,query: {session:sessionStorage.getItem('sessionID'),name:sessionStorage.getItem('chatName'),chatRoom:sessionStorage.getItem('roomName')} });
        socket.emit('userLogin', { name: sessionStorage.getItem('chatName'), message: sessionStorage.getItem('chatName') });


        location.href = '/chat';
    });


   



});