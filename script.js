if (document.title === "The Fictional Library | Sign-in") {
    localStorage.setItem("username", JSON.stringify("Guest"));
    const form = document.getElementById("signin");
    const username = document.getElementById("username");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const user = username.value.trim();
        localStorage.setItem("username", JSON.stringify(user));
        window.location.href = "Homepage.html";
    });
}

else if (document.title === "The Fictional Library | Home") {
    const user = JSON.parse(localStorage.getItem("username")) || "Guest";
    const header = document.getElementById("welcome");
    const welcomemsg = document.createElement("h2");
    welcomemsg.textContent = "Welcome " + user;
    header.appendChild(welcomemsg);
}

else if (document.title === "The Fictional Library | Catalog") {
    const book_grid = document.querySelector(".book-grid");
    const links = book_grid.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            event.preventDefault();
            //get the book div
            const bookdiv = link.closest(".book");

            //get and save title in form "Title: ____"
            const title = bookdiv.querySelector(".title").textContent;
            localStorage.setItem("title",JSON.stringify(title));

            //get and save author
            const author = bookdiv.querySelector(".author").textContent;
            localStorage.setItem("author",JSON.stringify(author));

            //get and save genre
            const genre = bookdiv.querySelector(".genre").textContent;
            localStorage.setItem("genre",JSON.stringify(genre));

            //get and save image link
            const image = bookdiv.querySelector("img");
            localStorage.setItem("image",JSON.stringify(image.src));
            
            window.location.href = "Purchase.html";
        })
    })

}

else if (document.title === "The Fictional Library | Purchase") {
    const title = JSON.parse(localStorage.getItem("title")) || "Title: Unknown";
    const author = JSON.parse(localStorage.getItem("author")) || "Author: Unknown";
    const genre = JSON.parse(localStorage.getItem("genre")) || "Genre: Unknown";
    const img_link = JSON.parse(localStorage.getItem("image")) || "";

    console.log(author,title,genre);

    const bookdiv = document.querySelector(".book");
    const image = bookdiv.querySelector("img");
    image.src = img_link;

    const title_html = bookdiv.querySelector(".title");
    title_html.textContent = title;

    const author_html = bookdiv.querySelector(".author");
    author_html.textContent = author;

    const genre_html = bookdiv.querySelector(".genre");
    genre_html.textContent = genre;

    const form = document.getElementById("purchaseform");
    const name = document.getElementById("name");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const user = name.value.trim();
        console.log(name.value);
        localStorage.setItem("name", JSON.stringify(user));
        window.location.href = "Confirmation.html";
    });

}

else if (document.title === "The Fictional Library | Confirmation") {
    const name = JSON.parse(localStorage.getItem("name")) || "Guest";
    const title = JSON.parse(localStorage.getItem("title")) || "Title: Unknown";

    document.getElementById("thanks").textContent = `Thank you ${name} for your purchase!`;
    document.getElementById("confirm").textContent = `Your order for "${title}" has been successfully placed.`;

}