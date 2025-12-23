# Automated Deployment Guide with Firebase App Hosting

This guide shows you how to **automatically** deploy your Next.js application using **Firebase App Hosting**. After completing these steps, every time you `push` your code to GitHub, your application will be automatically updated and published on the internet.

**Prerequisites:**
1.  **Google Account:** You need one to use Firebase.
2.  **Project on GitHub:** Your code must be published in a GitHub repository according to the `GITHUB-DEPLOYMENT-GUIDE.md`.

---

### Step 1: Create a Project in the Firebase Console

1.  Go to the **[Firebase Console](https://console.firebase.google.com/)** and sign in with your Google account.
2.  Click on `Add project`.
3.  Choose a name for your project (e.g., `linguaweave-afarinesh`).
4.  Follow the steps and accept the default options. Wait for your project to be created.

---

### Step 2: Enable and Configure App Hosting

1.  After the project is created, go to the `Build` section in the left menu and click on `App Hosting`.
2.  Click the `Get started` button.

3.  **Connect to GitHub:**
    *   A page to connect to GitHub will open. Click the `Connect to GitHub` button.
    *   A pop-up window will open, asking for permission to access your GitHub account. Authorize Firebase.
    *   You will then be asked to install the Firebase app on your repositories. You can choose to grant access only to the `linguaweave-afarinesh` repository.

4.  **Configure deployment:**
    *   After a successful connection, a list of your repositories will be displayed. Select the project repository (`linguaweave-afarinesh`).
    *   Firebase will ask for the **main branch** name. Enter `main`.
    *   It will also ask for the **Root directory**. Leave this field **blank**.
    *   Click the `Finish and deploy` button.

---

### Step 3: First Automatic Deployment

Now, the real magic happens!

*   Firebase will automatically start building and deploying your application from the `main` branch of your GitHub. This process may take a few minutes.
*   Once complete, Firebase will give you a dedicated **URL** (something like `your-app-name.web.app`). Your "Afarinesh" application is now live at this address and accessible to the entire world!

**Congratulations!** From now on, any changes you make to your code and `push` to the `main` branch on GitHub will be automatically detected by Firebase, and the new version will be deployed for you. You no longer need to do any technical work and can focus all your energy on creating.
