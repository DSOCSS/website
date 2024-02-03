let pages = {
    "Home": "/",
    "Team": "/team.html",
    "Projects": "/projects.html",
    // "Puzzles": "/puzzles.html",
}

async function addModalImg() {
    const modal = document.getElementById('navModal');

    // add background color filter to modal
    let filter = document.createElement("div");
    filter.classList.add("colorFilter", "transparentGreen");
    filter.style.zIndex = "2";
    modal.appendChild(filter);

    // add background image to modal
    let img = document.createElement("img");

    let html_filename = window.location.href.slice(window.location.href.lastIndexOf('/') + 1).trim();
    if (html_filename == "index.html" || html_filename == "") {
        img.src = "./images/Baker_DSub2D.jpeg" // this is a page at the root
    } else {
        img.src = "../images/Baker_DSub2D.jpeg";
    }
    img.style.zIndex = "99";
    await loadModalImage(img);
    modal.appendChild(img);
}

addModalImg();
console.log(getFileLevel());
createLinks();

function createLinks() {
    let keys = Object.keys(pages);

    const navbar = document.getElementById("inlineLinks");
    const modal = document.getElementById("modalLinks");

    for (let i = 0; i < keys.length; i++) {
        let title = keys[i];
        let link = pages[keys[i]];
        if (getFileLevel() == 0 && title != "Home") {
            link = "./pages" + link; // move down into pages directory
        } else if (getFileLevel() == 1 && title == "Home") {
            link = ".." + link; // move up to root directory
        } else {
            link = "." + link; // same directory
        }
        console.log(title, link)

        // Add link to navbar
        let a = document.createElement("a");
        a.href = link;
        a.innerHTML = `<h1>${title}</h1>`
        // We don't need a home link since the club logo is already a link
        if (title != "Home") {
            navbar.appendChild(a);
        }
        // Add link to modal (deep clone)
        let a2 = a.cloneNode(true);
        modal.appendChild(a2);
    }
}

function getFileLevel() {
    let html_filename = window.location.href.slice(window.location.href.lastIndexOf('/') + 1).trim();
    if (html_filename == "index.html" || html_filename == "") {
        return 0; // at root
    } else {
        return 1; // not at root
    }
}

function showModal() {
    // display modal
    const modal = document.getElementById('navModal');
    modal.style.display = "block";

    // add fadeIn class to links
    document.getElementById('modalLinks').style.zIndex = '99';
    let links = document.getElementById('modalLinks').getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].classList.add("fadeIn");
        links[i].style.zIndex = 500;
        links[i].onclick = hideModal; // hide modal if link is clicked
    }
}



function hideModal() {
    // hide modal
    document.getElementById('navModal').style.display = "none";

    // remove fadeIn class from links
    let links = document.getElementById('modalLinks').getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("fadeIn");
    }
}

// wait for an image to load
async function loadModalImage(img) {
    return new Promise((resolve) => {
        img.onload = () => resolve();
    });
}