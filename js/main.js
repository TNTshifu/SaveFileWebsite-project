
//Translation data
const translations = {
    en: {
        "home-title": "HOME",
        "secondpage-title": "RESERVATIONS&GAMES",
        "thirdpage-title": "CONTACT",
        "hero-title": "Welcome to Save File",
        "hero-text": "Check Out!",
        "hero-button": "Book",
        "feature1-title": "Bar & Lounge",
        "feature2-title": "Videogames",
        "feature3-title": "Events",
        "feature4-title": "Quizzes",
        "feature5-title": "Drinks & Snacks",
        "feature6-title": "Boardgames",
        "footer-text": " &copy; 2025 Save File. All rights reserved."
    },
    fi: {
        "home-title": "KOTI",
        "secondpage-title": "VARAUS&PELIT",
        "thirdpage-title": "YHTEYSTIEDOT",
        "hero-title": "Tervetuloa Save Fileen",
        "hero-text": "Vieraile!",
        "hero-button": "Varaa",
        "feature1-title": "Baari ja lounge",
        "feature2-title": "Videopelejä",
        "feature3-title": "Tapahtumia",
        "feature4-title": "Arvauspelejä",
        "feature5-title": "Juomia ja herkkuja",
        "feature6-title": "Lautapelejä",
        "footer-text": " &copy; 2025 Save File. Kaikki oikeudet pidätetään."
    }
};

//Select all elements with data-key
const translatableElements = document.querySelectorAll("[data-key]");

//Get language buttons
const langButtons = document.querySelectorAll(".lang-btn");

//Function to update all text
function changeLanguage(lang) {
    translatableElements.forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

//Add event listeners for language switching
langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedLang = btn.dataset.lang;
        changeLanguage(selectedLang);
        localStorage.setItem("preferredLang", selectedLang);


    //Highlight the active language button  
    langButtons.forEach(b => b.classList.remove("active-lang"));
    btn.classList.add("active-lang");
    });
});


//Load saved language on page load
const savedLang = localStorage.getItem("preferredLang") || "en";
changeLanguage(savedLang);

//Highlight the correct language after reload
langButtons.forEach(b => {
    b.classList.toggle("active-lang", b.dataset.lang === savedLang);
});
