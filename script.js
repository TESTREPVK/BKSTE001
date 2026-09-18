"use strict";

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
    });
});


/* =========================================================
   CASE FILE DATA
========================================================= */

const caseFiles = {
    "001": {
        title: "THE ARCHITECT",
        description:
            "A distributed intelligence network operating through multiple jurisdictions. Investigators have identified several connected entities, but no confirmed central authority.",
        status: "ACTIVE",
        access: "LEVEL 07",
        location: "UNKNOWN"
    },

    "002": {
        title: "NIGHTFALL",
        description:
            "An unidentified operator whose digital footprint repeatedly disappears after approximately seventy-two hours. Several unrelated investigations contain matching indicators.",
        status: "WATCH",
        access: "LEVEL 05",
        location: "CLASSIFIED"
    },

    "003": {
        title: "RED KING",
        description:
            "Financial intelligence indicates a distributed infrastructure involving shell entities, intermediaries and international transactions.",
        status: "CRITICAL",
        access: "LEVEL 09",
        location: "REDACTED"
    }
};


/* =========================================================
   CASE FILE MODAL
========================================================= */

const fileCards = document.querySelectorAll(".file-card");

const modal = document.getElementById("fileModal");
const modalClose = document.getElementById("modalClose");

const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const modalMeta = document.querySelectorAll(".modal-meta strong");

fileCards.forEach(card => {

    card.addEventListener("click", () => {

        const fileNumber = card.dataset.file;
        const file = caseFiles[fileNumber];

        if (!file) {
            return;
        }

        modalNumber.textContent = fileNumber;
        modalTitle.textContent = file.title;
        modalDescription.textContent = file.description;

        modalMeta[0].textContent = file.status;
        modalMeta[1].textContent = file.access;
        modalMeta[2].textContent = file.location;

        modal.classList.add("active");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    });

});


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeModal);


document.querySelector(".modal-backdrop").addEventListener(
    "click",
    closeModal
);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;

            const target = Number(
                counter.dataset.count
            );

            let current = 0;

            const duration = 1400;

            const start = performance.now();

            function updateCounter(timestamp) {

                const progress = Math.min(
                    (timestamp - start) / duration,
                    1
                );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(
                    eased * target
                );

                counter.textContent =
                    String(current).padStart(2, "0");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);
        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   SECURE FORM
========================================================= */

const secureForm = document.getElementById("secureForm");
const formMessage = document.getElementById("formMessage");

secureForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent =
            "ERROR // REQUIRED INFORMATION MISSING.";

        return;
    }

    formMessage.textContent =
        "TRANSMISSION ACCEPTED // CHANNEL SECURED.";

    secureForm.reset();

});


/* =========================================================
   PARALLAX DOSSIER
========================================================= */

const dossier =
    document.querySelector(".hero-dossier");

if (dossier && window.matchMedia("(min-width: 901px)").matches) {

    document.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 2;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 2;

        dossier.style.transform = `
            rotateX(${y * -2}deg)
            rotateY(${x * 3}deg)
            rotateZ(1deg)
        `;

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".main-nav a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `.main-nav a[href="#${entry.target.id}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        });

    },
    {
        rootMargin: "-40% 0px -50% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   TERMINAL-STYLE INTRO EFFECT
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
