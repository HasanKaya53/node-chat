$(document).ready(function() {


    $(document).on('click','#submit', function() {
        let name = $("#chatName").val();


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