# GitHub Actions Setup Guide

This guide will walk you through setting up the complete GitHub Actions automation system for the Heavens Above project.

## 📋 Prerequisites

Before starting, ensure you have:

- [ ] A GitHub account
- [ ] A Heroku account (for deployment)
- [ ] Docker installed (for local testing with `act`)
- [ ] Node.js 16+ installed locally
- [ ] Git configured on your system

## 🚀 Step-by-Step Setup

### 1. Fork and Clone the Repository

1. **Fork the repository**:
   - Go to https://github.com/stevenjoezhang/heavens-above
   - Click the "Fork" button in the top-right corner
   - Choose your GitHub account as the destination

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/heavens-above.git
   cd heavens-above
   ```

### 2. Install Local Testing Tools

#### Install `act` for Local Testing
```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Windows (with Chocolatey)
choco install act-cli
```

#### Verify Docker is Running
```bash
docker --version
# Should show Docker version info
```

### 3. Heroku Setup

#### Create Heroku Account
1. Go to https://heroku.com
2. Sign up for a free account
3. Verify your email address

#### Create Heroku Apps
```bash
# Install Heroku CLI
# macOS
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create staging app
heroku create your-app-name-staging

# Create production app
heroku create your-app-name-production

# Get your Heroku API key
heroku auth:token
```

#### Configure Heroku Apps
1. **Set up environment variables**:
   ```bash
   # For staging app
   heroku config:set NODE_ENV=staging --app your-app-name-staging
   
   # For production app
   heroku config:set NODE_ENV=production --app your-app-name-production
   ```

2. **Configure buildpacks**:
   ```bash
   # Add Node.js buildpack
   heroku buildpacks:set heroku/nodejs --app your-app-name-staging
   heroku buildpacks:set heroku/nodejs --app your-app-name-production
   ```

### 4. GitHub Secrets Configuration

Navigate to your repository: `Settings > Secrets and variables > Actions`

#### Add Required Secrets

1. **HEROKU_API_KEY**
   - Value: Your Heroku API key (from `heroku auth:token`)

2. **HEROKU_STAGING_APP_NAME**
   - Value: Your staging app name (e.g., `your-app-name-staging`)

3. **HEROKU_PRODUCTION_APP_NAME**
   - Value: Your production app name (e.g., `your-app-name-production`)

4. **HEROKU_EMAIL**
   - Value: Your Heroku account email

5. **STAGING_URL**
   - Value: `https://your-app-name-staging.herokuapp.com`

6. **PRODUCTION_URL**
   - Value: `https://your-app-name-production.herokuapp.com`

#### Optional Secrets

7. **SLACK_WEBHOOK** (Optional)
   - Create a Slack app and get webhook URL for notifications

8. **AWS_ACCESS_KEY_ID** (Optional)
   - For backup functionality

9. **AWS_SECRET_ACCESS_KEY** (Optional)
   - For backup functionality

10. **BACKUP_BUCKET** (Optional)
    - S3 bucket name for backups

### 5. GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository `Settings > Pages`
   - Source: "GitHub Actions"
   - Save the settings

2. **Configure Pages Environment**:
   - The documentation workflow will automatically create the `github-pages` environment

### 6. Branch Protection Rules

1. **Go to Settings > Branches**:
   - Click "Add rule" for the `main` branch

2. **Configure Protection**:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require pull request reviews before merging
   - ✅ Restrict pushes that create files larger than 100MB

3. **Required Status Checks**:
   - `test` (from CI workflow)
   - `build` (from CI workflow)

### 7. Local Testing

#### Test Individual Workflows
```bash
# Test CI workflow
act push

# Test PR workflow
act pull_request

# Test scheduled tasks
act schedule

# Test specific workflow
act -W .github/workflows/ci.yml push
```

#### Test with Specific Event
```bash
# Test with specific branch
act push -e .github/pre-push-event.json

# Test with environment variables
act push --env-file .env
```

