// script.js

// Hamburger Menu dynamic functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });

        // Optional: close menu after clicking a link (mobile UX improvement)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            });
        });
    }
});

// Random Recipe functionality
document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.getElementById("random-recipe");
    const recipeDesc = document.getElementById("recipe-description");
    const recipeLink = document.getElementById("recipe-link");

    fetch('recipes.json')
        .then(res => res.json())
        .then(recipes => {
            if(recipes.length === 0) return;

            // Pick a random recipe
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const recipe = recipes[randomIndex];

            // Update DOM
            recipeDesc.textContent = recipe.description;
            recipeLink.textContent = recipe.title;
            recipeLink.href = recipe.link;
        })
        .catch(err => {
            console.error("Failed to load recipes:", err);
            recipeDesc.textContent = "Unable to load recipe of the day.";
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const recipeImage = document.getElementById("recipe-image");
    const recipeTitle = document.getElementById("recipe-title");
    const recipeDesc = document.getElementById("recipe-description");
    const recipeTags = document.getElementById("recipe-tags");
    const recipeLink = document.getElementById("recipe-link");
    const newRecipeBtn = document.getElementById("new-recipe-btn");

    let recipes = [];

    // Function to display a random recipe
    function showRandomRecipe() {
        if (recipes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[randomIndex];

        // Update DOM
        recipeTitle.textContent = recipe.title;
        recipeDesc.textContent = recipe.description;
        recipeLink.href = recipe.link;

        // Image
        if (recipe.image) {
            recipeImage.src = recipe.image;
            recipeImage.style.display = "block";
        } else {
            recipeImage.style.display = "none";
        }

        // Tags
        recipeTags.innerHTML = "";
        if (recipe.tags && recipe.tags.length > 0) {
            recipe.tags.forEach(tag => {
                const span = document.createElement("span");
                span.className = "tag";
                span.textContent = tag;
                recipeTags.appendChild(span);
            });
        }
    }

    // Fetch recipes.json
    fetch('recipes.json')
        .then(res => res.json())
        .then(data => {
            recipes = data;
            showRandomRecipe(); // Show first random recipe
        })
        .catch(err => {
            console.error("Failed to load recipes:", err);
            recipeDesc.textContent = "Unable to load recipe of the day.";
        });

    // Button to get another recipe
    newRecipeBtn.addEventListener("click", showRandomRecipe);
});
