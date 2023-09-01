function mobileResponsive(matches) {
    var themePicture1 = document.getElementById('themePicture1');
    var day1 = document.getElementById('day1');

    if (matches) {
        themePicture1.appendChild(day1);
    }
}




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

    var width = window.matchMedia("(max-width: 768px)");

    function handleWidthChange(event) {
        mobileResponsive(event.matches);
    }
    
    width.addEventListener("change", handleWidthChange);
    
    // Call it initially as well
    handleWidthChange(width);
        

    //slideshow 
    let slides = document.querySelectorAll('.slide');
            let btns = document.querySelectorAll('.btn');
            let currentSlide = 1;

            //manual Navigation
            var manualNav = function(manual){
                slides.forEach((slide)=>{
                    slide.classList.remove('active');
                });

                btns.forEach((btn) =>{
                    btn.classList.remove('active');
                });

                slides[manual].classList.add('active');
                btns[manual].classList.add('active');
            }

            btns.forEach((btn, i) => {
                btn.addEventListener('click', ()=>{
                    manualNav(i);
                    currentSlide = i;
                })
            })

    //autoplay slideShow
    var repeat = function(activeClass){

        let active = document.getElementsByClassName('active');
        let i = 1;

        var repeater = ()=>{
            setTimeout(()=>{
                [...active].forEach((activeSlide) => {
                    activeSlide.classList.remove('active');
                })

                slides[i].classList.add('active');
                btns[i].classList.add('active');
                i++;

                if(slides.length === i){
                    i=0;
                }
                if(i >= slides.length){
                    return;
                }
                repeater();
            }, 10000);
        }
        repeater();
    }
    repeat();
})