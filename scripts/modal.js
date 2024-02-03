async function addModalImg(){
    const modal = document.getElementById('navModal');

    // add background color filter to modal
    let filter = document.createElement("div");
    filter.classList.add("colorFilter", "transparentGreen");
    filter.style.zIndex = "2";
    modal.appendChild(filter);

    // add background image to modal
    let img = document.createElement("img");
    img.src = "/images/Baker_DSub2D.jpeg";
    img.style.zIndex = "99";
    await loadModalImage(img);
    modal.appendChild(img);
}

addModalImg();

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