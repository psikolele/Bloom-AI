# Deploy Bloom AI to GitHub

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed." -ForegroundColor Red
    exit 1
}

# Check if gh CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "Error: GitHub CLI (gh) is not installed. Please install it or use manual git commands." -ForegroundColor Red
    Write-Host "Manual steps if no gh CLI:"
    Write-Host "1. git init"
    Write-Host "2. git add ."
    Write-Host "3. git commit -m 'Initial commit'"
    Write-Host "4. Create repo on GitHub website"
    Write-Host "5. git remote add origin <url>"
    Write-Host "6. git push -u origin main"
    exit 1
}

Write-Host "Initializing Git Repository..." -ForegroundColor Green
git init

Write-Host "Adding files..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit - Bloom AI Hub"

Write-Host "Creating GitHub repository 'Bloom-AI'..." -ForegroundColor Green
# Attempt to create public repo and push
# --source=. uses current directory
# --remote=origin sets the remote
# --push pushes the commits
gh repo create Bloom-AI --public --source=. --remote=origin --push

if ($?) {
    Write-Host "Successfully deployed to GitHub!" -ForegroundColor Green
    Start-Process "https://github.com/$(gh api user -q .login)/Bloom-AI"
} else {
    Write-Host "Deployment failed. Check if repo already exists or authentication issues." -ForegroundColor Red
}

Read-Host -Prompt "Press Enter to exit"
