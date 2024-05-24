document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editForm');
    form.addEventListener('submit', function(event) {
        console.log(11);

        event.preventDefault();
        const formData = new FormData(form);
        fetch('/Books/add/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Book added successfully');
                window.location.href = '/';
            } else {
                alert('Failed to add book');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});