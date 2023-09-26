$(document).ready(function() {
    let socket = io("http://localhost:3000",{ transports : ['websocket'],query: { session: sessionStorage.getItem('sessionID') } });


    $(document).on('click','#submit', function() {

    




        let name = $("#chatName").val();

        

        //request post...

        $.ajax({
            url: '/login',
            type: 'POST',
            dataType: 'json',
            data: { a: "örnek", b: true },
            success: function (gelenveri) {
                console.log(gelenveri);
                sessionStorage.setItem('sessionID', gelenveri.session);
            },
            error: function (hata) {
                console.log(hata);
            }
        });

        socket.emit('userLogin', { name: name,session:sessionStorage.getItem('sessionID') });

        if (name.trim() === '') {
            alert('Please enter your name.');
            return false;
        }


        //storage ...
        sessionStorage.setItem('chatName', name);
        location.href = '/chat';
        console.log('logged ..');
    });


   



});