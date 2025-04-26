//البحث الفعلي
document.querySelector(".search-box").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let query = this.value.toLowerCase();
        window.location.href = "search-results.html?q=" + query;
    }
});
function navigateTo(page) {
    window.location.href = page;
}
//الترجمة

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'ar', includedLanguages: 'en,ar'}, 'google_translate_element');
}
document.addEventListener("DOMContentLoaded", function () {
    // التحقق من وجود زر تغيير اللغة أولاً
    const toggleLanguageButton = document.getElementById("toggle-language");
    if (toggleLanguageButton) {
        toggleLanguageButton.addEventListener("click", function() {
            let select = document.querySelector(".goog-te-combo");
            if (select) {
                select.value = select.value === "ar" ? "en" : "ar";
                select.dispatchEvent(new Event("change"));
            }

            let translateDiv = document.getElementById("google_translate_element");
            if (translateDiv) {
                translateDiv.classList.toggle("show");
            }
        });
    }

    // التأكد من أن اللوجو موجود وإضافة التأثيرات له
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.classList.add("show");
        logo.classList.add("pulsing");
    }

    // تأثير التحريك للكتب عند التمرير عليها
    const books = document.querySelectorAll(".book-card");
    books.forEach((book) => {
        book.addEventListener("mouseover", () => {
            book.style.transform = "scale(1.1) rotate(3deg)";
            book.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
        });

        book.addEventListener("mouseout", () => {
            book.style.transform = "scale(1) rotate(0deg)";
            book.style.boxShadow = "none";
        });
    });

    // إضافة الكتب إلى الـ slider
    const booksData = [
        { title: "كتاب 1", author: "المؤلف 1", img: "bookr1.png"},
        { title: "كتاب 2", author: "المؤلف 2", img: "bookr2.jpg" },
        { title: "كتاب 3", author: "المؤلف 3", img: "bookr3.jpg" },
        { title: "كتاب 4", author: "المؤلف 4", img: "bookr4.jpg" },
        { title: "كتاب 5", author: "المؤلف 5", img: "bookr5.jpg" }
    ];

    const bookSlider = document.getElementById("book-slider");
    if (bookSlider) {
        booksData.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
            `;
            bookSlider.appendChild(bookDiv);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollTopButton = document.getElementById("scrollTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    });

    scrollTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".footer");
    const socialIcons = document.querySelectorAll(".social-icon");

    // ✅ تأثير ظهور الفوتر عند التمرير (Fade-in)
    function checkFooterVisibility() {
        const footerPosition = footer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (footerPosition < screenHeight - 100) {
            footer.classList.add("visible");
        }
    }

    window.addEventListener("scroll", checkFooterVisibility);
    checkFooterVisibility();

    // ✅ تأثير تفاعل أيقونات التواصل الاجتماعي عند التمرير عليها
    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.2) rotate(5deg)";
            this.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.5)";
        });

        icon.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1) rotate(0deg)";
            this.style.boxShadow = "none";
        });
    });
    // ✅ تأثير إضاءة تدريجية على الروابط عند تمرير الفأرة
    const footerLinks = document.querySelectorAll(".footer-links ul li a");
    footerLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            this.style.color = "#ff5733";
            this.style.textShadow = "0px 0px 10px rgba(255, 87, 51, 0.8)";
        });

        link.addEventListener("mouseleave", function () {
            this.style.color = "#05A099";
            this.style.textShadow = "none";
        });
    });
});