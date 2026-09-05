/**
 * SS COLLECTION - WHOLESALE WOMEN'S FASHION BANGALORE
 * Dressing Businesses Brighter • Interactive Scripts & Preloader
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------- Luxury Page Preloader Dismissal (Elegant Showcase) ----------------
    const preloader = document.getElementById('pagePreloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 800);
        }, 2200);
    }

    // ---------------- 2nd Section: Category Infinite Marquee Cards ----------------
    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', () => {
            const catName = card.querySelector('.cat-name')?.textContent || 'Collection';
            const msg = encodeURIComponent(`Hi SS Collection, I am interested in wholesale designs and pricing for *${catName}*. Please send catalog.`);
            window.open(`https://wa.me/918123456789?text=${msg}`, '_blank');
        });
    });

    // ---------------- Scroll Reveal Intersection Observer ----------------
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => observer.observe(el));

    // ---------------- Wholesale Quote Modal ----------------
    const quoteModal = document.getElementById('quoteModal');
    const openQuoteBtn = document.getElementById('openQuoteBtn');
    const closeQuoteModal = document.getElementById('closeQuoteModal');
    const quoteForm = document.getElementById('quoteForm');

    if (openQuoteBtn && quoteModal) {
        openQuoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            quoteModal.classList.add('active');
        });
    }

    if (closeQuoteModal && quoteModal) {
        closeQuoteModal.addEventListener('click', () => {
            quoteModal.classList.remove('active');
        });
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) quoteModal.classList.remove('active');
        });
    }

    // Submit Quote directly to WhatsApp
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('custName').value.trim();
            const city = document.getElementById('custCity').value.trim();
            const category = document.getElementById('custCat').value;
            const phone = document.getElementById('custPhone').value.trim();

            if (!name || !city || !phone) {
                showToast('Please fill all required fields.', '⚠️');
                return;
            }

            const msg = `*✨ Wholesale Inquiry - SS Collection ✨*\n\n` +
                        `*Name/Business:* ${name}\n` +
                        `*City/State:* ${city}\n` +
                        `*Categories:* ${category}\n` +
                        `*WhatsApp Contact:* ${phone}\n\n` +
                        `_Please send the latest wholesale catalog and price list._`;

            const encoded = encodeURIComponent(msg);
            window.open(`https://wa.me/918123456789?text=${encoded}`, '_blank');
            quoteModal.classList.remove('active');
            showToast('Opening WhatsApp with your wholesale inquiry!', '✅');
            quoteForm.reset();
        });
    }

    // ---------------- Toast Helper ----------------
    function showToast(message, icon = '✨') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ---------------- Search Button ----------------
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = prompt('Enter style or category to search (e.g. Kurtis, Co-ords, Western):');
            if (query) {
                const msg = encodeURIComponent(`Hi SS Collection, do you have wholesale stock for "${query}"?`);
                window.open(`https://wa.me/918123456789?text=${msg}`, '_blank');
            }
        });
    }

    // ---------------- Footer Enquiry Form ----------------
    const footEnquiryForm = document.getElementById('footerEnquiryForm');
    const footSubmitBtn = document.getElementById('footSubmitBtn');
    if (footEnquiryForm && footSubmitBtn) {
        footSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('footName')?.value.trim();
            const biz = document.getElementById('footBusiness')?.value.trim();
            const phone = document.getElementById('footPhone')?.value.trim();
            const msg = document.getElementById('footMsg')?.value.trim();

            if (!name || !biz || !phone) {
                showToast('Please fill in your Name, Business Name, and Phone Number.', '⚠️');
                return;
            }

            const waText = encodeURIComponent(
                `*New Website B2B Enquiry*\n\n` +
                `*Name:* ${name}\n` +
                `*Business:* ${biz}\n` +
                `*Phone:* ${phone}\n` +
                (msg ? `*Message:* ${msg}\n` : '') +
                `\nPlease share wholesale catalog and pricing sheet.`
            );

            showToast('Sending enquiry via WhatsApp...', '💬');
            setTimeout(() => {
                window.open(`https://wa.me/918123456789?text=${waText}`, '_blank');
                footEnquiryForm.reset();
            }, 600);
        });
    }

    // ---------------- Back To Top Button ----------------
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

