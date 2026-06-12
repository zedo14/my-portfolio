// CHANGE THIS TO YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'zedo14';  // ← CHANGE THIS LINE

// Fetch data from GitHub API
async function fetchGitHubData() {
    try {
        // Fetch profile data
        const profileResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!profileResponse.ok) {
            throw new Error(`User '${GITHUB_USERNAME}' not found`);
        }
        
        const profile = await profileResponse.json();
        
        // Fetch repositories (sorted by stars)
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6&direction=desc`
        );
        const repos = await reposResponse.json();
        
        // Display the data
        displayProfile(profile);
        displayRepos(repos);
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    }
}

// Display profile information
function displayProfile(profile) {
    const profileHTML = `
        <img src="${profile.avatar_url}" alt="${profile.login}">
        <h3>${profile.name || profile.login}</h3>
        <p>${profile.bio || 'No bio available'}</p>
        <p>📍 ${profile.location || 'Location not specified'}</p>
        <div class="repo-stats" style="justify-content: center;">
            <span>📦 ${profile.public_repos} Repositories</span>
            <span>👥 ${profile.followers} Followers</span>
            <span>🎯 ${profile.following} Following</span>
        </div>
        <a href="${profile.html_url}" target="_blank" class="github-link">
            View GitHub Profile →
        </a>
    `;
    
    document.getElementById('github-profile').innerHTML = profileHTML;
}

// Display repositories
function displayRepos(repos) {
    if (!repos.length) {
        document.getElementById('github-repos').innerHTML = 
            '<div class="error">No public repositories found</div>';
        return;
    }
    
    const reposHTML = repos.map(repo => `
        <div class="repo-card">
            <h3>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>🔄 ${repo.language || 'N/A'}</span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('github-repos').innerHTML = reposHTML;
}

// Show error message
function showError(message) {
    const errorHTML = `
        <div class="error">
            <strong>⚠️ Error Loading GitHub Data</strong><br>
            ${message}<br><br>
            <small>Make sure you changed 'GITHUB_USERNAME' to your actual GitHub username in script.js</small>
        </div>
    `;
    document.getElementById('github-profile').innerHTML = errorHTML;
    document.getElementById('github-repos').innerHTML = '';
}

// Load everything when page loads
fetchGitHubData();