document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Form Submitted");
    const fullname = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('dob').value;

    if (!fullname || !password) {
        alert("You need a name and password");
        return;
    }

    if (password.length !== 8) {
        alert("Password must be exactly 8 characters long");
        return;
    }

    console.log(fullname);
    console.log(password);
    console.log(date);

    const formData = {
        name: fullname,
        password: password,
        date: date,
    };

    console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('message').innerHTML = response.message;
            document.getElementById('myForm').innerHTML = "";
            alert('Form submitted successfully.');
        } else if (xhr.readyState === 4) {
            alert('Error submitting form.');
        }
    };

    xhr.send(JSON.stringify(formData));
});
