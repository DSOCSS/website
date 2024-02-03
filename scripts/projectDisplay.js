const gridContainer = document.getElementById("projectContainer");

import { projectData } from '../data/projects.js';

for (let i = 0; i < projectData.length; i++) {
    const Project = projectData[i];

    const ProjectDiv = document.createElement("div");
    ProjectDiv.classList.add("gridItem");

    // Title of the project
    let header = document.createElement("h1");
    header.innerHTML = Project.name;
    ProjectDiv.appendChild(header);

    // Project Image
    if (Project.image != undefined) {
        let img = document.createElement("img");
        img.src = Project.image;
        img.classList.add("projectImage");
        await loadImage(img); // wait for the image to load
        ProjectDiv.appendChild(img);
    }

    if (Project.description != undefined) {
        let description = document.createElement("p");
        description.innerHTML = Project.description;
        ProjectDiv.appendChild(description);
    }

    if (Project.year != undefined) {
        let year = document.createElement("div");
        year.innerHTML = Project.year;
        year.classList.add("projectYear");
        // change background based on season/term
        year.style.backgroundColor = seasonColor(Project.year);
        ProjectDiv.appendChild(year);
    }

    if (Project.team != undefined) {
        let listDescription = document.createElement("p");
        listDescription.innerHTML = "Team";
        listDescription.style.textAlign = "left";
        listDescription.style.fontWeight = "bold";
        ProjectDiv.appendChild(listDescription);

        let list = document.createElement("ul");
        for (let i = 0; i < Project.team.length; i++) {
            let member = document.createElement("li");
            member.innerHTML = Project.team[i];
            list.appendChild(member);
        }
        ProjectDiv.appendChild(list);
    }

    // Link to the project
    if (Project.link != undefined) {
        let link = document.createElement("a");
        link.href = Project.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        // target="_blank" rel="noopener noreferrer"
        let button = document.createElement("button");
        button.innerHTML = "View";
        link.appendChild(button); //insert the button in the link
        ProjectDiv.appendChild(link);
    }

    gridContainer.appendChild(ProjectDiv); //add the project to the grid
}

/**
 * Return a color associated with a season
 */
function seasonColor(term) {
    if (term.indexOf("Winter") >= 0) {
        return "Aqua";
    } else if (term.indexOf("Spring") >= 0) {
        return "Lime";
    } else if (term.indexOf("Summer") >= 0) {
        return "Yellow";
    } else if (term.indexOf("Fall") >= 0) {
        return "Orange";
    } else {
        return "Aqua";
    }
}


// wait for an image to load
async function loadImage(img) {
    return new Promise((resolve) => {
        img.onload = () => resolve();
    });
}