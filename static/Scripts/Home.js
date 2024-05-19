function isAdmin() {
    fetch('/auth/api/user/')
        .then(response => response.json())
        .then(data => {
            if (!data.is_staff) {
                document.getElementById("addBook").style.display = "none";
                document.getElementById("addBooknav").style.display = "none";
            }
        })
        .catch(error => console.error('Error fetching user info:', error));
}
async function isLoggedIn() {
    try {
        const response = await fetch('/auth/api/loggedin/');
        const data = await response.json();
        if (data.is_logged_in) {
            isAdmin();
            console.log('bruh')
        } else {
            document.getElementById("addBook").style.display = "none";
            document.getElementById("addBooknav").style.display = "none";
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        document.getElementById("addBook").style.display = "none";
        document.getElementById("addBooknav").style.display = "none";
    }
}

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
        });
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
    isLoggedIn();
    GetStarTedBtn();
    initiateswipe();
    hoverEffect();
});