### 8. Push Workflows to GitHub

```bash
# Add all workflow files
git add .github/
git add package.json
git add scripts/
git add docs/

# Commit changes
git commit -m "feat: add comprehensive GitHub Actions workflows

- Add CI/CD pipeline with testing and deployment
- Add scheduled tasks for maintenance
- Add code review automation
- Add documentation deployment
- Add release notes automation
- Add dependency update automation via Dependabot"

# Push to GitHub
git push origin main
```

### 9. Verify Setup

#### Check Workflows are Running
1. Go to your repository's "Actions" tab
2. You should see the CI workflow running
3. Wait for it to complete successfully

#### Test Deployment
1. The deployment workflow should run after CI passes
2. Check your Heroku apps for successful deployment
3. Verify the applications are accessible

#### Test Scheduled Tasks
1. Go to Actions tab
2. Find the "Scheduled Tasks" workflow
3. Click "Run workflow" to test manually

#### Test Documentation
1. The documentation workflow should run automatically
2. Check GitHub Pages settings for deployment
3. Visit your documentation site

## 🔧 Customization

### Modify Workflow Triggers
Edit the workflow files to change when they run:

```yaml
# Example: Change CI to run on all branches
on:
  push:
    branches: ['*']  # All branches
  pull_request:
    branches: ['*']  # All branches
```

### Add Custom Scripts
Add your own scripts to the `scripts/` directory and reference them in `package.json`:

```json
{
  "scripts": {
    "custom-task": "node scripts/custom-task.js"
  }
}
```

### Configure Dependabot
Edit `.github/dependabot.yml` to customize dependency update behavior:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"  # Change from weekly to daily
```

## 🚨 Troubleshooting

### Common Issues

#### Workflows Not Running
1. Check if workflows are in the correct directory (`.github/workflows/`)
2. Verify YAML syntax is correct
3. Ensure the repository has Actions enabled

#### Deployment Failures
1. Verify Heroku credentials are correct
2. Check Heroku app names match the secrets
3. Ensure Heroku apps are properly configured

#### Local Testing Issues
1. Make sure Docker is running
2. Check `act` installation
3. Verify workflow files are in the correct location

#### Permission Errors
1. Check repository permissions
2. Verify GitHub secrets are properly configured
3. Ensure branch protection rules aren't blocking workflows

### Getting Help

1. **Check Workflow Logs**: Go to Actions tab and click on failed workflows
2. **Review Error Messages**: Look for specific error messages in logs
3. **GitHub Actions Documentation**: https://docs.github.com/en/actions
4. **Heroku Documentation**: https://devcenter.heroku.com/
5. **Community Support**: GitHub Discussions, Stack Overflow

## 📊 Monitoring and Maintenance

### Regular Tasks

#### Weekly
- [ ] Review and merge dependency update PRs
- [ ] Check workflow success rates
- [ ] Review scheduled task logs

#### Monthly
- [ ] Update workflow actions to latest versions
- [ ] Review and rotate secrets if needed
- [ ] Check Heroku app usage and limits

#### Quarterly
- [ ] Review and update Node.js versions
- [ ] Audit security configurations
- [ ] Update documentation

### Monitoring Dashboard
Create a simple monitoring setup:

1. **GitHub Actions**: Monitor workflow success rates
2. **Heroku**: Monitor app performance and errors
3. **Dependabot**: Review security and dependency updates
4. **GitHub Pages**: Check documentation deployment status

## 🎉 Success Criteria

Your setup is complete when:

- [ ] All workflows run successfully on push/PR
- [ ] Deployment to Heroku works correctly
- [ ] Scheduled tasks run as expected
- [ ] Documentation is deployed to GitHub Pages
- [ ] Dependabot creates dependency update PRs
- [ ] Code review checks work on pull requests
- [ ] Release notes are generated for version tags

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Act Tool Documentation](https://github.com/nektos/act)

---

*Last updated: ${new Date().toISOString()}*
