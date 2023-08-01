/* ======================================================
   JavaScript Code Produced by Tom Gray / TG Productions
   Contact: tomg@courvix.com | Discord: tom_robinson
   All rights reserved. Do not copy or distribute without permission.
   Unauthorized use may be subject to DMCA takedown.
======================================================= */


// Define a variable to store the timer for the delay
let timer;

// Attach the input event listener to the username input field
document.getElementById("username").addEventListener("input", function() {
  // Clear the previous timer (if any) to avoid multiple requests
  clearTimeout(timer);

  // Set a new timer to update the profile picture immediately after a 500ms delay
  timer = setTimeout(updateProfilePicture, 500);
});

function updateProfilePicture() {
  const username = document.getElementById("username").value;
  const userAvatar = document.getElementById("user-avatar");

  const userId = profilePics[username];

  if (!userId) {
    userAvatar.style.backgroundImage = "";
    userAvatar.setAttribute("data-username", username[0].toUpperCase());
    return;
  }

  // Fetch the user's avatar using the Flask server
  fetch(`https://avatar.antiblind.click/avatar/${userId}`)
    .then(response => response.json())
    .then(data => {
      const avatarUrl = data.avatar_url;
      if (avatarUrl) {
        userAvatar.style.backgroundImage = `url(${avatarUrl})`;
        userAvatar.style.backgroundSize = "cover";
      } else {
        userAvatar.style.backgroundImage = "";
        userAvatar.setAttribute("data-username", username[0].toUpperCase());
      }
    })
    .catch(error => {
      console.error("Error occurred while fetching avatar:", error);
      userAvatar.style.backgroundImage = "";
      userAvatar.setAttribute("data-username", username[0].toUpperCase());
    });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Invalid request. Both username and password are required.");
    return;
  }

  // Prepare the request payload
  const data = {
    username: username,
    password: password
  };

  fetch("https://login.antiblind.click/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Login successful!") {
        alert("Login successful!");
      } else {
        alert("Invalid username or password. Please try again.");
      }
      // Update the profile picture immediately after fetching data
      updateProfilePicture();
    })
    .catch(error => {
      alert("Error occurred while processing the request.");
      console.error(error);
    });
}
