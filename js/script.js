document.addEventListener("DOMContentLoaded", () => {
    // Search functionality
    const searchBox = document.querySelector(".search-box");
    if (searchBox) {
        searchBox.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const query = event.target.value.toLowerCase();
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Fetch and display books
    async function fetchBooks(endpoint, containerId) {
        try {
            const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                displayBooks(data.data, containerId);
            } else {
                console.error(data.message);
                document.getElementById(containerId).innerHTML = '<p>خطأ في جلب الكتب</p>';
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            document.getElementById(containerId).innerHTML = '<p>حدث خطأ أثناء الاتصال بالخادم</p>';
        }
    }

    function displayBooks(books, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <img src="${book.image || 'default-book.png'}" alt="${book.title}" class="book-image">
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
                <p>التقييم: ${book.ratings_avg_rating ? book.ratings_avg_rating.toFixed(1) : 'غير متاح'}</p>
                <p>التعليقات: ${book.comments_count || 0}</p>
            `;
            container.appendChild(bookCard);
        });
    }

    // Load books for different sections
    fetchBooks('books', 'latest-books');
    fetchBooks('books', 'popular-books'); // Replace with actual endpoint for popular books if available
    fetchBooks('books', 'most-read-books'); // Replace with actual endpoint for most-read books if available

    // Scroll-to-top button
    const scrollTopButton = document.getElementById("scrollTop");
    if (scrollTopButton) {
        window.addEventListener("scroll", () => {
            scrollTopButton.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // FAQ card toggle
    const faqButton = document.querySelector(".faq-button");
    const faqCard = document.querySelector(".faq-card");
    const closeBtn = document.querySelector(".close-btn");

    if (faqButton && faqCard && closeBtn) {
        faqButton.addEventListener("click", () => {
            faqCard.classList.toggle("show");
        });

        closeBtn.addEventListener("click", () => {
            faqCard.classList.remove("show");
        });
    }

    // Footer visibility on scroll
    const footer = document.querySelector(".footer");
    if (footer) {
        const checkFooterVisibility = () => {
            const footerPosition = footer.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            if (footerPosition < screenHeight - 100) {
                footer.classList.add("visible");
            }
        };

        window.addEventListener("scroll", checkFooterVisibility);
        checkFooterVisibility();
    }

    // Social icons interaction
    const socialIcons = document.querySelectorAll(".social-icon");
    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.2) rotate(5deg)";
            icon.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.5)";
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1) rotate(0deg)";
            icon.style.boxShadow = "none";
        });
    });

    // Footer links interaction
    const footerLinks = document.querySelectorAll(".footer-links ul li a");
    footerLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            link.style.color = "#ff5733";
            link.style.textShadow = "0px 0px 10px rgba(255, 87, 51, 0.8)";
        });

        link.addEventListener("mouseleave", () => {
            link.style.color = 'var(--primary-color)';
            link.style.textShadow = "none";
        });
    });
});