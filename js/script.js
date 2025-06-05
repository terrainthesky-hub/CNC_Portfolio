document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect for Hero Subtitle ---
    const subtitleElement = document.getElementById('subtitle');
    const subtitles = [
        "A Creative Web Developer",
        "A Problem Solver",
        "A Lifelong Learner",
        "Building Things for the Web"
    ];
    let subtitleIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < subtitles[subtitleIndex].length) {
            subtitleElement.textContent += subtitles[subtitleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            subtitleElement.textContent = subtitles[subtitleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Start the effect
    if (subtitleElement) {
        setTimeout(typeWriter, 1000);
    }

    // --- Dynamic Project Loading ---
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            const projectCard = `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
                            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank">GitHub Repo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            projectsGrid.innerHTML += projectCard;
        });
    }

    // --- Fade-in on Scroll Animation ---
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Contact Form Submission Handling (Formspree) ---
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.style.color = 'var(--primary-color)';
                formStatus.innerHTML = "Thanks for your message! I'll get back to you soon.";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.style.color = 'red';
                        formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                    }
                })
            }
        }).catch(error => {
            formStatus.style.color = 'red';
            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
        });
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});
