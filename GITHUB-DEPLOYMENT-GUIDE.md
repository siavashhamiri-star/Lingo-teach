# GitHub Deployment Guide

This guide provides an overview of the steps required to publish the source code of this application (Next.js) to GitHub, directly from your development environment.

**Prerequisites:**
1.  **Git Installation:** Ensure `git` is installed on your computer.
2.  **GitHub Account:** You need an account on GitHub.com.
3.  **Terminal or Command Line:** Access to a terminal (on Mac or Linux) or Command Prompt/PowerShell (on Windows).

---

### Step 1: Configure Git

If this is your first time using Git on this system, configure your name and email. This information will be recorded in your commit history.

Run the following commands in the terminal in the project's root folder:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
*   Replace `Your Name` and `your.email@example.com` with your actual name and email.

---

### Step 2: Create a Repository on GitHub

1.  Go to `GitHub.com` in your browser and log in to your account.
2.  Click the `+` icon in the top right corner and select `New repository`.
3.  Choose a name for your repository (e.g., `LinguaWeave-App`).
4.  Set it as `Public` or `Private`.
5.  **Important:** **Do not** check the "Initialize this repository with a README" option.
6.  Click the `Create repository` button.

On the next page, GitHub will show you the repository's URL. It will look something like: `https://github.com/YourUsername/LinguaWeave-App.git`. Copy this address.

---

### Step 3: Connect Your Local Project to GitHub and Publish

Now, return to your terminal. Make sure you are in the project's root folder (`LinguaWeave`).

1.  **Initialize a local Git repository:**
    This command creates a new repository in your current folder.
    ```bash
    git init
    ```

2.  **Add all project files to Git:**
    This command stages all files and changes for commit.
    ```bash
    git add .
    ```

3.  **Create the first commit:**
    A commit is like a snapshot of your project's current state.
    ```bash
    git commit -m "First commit: Initial project setup"
    ```

4.  **Rename the main branch to `main`:**
    This is a new and common standard.
    ```bash
    git branch -M main
    ```

5.  **Connect the local repository to the GitHub repository:**
    Use the URL you copied in the previous step.
    ```bash
    git remote add origin https://github.com/YourUsername/LinguaWeave-App.git
    ```
    *   Replace `YourUsername` and `LinguaWeave-App.git` with your actual values.

6.  **Push the code to GitHub:**
    This command sends your code from your computer to GitHub's servers.
    ```bash
    git push -u origin main
    ```

    *   At this stage, Git may ask for your GitHub username and password (or a Personal Access Token) to verify your identity.

---

**Congratulations!** If all steps were successful, your application's source code is now published on GitHub, and you can view it on your repository page. This power of creation and publication is precisely the spirit governing "Afarinesh".
