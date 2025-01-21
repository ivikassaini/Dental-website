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
            message: formData.get('message')
        };

        fetch('http://localhost:3001/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Appointment booked successfully') {
                    confirmationOverlay.style.display = 'flex';
                    appointmentForm.reset();
                } else {
                    alert('Failed to book appointment. Please try again.', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('okButton').addEventListener('click', function () {
        confirmationOverlay.style.display = 'none';
    });
});
