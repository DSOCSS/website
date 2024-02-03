const teamContainer = document.getElementById("teamContainer");

import { teamData } from '../data/members.js';

// Sort alphabetically by last name
teamData.sort((a, b) => {
    if (a.name == undefined || b.name == undefined) {
        console.error("Error: A team member's name is missing");
        return 1;
    }
    if (getLastName(a.name) > getLastName(b.name)) {
        return 1;
    }
    return -1;
});

// Sort by gravity (lower numbers appear first)
teamData.sort((a, b) => {
    if (a.gravity == undefined || b.gravity == undefined) {
        console.error("Error: A team member's gravity is missing");
        return 1;
    }
    if (a.gravity > b.gravity) {
        return 1;
    } else if (b.gravity > a.gravity) {
        return -1;
    } else {
        return 0;
    }
});

for (let i = 0; i < teamData.length; i++) {
    const Member = teamData[i];

    const MemberDiv = document.createElement("div");
    MemberDiv.classList.add("gridItem");
    MemberDiv.style.border = "none";

    // Member Image
    if (Member.image != undefined && Member.image != "") {
        let img = document.createElement("img");
        img.src = Member.image;
        img.classList.add("teamMemberImage");
        img.style.borderRadius = "50%";
        await loadImage(img); // wait for the image to load
        MemberDiv.appendChild(img);
    }

    // Member Name, classyear & Website Link
    if (Member.name != undefined) {
        let link = document.createElement("a");
        if (Member.website != undefined && Member.website != "") {
            link.href = Member.website; // set link to member's website
        }
        let header = document.createElement("h1");
        header.innerHTML = Member.name;
        if (Member.year != undefined) {
            header.innerHTML += ` '${abbrYr(Member.year)}`;
        }
        link.appendChild(header);
        MemberDiv.appendChild(link);
    }

    // Member's role
    if (Member.role != undefined) {
        let role = document.createElement("p");
        role.innerHTML = Member.role;
        MemberDiv.appendChild(role);
    }

    if (Member.group == undefined){
    teamContainer.appendChild(MemberDiv); //add the person to team grid
    } else {
        // add person to a different grid
        document.getElementById(Member.group).appendChild(MemberDiv)
    }
}
console.log("done!");

// wait for an image to load
async function loadImage(img) {
    return new Promise((resolve) => {
        img.onload = () => resolve();
    });
}

function abbrYr(year) {
    return year % 100;
}

function getLastName(name) {
    let names = name.split(" ");
    return names[names.length - 1];
}