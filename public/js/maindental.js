

document.addEventListener('DOMContentLoaded', function() {
    
    const navbarLinks = document.querySelectorAll('.nav-menu a');
    const headerHeight = document.querySelector('.navbar').offsetHeight; 

    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href');
            const section = document.querySelector(sectionId);

            if (section) {
                const sectionTop = section.offsetTop;
                const offset = 0; 

                window.scrollTo({
                    top: sectionTop - headerHeight - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const scrollToTop = document.getElementById('scrollToTop');

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show feedback confirmation message after form submission
    const feedbackForm = document.getElementById('footerContactForm');
    const feedbackConfirmationOverlay = document.getElementById('feedbackConfirmationOverlay');
    const closeFeedbackButton = document.getElementById('closeFeedbackButton');

    feedbackForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        // Collect form data
        const name = document.getElementById('footer-name').value;
        const email = document.getElementById('footer-email').value;
        const feedback = document.getElementById('footer-feedback').value;

        try {
            // Send feedback data to the server
            const response = await fetch('http://localhost:3001/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, feedback }),
            });

            if (response.ok) {
                // Display the feedback confirmation message
                feedbackConfirmationOverlay.style.display = 'flex';

                // Clear the form fields
                feedbackForm.reset();
            } else {
                alert('There was an error submitting your feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });

    // Hide the feedback confirmation message when close button is clicked
    closeFeedbackButton.addEventListener('click', function() {
        feedbackConfirmationOverlay.style.display = 'none';
    });
});
