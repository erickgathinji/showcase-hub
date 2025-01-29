import {projects} from '../js/portfolio.js';

(function ($) {
    "use strict";
    var nav = $('nav');
    var navHeight = nav.outerHeight();

    $('.navbar-toggler').on('click', function () {
        if (!$('#mainNav').hasClass('navbar-reduce')) {
            $('#mainNav').addClass('navbar-reduce');
        }
    })

    // Preloader
    $(window).on('load', function () {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    /*--/ Star ScrollTop /--*/
    $('.scrolltop-mf').on("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    /*--/ Star Counter /--*/
    $('.counter').counterUp({
        delay: 15,
        time: 2000,
        formatter: function (value) {
            // Ensures that each number will have a percentage sign appended to it
            return value + '%';
        }
    });


    /*--/ Star Scrolling nav /--*/
    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - navHeight + 5)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll').on("click", function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: navHeight
    });
    /*--/ End Scrolling nav /--*/

    /*--/ Navbar Menu Reduce /--*/
    $(window).trigger('scroll');
    $(window).on('scroll', function () {
        var pixels = 50;
        var top = 1200;
        if ($(window).scrollTop() > pixels) {
            $('.navbar-expand-md').addClass('navbar-reduce');
            $('.navbar-expand-md').removeClass('navbar-trans');
        } else {
            $('.navbar-expand-md').addClass('navbar-trans');
            $('.navbar-expand-md').removeClass('navbar-reduce');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        }
    });

    /*--/ Star Typed /--*/
    if ($('.text-slider').length == 1) {
        var typed_strings = $('.text-slider-items').text();
        var typed = new Typed('.text-slider', {
            strings: typed_strings.split(','),
            typeSpeed: 80,
            loop: true,
            backDelay: 1100,
            backSpeed: 30
        });
    }

    /*--/ Testimonials owl /--*/
    $('#testimonial-mf').owlCarousel({
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            }
        }
    });

    // Add event listeners for navigation buttons
    const owl = $('#testimonial-mf');
    $('.prev-btn').click(function () {
        owl.trigger('prev.owl.carousel');
    });
    $('.next-btn').click(function () {
        owl.trigger('next.owl.carousel');
    });

    // Testimonials Modal content
    document.querySelectorAll(".view-more").forEach(button => {
        button.addEventListener("click", function () {
            const author = this.getAttribute("data-author");
            const fullText = this.getAttribute("data-full-text");

            document.getElementById("testimonialAuthor").textContent = author;
            document.getElementById("testimonialContent").textContent = fullText;
        });
    });

    // View Button in Testimonials
    document.querySelectorAll(".view-more").forEach(button => {
        button.addEventListener("click", function () {
            const author = this.getAttribute("data-author");
            const fullText = this.getAttribute("data-full-text");

            // Split the fullText into paragraphs based on periods followed by a space
            const paragraphs = fullText.split(". ").map(sentence => sentence.trim() + ".");

            // Update the modal content with each paragraph wrapped in a <p> tag
            const contentHTML = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("");

            // Set the modal content
            document.getElementById("testimonialAuthor").textContent = author;
            document.getElementById("testimonialContent").innerHTML = contentHTML;
        });
    });

    // Dynamic Portfolio Js
    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(".btn[data-id]");
        const modalTitle = document.getElementById("portfolioModalTitle");
        const modalDescription = document.querySelector(".projectdescription");
        const modalMainImage = document.querySelector(".img-main");
        const modalThumbnails = document.querySelector(".thumbs");
        const modalTools = document.querySelector(".technologies ul");
        const modalLinks = document.querySelector(".project-links ol");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const projectId = button.getAttribute("data-id");
                const project = projects[projectId];

                if (project) {
                    // Update modal content
                    modalTitle.textContent = project.title;
                    modalDescription.textContent = project.projectdescription;
                    modalMainImage.src = project.mainImage;

                    // Update thumbnails
                    modalThumbnails.innerHTML = project.thumbnails
                        .map((img) => `<div class="col-md-2">
            <a href="${img}" data-lightbox="project-${projectId}" data-title="Project Image">
                <img src="${img}" alt="Thumbnail" class="img-fluid">
            </a>
        </div>`)
                        .join("");

                    // Update tools
                    modalTools.innerHTML = project.tools
                        .map((tool) => `<li>${tool}</li>`)
                        .join("");

                    // Update links with dynamic labels
                    modalLinks.innerHTML = project.links
                        .map(
                            (link) =>
                                `<li><a href="${link.url}" target="_blank">
                                <i class="${link.icon}"></i> ${link.label}
                            </a></li>`
                        )
                        .join("");
                }
            });
        });
    });


})(jQuery);

