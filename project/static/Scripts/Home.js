function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        setTimeout(() => {
            const elementPos = element.getBoundingClientRect().top;
            window.scrollBy({
                top: elementPos - 60,
                behavior: 'smooth'
            });
        }, 0);
    }
}

function hoverEffect() {
    var Cards = document.querySelectorAll('.Card');

    Cards.forEach(function(card) {
        var imageDiv = card.querySelector('.image');
        var img = imageDiv.querySelector('img');
        var imageName = img.getAttribute('name');

        imageDiv.addEventListener('mouseover', function() {
            var textDiv = document.createElement('div');
            textDiv.className = 'hoverText';
            textDiv.innerText = imageName;
            imageDiv.appendChild(textDiv);
        });

        imageDiv.addEventListener('mouseout', function() {
            var textDiv = imageDiv.querySelector('.hoverText');
            imageDiv.removeChild(textDiv);
        })                                                                                                       ;
    });
}

function GetStarTedBtn() {
    const availGetStarted = document.getElementById('startedaction');
    if (availGetStarted) {
        availGetStarted.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToElement('GetStarTed');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {

    GetStarTedBtn();
    initiateswipe();
    hoverEffect();
});