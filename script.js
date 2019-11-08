
// This is the way we link to pages based on a dice roll
document.querySelectorAll('.random_link').forEach(function(random_link) {
    // Now do something with my button
    random_link.addEventListener("click", function(){
        let data = Object.assign({}, random_link.dataset);
        // We get the number of links and roll a dice of that many sides
        let number_of_links = Object.keys(data).length;
        let dice_roll = Math.floor(Math.random() * Math.floor(number_of_links));

        // we send the window to the rolled link
        window.location.href = Object.values(data)[dice_roll]
    })
});

