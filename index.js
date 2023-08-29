document.addEventListener('DOMContentLoaded', function(){

    const eventDate = new Date('November 15, 2023 00:00:00').getTime();

    let x = setInterval(() =>{

        let now = new Date().getTime();
        let timeLeft = eventDate - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('clock').innerHTML = `${days}: ${hours}: ${minutes}: ${seconds}`

        if(timeLeft<0){
            document.getElementById('clock').innerHTML = "Registration Closed"
        }

    } ,1000)
        
})