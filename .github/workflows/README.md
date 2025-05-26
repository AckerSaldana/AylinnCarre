# GitHub Actions Deployment Setup

This guide explains how to set up the Firebase service account secret required for the deployment workflow.

## Prerequisites

- Firebase project created and configured
- Firebase CLI installed locally
- GitHub repository with admin access

## Steps to Set Up Firebase Service Account

1. **Generate Firebase Service Account Key**
   ```bash
   # Login to Firebase
   firebase login
   
   # Generate service account key
   firebase init hosting:github
   ```
   
   Alternatively, generate manually:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Navigate to Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file securely

2. **Add Service Account to GitHub Secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the entire contents of the service account JSON file
   - Click "Add secret"

3. **Add Environment Variables**
   
   Add the following secrets to your GitHub repository:
   
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   
   These values can be found in your Firebase project settings under "Your apps" > Web app configuration.

## Workflow Triggers

The deployment workflow (`deploy.yml`) automatically runs when:
- Code is pushed to the `main` branch
- A pull request is merged into `main`

## Manual Deployment

To trigger a manual deployment:
1. Go to Actions tab in GitHub
2. Select "Deploy to Firebase Hosting" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Troubleshooting

- **Build fails**: Check that all environment variables are correctly set in GitHub secrets
- **Deploy fails**: Ensure the service account has the necessary permissions (Firebase Hosting Admin)
- **Permission denied**: Verify the service account JSON is correctly formatted and complete