/**
 * Threadline Textiles - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileDrawer();
    initSmoothScroll();
    initCapabilitiesCounter();
    initTestimonialsCarousel();
    initLeafletMap();
    initBackToTop();
});

/* ==========================================================================
   1. Header Scroll & Active Section Highlighting
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Nav active link tracking on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
    const mobileToggle = document.getElementById('mobileToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        const closeDrawer = () => {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (drawerClose) {
            drawerClose.addEventListener('click', closeDrawer);
        }

        drawerLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }
}

/* ==========================================================================
   3. Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === 'javascript:void(0)') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   4. Capabilities Animated Counter
   ========================================================================== */
function initCapabilitiesCounter() {
    const statBoxes = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statBoxes.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    const suffix = stat.getAttribute('data-suffix') || '+';
                    let count = 0;
                    const duration = 1600; // ms
                    const stepTime = 25;
                    const totalSteps = duration / stepTime;
                    const increment = target / totalSteps;

                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            count = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(count) + suffix;
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    const capabilitiesSection = document.getElementById('capabilities');
    if (capabilitiesSection) {
        observer.observe(capabilitiesSection);
    }
}

/* ==========================================================================
   5. Testimonials Carousel / Dots
   ========================================================================== */
function initTestimonialsCarousel() {
    const dots = document.querySelectorAll('#carouselDots .dot');
    const cards = document.querySelectorAll('.testimonial-card');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Visual feedback on mobile / desktop focus
            if (window.innerWidth <= 768) {
                cards.forEach((card, cIndex) => {
                    if (cIndex === index) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });
            } else {
                cards.forEach((card, cIndex) => {
                    if (cIndex === index) {
                        card.style.borderColor = '#0d5be1';
                        card.style.transform = 'translateY(-6px)';
                    } else {
                        card.style.borderColor = 'var(--color-border-light)';
                        card.style.transform = 'none';
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   6. Leaflet Interactive Map
   ========================================================================== */
function initLeafletMap() {
    const mapElement = document.getElementById('interactiveMap');
    if (!mapElement) return;

    // Peenya Industrial Area, Bangalore Coordinates
    const peenyaCoords = [13.0315, 77.5255];

    try {
        const map = L.map('interactiveMap', {
            center: peenyaCoords,
            zoom: 14,
            zoomControl: true,
            scrollWheelZoom: false
        });

        // Crisp Tile Layer with clean styling
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a>, OpenStreetMap',
            maxZoom: 19
        }).addTo(map);

        // Custom High-Res Pin Icon
        const customIcon = L.divIcon({
            className: 'custom-leaflet-marker',
            html: `
                <div style="
                    background-color: #0d5be1;
                    width: 38px;
                    height: 38px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid #ffffff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fa-solid fa-industry" style="
                        transform: rotate(45deg);
                        color: #ffffff;
                        font-size: 14px;
                    "></i>
                </div>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 38]
        });

        const marker = L.marker(peenyaCoords, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
                <strong style="color: #07152b; font-size: 13px;">Threadline Textiles Plant</strong><br>
                <span style="color: #64748b; font-size: 11px;">KIADB Industrial Area, Peenya, Bangalore</span>
            </div>
        `);
    } catch (e) {
        console.warn('Leaflet map initialization skipped or fallback active.', e);
        mapElement.innerHTML = `
            <img src="assets/images/map_preview.jpg" alt="Bangalore Location Map" style="width:100%;height:100%;object-fit:cover;">
        `;
    }
}

/* ==========================================================================
   7. Fabric Modal & Specification Data
   ========================================================================== */
const fabricCatalogData = {
    shirting: {
        title: "Shirting Fabrics Collection",
        badge: "Menswear Shirting",
        img: "assets/images/fabric_shirting.jpg",
        description: "Our premium shirting fabrics are engineered with precision weaves offering unparalleled hand-feel, breathability, and wrinkle recovery for bespoke formal and casual shirting brands.",
        specs: [
            { label: "Weave Types", val: "Poplin, Oxford, Fine Twill, Dobby, End-on-End, Linen Blend" },
            { label: "Yarn Counts", val: "40s, 50s, 60s, 80/2, 100/2 Compact Cotton" },
            { label: "Weight (GSM)", val: "105 - 145 GSM" },
            { label: "Finishes", val: "Silk Soft, Liquid Ammonia, Easy Care & Anti-Bacterial" },
            { label: "MOQ", val: "500 Meters / Shade" }
        ]
    },
    suiting: {
        title: "Suiting Fabrics Collection",
        badge: "Menswear Suiting",
        img: "assets/images/fabric_suiting.jpg",
        description: "Engineered for jackets, trousers, and corporate executive apparel. High dimensional stability, wrinkle resistance, and drape excellence.",
        specs: [
            { label: "Composition", val: "Poly-Viscose (PV), Poly-Wool blends, 100% Fine Wool" },
            { label: "Weave Types", val: "Worsted Twill, Herringbone, Birdseye, Sharkskin, Matty" },
            { label: "Weight (GSM)", val: "220 - 360 GSM" },
            { label: "Finishes", val: "Teflon Stain Guard, Wrinkle-Free, Natural Stretch" },
            { label: "MOQ", val: "300 Meters / Shade" }
        ]
    },
    denim: {
        title: "Denim Fabrics Collection",
        badge: "Authentic & Stretch Denim",
        img: "assets/images/fabric_denim.jpg",
        description: "From rugged classic vintage denims to high-performance hyper-stretch blends, crafted for commercial jeanswear brands and international labels.",
        specs: [
            { label: "Weight Range", val: "8.5 oz to 14.5 oz" },
            { label: "Dyes & Shades", val: "Pure Indigo, Dark Black, Tinted Blue, Sulfur Grey" },
            { label: "Elastane Blends", val: "100% Cotton Rigid, 2% Spandex, DualFX High Stretch" },
            { label: "Weave Types", val: "3/1 Right Hand Twill, Left Hand Twill, Broken Twill" },
            { label: "MOQ", val: "1,000 Meters / Quality" }
        ]
    },
    knitted: {
        title: "Knitted Fabrics Collection",
        badge: "Circular & Flat Knits",
        img: "assets/images/fabric_knitted.jpg",
        description: "High-grade circular knit fabrics for t-shirts, polos, athleisure, and premium loungewear with superior color fastness and shape retention.",
        specs: [
            { label: "Structure", val: "Single Jersey, Pique, 1x1 / 2x2 Rib, French Terry, Fleece" },
            { label: "Compositions", val: "100% Combed Cotton, Cotton-Spandex, Poly-Cotton, Modal" },
            { label: "Weight (GSM)", val: "160 - 320 GSM" },
            { label: "Finishes", val: "Bio-Wash, Silicon Wash, Peach Finish, Moisture Wicking" },
            { label: "MOQ", val: "300 Kgs / Shade" }
        ]
    },
    uniform: {
        title: "Uniform & Institutional Fabrics",
        badge: "Heavy Duty & Workwear",
        img: "assets/images/fabric_uniform.jpg",
        description: "Durable, high-tensile strength fabrics designed for corporate uniforms, aviation, healthcare, hospitality, security, and industrial safety workwear.",
        specs: [
            { label: "Weaves", val: "Heavy Twill, Gabardine, Ripstop, Drill, Plain Weave" },
            { label: "Blend", val: "67/33 Polyester-Cotton, 80/20 PV, High-Tenacity Nylon Blend" },
            { label: "Weight (GSM)", val: "180 - 280 GSM" },
            { label: "Special Features", val: "Anti-Static, Water Repellent, Flame Retardant, High Rub Fastness" },
            { label: "MOQ", val: "600 Meters / Shade" }
        ]
    }
};

window.openFabricModal = function(category) {
    const data = fabricCatalogData[category];
    if (!data) return;

    document.getElementById('modalCategoryBadge').textContent = data.badge;
    document.getElementById('modalTitle').textContent = data.title;

    let specsHtml = data.specs.map(s => `
        <div style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem;">
            <span style="color: #64748b; font-weight: 600;">${s.label}:</span>
            <span style="color: #0b1a30; font-weight: 700; text-align: right; max-width: 60%;">${s.val}</span>
        </div>
    `).join('');

    document.getElementById('modalBody').innerHTML = `
        <div style="margin-bottom: 16px; border-radius: 8px; overflow: hidden; height: 180px;">
            <img src="${data.img}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 18px;">
            ${data.description}
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
            <h4 style="font-size: 0.82rem; font-weight: 800; color: #0b1a30; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px;">
                Fabric Specifications
            </h4>
            ${specsHtml}
        </div>
    `;

    document.getElementById('fabricModal').classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    document.getElementById('fabricModal').classList.remove('open');
    document.body.style.overflow = '';
};

window.closeFabricModal = function(e) {
    if (e.target.id === 'fabricModal') {
        closeModal();
    }
};

window.requestFabricQuote = function() {
    closeModal();
};

/* ==========================================================================
   8. Form Submission & Toast Feedback
   ========================================================================== */
window.handleFormSubmit = function(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        e.target.reset();
        showToast("Thank you! Your quote request has been sent. Our team will contact you shortly.");
    }, 1000);
};

window.handleNewsletterSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    form.reset();
    showToast("Subscribed! Thank you for joining our textile updates newsletter.");
};

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
