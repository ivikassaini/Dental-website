// maindental.js

document.addEventListener('DOMContentLoaded', function() {
   // Smooth scrolling for navigation links with offset
   const navbarLinks = document.querySelectorAll('.nav-menu a');
   const headerHeight = document.querySelector('.navbar').offsetHeight; // Calculate the header height
   
   navbarLinks.forEach(link => {
       link.addEventListener('click', function(event) {
           event.preventDefault();
           const sectionId = this.getAttribute('href');
           const section = document.querySelector(sectionId);
           
           if (section) {
               const sectionTop = section.offsetTop;
               const offset = 0; // Additional offset for better spacing
               
               window.scrollTo({
                   top: sectionTop - headerHeight - offset,
                   behavior: 'smooth'
               });
           }
           
        });
   });

    // Scroll to top functionality for fixed circle
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

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Display the feedback confirmation message
        feedbackConfirmationOverlay.style.display = 'flex';

        // Optionally, handle form data here (e.g., send it to a server)

        // Clear the form fields (if needed)
        feedbackForm.reset();
    });

    // Hide the feedback confirmation message when close button is clicked
    closeFeedbackButton.addEventListener('click', function() {
        feedbackConfirmationOverlay.style.display = 'none';
    });

    // // Highlight the active section link in the navbar
    // const sections = document.querySelectorAll('section');
    // const navItems = document.querySelectorAll('.nav-menu a');

    // window.addEventListener('scroll', () => {
    //     let current = '';

    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.clientHeight;
    //         if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
    //             current = section.getAttribute('id');
    //         }
    //     });

    //     navItems.forEach(link => {
    //         link.classList.remove('active');
    //         if (link.getAttribute('href').includes(current)) {
    //             link.classList.add('active');
    //         }
    //     });
    // });
});
