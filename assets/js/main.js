"use strict";
/*--
    sticky  menu js 
-----------------------------------*/
window.addEventListener('scroll', function() {
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

/*--
    back to top js 
-----------------------------------*/
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

/*--
    Hero Slider 
-----------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    let heroSlider = new Swiper(".hero-banner .swiper", {
        // direction: "vertical", // Uncomment if you want vertical slide
        autoplay: {
            delay: 5000, // 5 seconds
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero-banner .swiper-pagination",
            clickable: true,
        },
    });
});

/*--
    Counter Up js
-----------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // speed control

    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const options = {
        threshold: 0.6, // 60% visible holei count shuru
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); // once count up, no repeat
            }
        });
    }, options);

    counters.forEach((counter) => {
        observer.observe(counter);
    });
});

/*--
    testimonial slider js
-----------------------------------*/
(function ($) {
    "use strict";
    $(".testimonial-active").slick({
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        prevArrow:
            '<span class="prev"><i class="fa-solid fa-arrow-left"></i></span>',
        nextArrow:
            '<span class="next"><i class="fa-solid fa-arrow-right"></i></span>',
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                },
            },

            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    });

 // WOW active
new WOW().init();
})(jQuery);

/*--
    Contact From SMPT js
-----------------------------------*/

const form = document.querySelector("form");

const checkBoxOne = document.getElementById("check-box-1");
const checkBoxTwo = document.getElementById("check-box-2");
const checkBoxThree = document.getElementById("check-box-3");
const checkBoxFour = document.getElementById("check-box-4");
const checkBoxFive = document.getElementById("check-box-5");

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const sendMail = () => {
    // Collect checked boxes into an array here (on submit time)
    const selectedSubjects = [];
    if (checkBoxOne.checked) selectedSubjects.push(checkBoxOne.value);
    if (checkBoxTwo.checked) selectedSubjects.push(checkBoxTwo.value);
    if (checkBoxThree.checked) selectedSubjects.push(checkBoxThree.value);
    if (checkBoxFour.checked) selectedSubjects.push(checkBoxFour.value);
    if (checkBoxFive.checked) selectedSubjects.push(checkBoxFive.value);

    const messageBody = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>New Message Received</title>
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
                h2 { color: #4CAF50; }
                p { line-height: 1.6; }
                .label { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>New Contact Form Submission</h2>
                <p><span class="label">Full Name:</span> ${name.value} </p>
                <p><span class="label">Email:</span> ${email.value} </p>
                <p><span class="label">Subject(s):</span> ${selectedSubjects.join(
                    ", "
                )}</p>
                <p><span class="label">Message:</span></p>
                <p>${message.value}</p>
            </div>
        </body>
    </html>`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "mainulmehedi17@gmail.com",
        Password: "293E6B3E03DC47B38C92AEEBAC1DFACC25DB",
        To: "mainulmehedi17@gmail.com",
        From:"mainulmehedi17@gmail.com",
        Subject:
            selectedSubjects.length > 0
                ? selectedSubjects.join(", ")
                : "No Subject",
        Body: messageBody,
    }).then((message) => {
        if (message === "OK") {
            Swal.fire({
                title: "Message sent successfully!",
                icon: "success",
                draggable: true,
            });
            form.reset(); // Reset the form after successful submission
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to send message. Please try again later.",
            });
        }
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMail();
});
