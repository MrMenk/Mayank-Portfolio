document.addEventListener("DOMContentLoaded", () => {

    /* ================= HERO TYPING ================= */
    const words = ["WELCOME", "स्वागत है", "ਜੀ ਆਇਆਂ ਨੂੰ", "خوش آمدید", "સ્વાગત છે"];
    const textEl = document.getElementById("welcome-text");

    let typingSpeed = 120;
    let deletingSpeed = 60;
    let holdAfterType = 800;

    let currentWord = words[Math.floor(Math.random() * words.length)];
    let charIndex = 0;
    let isDeleting = false;
    let paused = false;

    function typeLoop() {
        if (paused) return;

        textEl.textContent = currentWord.slice(0, isDeleting ? charIndex-- : charIndex++);

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, holdAfterType);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentWord = words[Math.floor(Math.random() * words.length)];
        }

        setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }

    textEl.addEventListener("mouseenter", () => paused = true);
    textEl.addEventListener("mouseleave", () => { paused = false; typeLoop(); });
    typeLoop();


    /* ================= COUNTERS ================= */
    document.querySelectorAll(".count").forEach(counter => {
        const target = +counter.dataset.target;
        let current = 0;
        const step = Math.max(1, target / 100);

        const update = () => {
            current += step;
            counter.textContent = Math.min(Math.floor(current), target);
            if (current < target) requestAnimationFrame(update);
        };
        update();
    });


    /* ================= SIDEBAR (FIXED) ================= */
    const sideNav = document.getElementById("sideNav");
    const about = document.getElementById("about");

    if (sideNav && about) {
        const triggerPoint = about.offsetTop - 120;

        window.addEventListener("scroll", () => {
            if (window.scrollY >= triggerPoint) {
                sideNav.classList.add("active");
            } else {
                sideNav.classList.remove("active");
            }
        });
    }


    document.querySelectorAll(".submenu-toggle").forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();

            // toggle submenu
            this.parentElement.classList.toggle("active");

            // manual scroll
            const target = document.getElementById("Projects");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    document.querySelectorAll(".submenu-toggle").forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();

            // manual scroll
            const target = document.getElementById("BLogs");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });






    document.addEventListener("DOMContentLoaded", () => {
        const toggleBtn = document.getElementById("menuToggle");
        const submenu = document.getElementById("submenu");

        // Toggle submenu open/close
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isOpen = submenu.classList.toggle("open");
            toggleBtn.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                // Smooth scroll to submenu
                submenu.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        // Close submenu when clicking outside
        document.addEventListener("click", (e) => {
            if (!submenu.contains(e.target) && e.target !== toggleBtn) {
                submenu.classList.remove("open");
                toggleBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Smooth scroll for submenu links
        submenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    });






const btn = document.getElementById("resumeBtn");
const text = document.getElementById("btnText");
const track = document.getElementById("track");
const bar = document.getElementById("bar");

btn.addEventListener("click", () => {
    btn.disabled = true;
    text.textContent = "   ...     ";
    track.style.opacity = "1";

    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 10;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                track.style.opacity = "0";
                text.innerHTML = `
                    <svg class="checkmark" viewBox="0 0 52 52">
                        <path d="M14 27 L22 35 L38 18"></path>
                    </svg>
                    <span>Download Started</span>
    
                `;
            }, 200);

            // REAL DOWNLOAD (optional)
            window.location.href = "/Assets/Resume-Professional.pdf";
        }

        bar.style.width = progress + "%";
    }, 300);
});









    /* ================= HAMBURGER ================= */
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    hamburger?.addEventListener("click", () => {
        menu.classList.toggle("active");
    });


    /* ================= SUBMENU ================= */
    document.querySelectorAll(".submenu-toggle").forEach(toggle => {
        toggle.addEventListener("click", e => {
            e.preventDefault();
            const parent = toggle.parentElement;

            document.querySelectorAll(".has-submenu").forEach(item => {
                if (item !== parent) item.classList.remove("active");
            });

            parent.classList.toggle("active");
        });
    });


    /* ================= CONTACT FORM ================= */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form?.addEventListener("submit", async e => {
        e.preventDefault();
        status.textContent = "Sending...";

        try {
            const res = await fetch("https://formspree.io/f/xkoglldn", {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            status.textContent = res.ok ? "Message sent!" : "Something went wrong";
            status.style.color = res.ok ? "green" : "red";
            if (res.ok) form.reset();

        } catch {
            status.textContent = "Network error";
            status.style.color = "red";
        }
    });


    /* ================= BLOG PAGINATION ================= */
    const posts = document.querySelectorAll(".blog-card");
    const prev = document.getElementById("prevBtn");
    const next = document.getElementById("nextBtn");
    let page = 0;
    const PER_PAGE = 6;

    function renderPosts() {
        posts.forEach((p, i) => {
            p.style.display = i >= page * PER_PAGE && i < (page + 1) * PER_PAGE ? "block" : "none";
        });
        prev.disabled = page === 0;
        next.disabled = (page + 1) * PER_PAGE >= posts.length;
    }

    prev?.addEventListener("click", () => { page--; renderPosts(); });
    next?.addEventListener("click", () => { page++; renderPosts(); });
    renderPosts();


    /* ================= SCROLL TO TOP ================= */
    const scrollBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });
    scrollBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* ================= FOOTER TOGGLE ================= */
    document.getElementById("footerToggle")?.addEventListener("click", () => {
        document.querySelector(".footer")?.classList.toggle("light");
    });


    /* ================= RESUME DOWNLOAD ================= */
    const btn = document.getElementById("resumeBtn");
    const text = document.getElementById("btnText");
    const bar = document.getElementById("bar");
    const track = document.getElementById("track");

    btn?.addEventListener("click", () => {
        btn.disabled = true;
        track.style.opacity = "1";

        let progress = 0;
        const timer = setInterval(() => {
            progress += 12;
            bar.style.width = progress + "%";

            if (progress >= 100) {
                clearInterval(timer);
                text.innerHTML = "✔ Download Started";
                window.location.href = "/Assets/Resume-Professional.pdf";
            }
        }, 250);
    });


    /* ================= SKILL BARS ================= */
    document.querySelectorAll(".progress-fill").forEach(bar => {
        bar.style.width = bar.dataset.progress + "%";
    });

});

