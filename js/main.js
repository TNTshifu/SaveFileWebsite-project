
//Translation data
const translations = {
    en: {
        "home-title": "HOME",
        "secondpage-title": "RESERVATIONS&GAMES",
        "thirdpage-title": "CONTACT",
        "hero-title": "Welcome!",
        "hero-text": "City's first and oldest videogame bar is here!",
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
        "hero-title": "Kaupungin ensimmäinen ja vanhin videopeli-baari on täällä!",
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


//Hero-carousel functionality

// 1. Slides data
const slides = [
    { title: "Welcome!", description: "City's first and oldest videogame bar is here!", image: "images/groupgaming.jpg" },
    { title: "Enjoy games and drinks!", description: "Quench your thirst and satisfy your nerd necessities!", image: "images/lautapelailua.jpg" }, 
    { title: "Join our events!", description: "Join our seasonal events and quizzes!", image: "images/halloween.jpg" }
];

slides.forEach(slide => {
  const img = new Image();
  img.src = slide.image;
});

// Select elements used in the carousel
const heroImageContainer = document.querySelector(".hero-carousel-image");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-description");
const heroText = document.querySelector(".hero-carousel-text");

// 3. Carousel logic
let current = 0;

function slideNext() {
  const nextIndex = (current + 1) % slides.length;

  // Create new image element
  const nextImg = document.createElement("img");
  nextImg.src = slides[nextIndex].image;
  nextImg.style.position = "absolute";
  nextImg.style.top = "0";
  nextImg.style.left = "0%";
  nextImg.style.width = "100%";
  nextImg.style.height = "100%";
  nextImg.style.objectFit = "cover";
  nextImg.style.transition = "transform 1.5s ease-in-out, opacity 1.5s ease-in-out";
  nextImg.style.transform = "translateX(100%)"; // start offscreen to right
  nextImg.style.opacity = "0"; //start invisible
  nextImg.style.zIndex = "2";

  heroImageContainer.appendChild(nextImg);

  // Animate slides
  const currentImg = heroImageContainer.querySelector("img:first-child");
  if (currentImg) {
    currentImg.style.zIndex = "1";
    setTimeout(() => {
      // Slide out the current one
      currentImg.style.transform = "translateX(-100%)";
      currentImg.style.opacity = "0";

      // Slide in the new one
      nextImg.style.transform = "translateX(0)";
      nextImg.style.opacity = "1";
    }, 50);
  }

  // Update text
  heroText.classList.add("text-fade-out");
  setTimeout(() => {
    heroTitle.textContent = slides[nextIndex].title;
    heroDesc.textContent = slides[nextIndex].description;
    heroText.classList.remove("text-fade-out");
    heroText.classList.add("text-fade-in");
  }, 500);

  // Clean up old image
  setTimeout(() => {
    if (currentImg && heroImageContainer.contains(currentImg)) {
      heroImageContainer.removeChild(currentImg);
    }
    heroText.classList.remove("text-fade-in");
    current = nextIndex;
  }, 1200); // Slightly longer to ensure smooth transition
}

setInterval(slideNext, 5000);