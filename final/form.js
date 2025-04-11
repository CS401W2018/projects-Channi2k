document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const agent = document.getElementById("agent").value;
        const rank = document.getElementById("rank").value;
        const comments = document.getElementById("comments").value;

        console.log("Feedback Submitted:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Favorite Agent:", agent);
        console.log("Rank:", rank);
        console.log("Comments:", comments);

        alert("Thank you for your feedback, " + name + "!");
        form.reset();

        const formData = { name, email, agent, rank, comments };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "submit.json", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        document.getElementById('message').innerHTML = response.message || "Feedback received!";
                        document.getElementById('myForm').innerHTML = "";
                    } catch (err) {
                        alert("Form submitted, but response could not be read.");
                    }
                } else {
                    alert('Error submitting form. Status: ' + xhr.status);
                }
            }
        };

        xhr.send(JSON.stringify(formData));
    });
});
