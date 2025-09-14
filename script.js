const places = [
    {
        name: "MYLINGUR",
        type: "NOMINEE",
        detail: "FAROE ISLANDS",
        label: "SEE DETAILS"
    },
    {
        name: "MOUNT DENALI",
        type: "AWWWARDS",
        detail: "ALASKA, USA",
        label: "SEE DETAILS"
    },
    {
        name: "TABLE MOUNTAIN",
        type: "NATURAL WONDER",
        detail: "CAPE TOWN, SOUTH AFRICA",
        label: "SEE DETAILS"
    },
    {
        name: "PETRA",
        type: "WORLD HERITAGE",
        detail: "JORDAN",
        label: "SEE DETAILS"
    },
    {
        name: "ANGKOR WAT",
        type: "CULTURAL SITE",
        detail: "CAMBODIA",
        label: "SEE DETAILS"
    },
    {
        name: "ULURU",
        type: "SACRED LAND",
        detail: "NORTHERN TERRITORY, AUSTRALIA",
        label: "SEE DETAILS"
    },
    {
        name: "MACHU PICCHU",
        type: "HISTORIC SANCTUARY",
        detail: "PERU",
        label: "SEE DETAILS"
    }
];

document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis({
        autoRaf: true,
    });

    const placesListContainer = document.querySelector(".places-list");
    
    if (!placesListContainer) {
        console.error("Could not find .places-list element");
        return;
    }

    const POSITIONS = {
        BOTTOM: 0,
        MIDDLE: -80,
        TOP: -160,
    };

    let activePlace = null;

    // Create place elements
    places.forEach((place) => {
        const placeElement = document.createElement("div");
        placeElement.className = "place";

        placeElement.innerHTML = `
        <div class="place-wrapper">
            <div class="place-name">
                <h1>${place.name}</h1>
                <h1>${place.type}</h1>
            </div>
            <div class="place-detail">
                <h1>${place.detail}</h1>
                <h1>${place.label}</h1>
            </div>
            <div class="place-name">
                <h1>${place.name}</h1>
                <h1>${place.type}</h1>
            </div>
        </div>`;

        placesListContainer.appendChild(placeElement);
    });

    const placesElements = document.querySelectorAll(".place");

    // Set initial positions
    placesElements.forEach((place) => {
        const wrapper = place.querySelector(".place-wrapper");
        gsap.set(wrapper, { y: POSITIONS.TOP });
    });

    // Add hover event listeners
    placesElements.forEach((place) => {
        const wrapper = place.querySelector(".place-wrapper");

        place.addEventListener("mouseenter", (e) => {
            // Clear any existing active place
            if (activePlace && activePlace !== place) {
                const prevWrapper = activePlace.querySelector(".place-wrapper");
                gsap.to(prevWrapper, {
                    y: POSITIONS.TOP,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }

            activePlace = place;
            
            // Animate current place to middle
            gsap.to(wrapper, {
                y: POSITIONS.MIDDLE,
                duration: 0.4,
                ease: "power2.out",
            });
        });

        place.addEventListener("mouseleave", (e) => {
            // Only animate out if this is still the active place
            if (activePlace === place) {
                const rect = place.getBoundingClientRect();
                const mouseY = e.clientY;
                const centerY = rect.top + rect.height / 2;
                
                // Determine exit direction
                const exitToTop = mouseY < centerY;
                
                gsap.to(wrapper, {
                    y: exitToTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                    duration: 0.4,
                    ease: "power2.out",
                });
                
                activePlace = null;
            }
        });
    });

    // Handle scroll events to reset positions if needed
    let scrollTimeout;
    document.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Reset any stuck animations after scroll
            if (activePlace) {
                const rect = activePlace.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // If active place is out of viewport, reset it
                if (rect.bottom < 0 || rect.top > viewportHeight) {
                    const wrapper = activePlace.querySelector(".place-wrapper");
                    gsap.to(wrapper, {
                        y: POSITIONS.TOP,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                    activePlace = null;
                }
            }
        }, 100);
    }, { passive: true });
});
//going to get scrapped soon