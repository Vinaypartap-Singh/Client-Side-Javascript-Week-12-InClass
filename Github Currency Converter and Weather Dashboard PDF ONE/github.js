async function getGitHubProfile(username) {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();
    displayProfile(userData, reposData);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("profile").innerHTML = `<h3>${error.message}</h3>`;
  }
}

function displayProfile(user, repos) {
  const profileDiv = document.getElementById("profile");
  profileDiv.innerHTML = `
      <h2>${user.name || user.login}</h2>
      <img src="${user.avatar_url}" alt="${
    user.login
  }" style="width: 100px; border-radius: 50%;">
      <p>${user.bio || "No bio available"}</p>
      <p>Followers: ${user.followers} | Following: ${user.following}</p>
      <p>Public Repos: ${user.public_repos}</p>
      <h3>Recent Repositories:</h3>
      <ul>
        ${repos
          .map(
            (repo) =>
              `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
          )
          .join("")}
      </ul>
    `;
}

document.getElementById("githubForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (username) {
    getGitHubProfile(username);
  }
});
