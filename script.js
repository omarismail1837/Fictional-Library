// If the page is the Sign-in page
if (document.title === "The Fictional Library | Sign-in") {
    // Only set "Guest" as default username if none is stored
    if (!localStorage.getItem("username")) {
        localStorage.setItem("username", JSON.stringify("Guest"));
    }

    const form = document.getElementById("signin");
    const username = document.getElementById("username");

    // Handle form submission for signing in
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        const user = username.value.trim(); // Get and trim username input
        if (user === "") return alert("Please enter a username.");
        
        // Save username to localStorage
        localStorage.setItem("username", JSON.stringify(user));

        // Redirect to home page
        window.location.href = "Homepage.html";
    });
}

// If the page is the Homepage
else if (document.title === "The Fictional Library | Home") {
    // Retrieve stored username or use "Guest"
    const user = JSON.parse(localStorage.getItem("username")) || "Guest";

    // Display welcome message
    const header = document.getElementById("welcome");
    const welcomemsg = document.createElement("h2");
    welcomemsg.textContent = "Welcome " + user;
    header.appendChild(welcomemsg);
}

// If the page is the Catalog
else if (document.title === "The Fictional Library | Catalog") {
    const book_grid = document.querySelector(".book-grid");
    const links = book_grid.querySelectorAll("a");

    // Add click listener to every book link
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the clicked book container
            const bookdiv = link.closest(".book");

            // Extract and store book info in localStorage
            const title = bookdiv.querySelector(".title").textContent.replace("Title: ", "");
            localStorage.setItem("title", JSON.stringify(title));

            const author = bookdiv.querySelector(".author").textContent.replace("Author: ", "");
            localStorage.setItem("author", JSON.stringify(author));

            const genre = bookdiv.querySelector(".genre").textContent.replace("Genre: ", "");
            localStorage.setItem("genre", JSON.stringify(genre));

            const image = bookdiv.querySelector("img");
            localStorage.setItem("image", JSON.stringify(image.src));

            // Redirect to purchase page
            window.location.href = "Purchase.html";
        });
    });
}

// If the page is the Purchase page
else if (document.title === "The Fictional Library | Purchase") {
    // Get book details from localStorage
    const title = JSON.parse(localStorage.getItem("title")) || "Unknown";
    const author = JSON.parse(localStorage.getItem("author")) || "Unknown";
    const genre = JSON.parse(localStorage.getItem("genre")) || "Unknown";
    const img_link = JSON.parse(localStorage.getItem("image")) || "";

    // Update purchase page with book info
    const bookdiv = document.querySelector(".book");
    const image = bookdiv.querySelector("img");
    image.src = img_link;

    bookdiv.querySelector(".title").textContent = "Title: " + title;
    bookdiv.querySelector(".author").textContent = "Author: " + author;
    bookdiv.querySelector(".genre").textContent = "Genre: " + genre;

    const form = document.getElementById("purchaseform");
    const name = document.getElementById("name");

    // Handle purchase form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent refresh

        const user = name.value.trim(); // Get buyer name
        if (user === "") return alert("Please enter your name.");

        // Save buyer name
        localStorage.setItem("name", JSON.stringify(user));

        // Go to confirmation page
        window.location.href = "Confirmation.html";
    });
}

// If the page is the Confirmation page
else if (document.title === "The Fictional Library | Confirmation") {
    // Retrieve user and title info from localStorage
    const name = JSON.parse(localStorage.getItem("name")) || "Guest";
    const title = JSON.parse(localStorage.getItem("title")) || "Unknown";

    // Display confirmation messages
    document.getElementById("thanks").textContent = `Thank you ${name} for your purchase!`;
    document.getElementById("confirm").textContent = `Your order for "${title}" has been successfully placed.`;

}
