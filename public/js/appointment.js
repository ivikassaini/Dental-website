document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationOverlay = document.getElementById('confirmationOverlay');

    appointmentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(appointmentForm);
        const formObject = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('appointmentDate'),
            time: formData.get('appointmentTime'),
            message: formData.get('message'),
        };

        fetch('http://localhost:3001/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
            .then(async response => {
                if (response.ok) {
                    confirmationOverlay.style.display = 'flex';
                    appointmentForm.reset();
                } else {
                    const errorData = await response.json();
                    alert(`Failed to book appointment: ${errorData.message}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An unexpected error occurred. Please try again.');
            });
    });

    document.getElementById('okButton').addEventListener('click', function () {
        confirmationOverlay.style.display = 'none';
    });
});
