# GitHub Actions Workflows Documentation
## Heavens Above Project - Assignment 2

**Repository**: https://github.com/Salmanahmed1078/heavens-above  
**Main Deployment URL (Vercel)**: https://heavens-above-eta.vercel.app/  
**Documentation URL (GitHub Pages)**: https://Salmanahmed1078.github.io/heavens-above/

---

## Table of Contents

1. [Continuous Integration (CI)](#1-continuous-integration-ci)
2. [Deployment Pipeline (Vercel)](#2-deployment-pipeline-vercel)
3. [Scheduled Tasks](#3-scheduled-tasks)
4. [Dependency Updates (Dependabot)](#4-dependency-updates-dependabot)
5. [Code Review Workflow](#5-code-review-workflow)
6. [Documentation Deployment](#6-documentation-deployment)
7. [Release Notes Workflow](#7-release-notes-workflow)
8. [How to Interpret Results](#how-to-interpret-results)
9. [Test Reports and Artifacts](#test-reports-and-artifacts)

---

## 1. Continuous Integration (CI)

**File**: `.github/workflows/ci.yml`

### Purpose
Runs automated tests, linting, security audits, and basic functionality checks on every push to `main` and on pull requests.

### Triggers
- **Push** to `main` branch
- **Pull requests** targeting `main`

### Configuration
- **Matrix Strategy**: Tests on Node.js versions 18.x and 20.x
- **Runner**: Ubuntu Latest
- **Cache**: npm cache enabled for faster installs

### Steps
1. **Checkout**: Clone repository
2. **Setup Node.js**: Install Node.js (matrix: 18.x, 20.x)
3. **Install dependencies**: Run `npm ci` or `npm install`
4. **Lint (ESLint)**: Check code style and quality
5. **Format check (Prettier)**: Verify code formatting
6. **Security audit (npm)**: Scan for vulnerabilities (high severity and above)
7. **Basic run check**: Verify `run.js` can be loaded
8. **Upload audit report**: Save audit results as artifact

### Artifacts Generated
- `npm-audit-report-18.x` (JSON audit report for Node 18)
- `npm-audit-report-20.x` (JSON audit report for Node 20)

### Success Criteria
- ✅ All matrix jobs pass (green checkmarks)
- ✅ No linting errors
- ✅ No high-severity security vulnerabilities
- ✅ Audit artifacts generated

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/actions
2. Click on the latest CI run
3. Check job status for each Node version
4. Download artifacts from the bottom of the run page

---

## 2. Deployment Pipeline (Vercel)

**File**: `.github/workflows/deploy-vercel.yml`

### Purpose
Automates deployment of the web application to Vercel on every push to `main` branch.

### Triggers
- **Push** to `main` branch
- **Manual dispatch** via Actions UI

### Configuration
- **Target Platform**: Vercel (Production)
- **Node Version**: 20.x
- **Deployment Method**: Vercel CLI

### Required Secrets
- `VERCEL_TOKEN`: Vercel authentication token
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `VERCEL_ORG_ID`: (Optional) Organization ID for team accounts

### Steps
1. **Checkout**: Clone repository
2. **Setup Node.js**: Install Node.js 20
3. **Install dependencies**: Run `npm ci`
4. **Build data**: Execute `run.js` to scrape and populate `public/data/`
5. **Include docs**: Copy `docs/` into `public/docs/`
6. **Verify structure**: List files in `public/` directory
7. **Upload artifacts**: Save scrape logs and data files
8. **Commit data**: Auto-commit scraped data to repository
9. **Install Vercel CLI**: Install Vercel command-line tool
10. **Show files**: Display files to be deployed
11. **Check Vercel secrets**: Validate required secrets exist
12. **Verify Vercel CLI access**: Test authentication
13. **Link Vercel project**: Associate local directory with Vercel project
14. **Vercel deploy**: Deploy to production (`--prod` flag)

### Deployment Output
- **Deployment URL**: Printed in logs (e.g., `https://heavens-above-eta.vercel.app/`)
- **Status**: Success shown as `✅ Deployment successful: <URL>`

### Artifacts Generated
- `scrape-output-<run_number>`: Contains `scrape.log` and all files from `public/data/`

### Success Criteria
- ✅ All steps complete without errors
- ✅ Deployment URL printed in logs
- ✅ Data files successfully scraped
- ✅ Site accessible at Vercel URL with populated data tables

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/deploy-vercel.yml
2. Click on latest run
3. Expand "Vercel deploy (production)" step to see deployment URL
4. Visit the deployment URL to verify site is live
5. Check artifacts for scrape logs

---

## 3. Scheduled Tasks

**File**: `.github/workflows/scheduled-vercel.yml`

### Purpose
Automatically runs the scraper and deploys updated data to Vercel on a daily schedule.

### Triggers
- **Schedule**: Daily at 02:45 Pakistan Time (21:45 UTC) - `cron: '45 21 * * *'`
- **Manual dispatch** via Actions UI

### Configuration
- **Frequency**: Once per day
- **Time Zone**: UTC (converted to 02:45 PKT)

### Steps
1. **Checkout**: Clone repository
2. **Setup Node.js**: Install Node.js 20
3. **Install dependencies**: Run `npm ci`
4. **Run scraper**: Execute `run.js` with detailed logging
5. **Verify structure**: Check `public/data/` directory
6. **Upload artifacts**: Save scrape logs and data
7. **Commit data**: Auto-commit updated data to repository
8. **Install Vercel CLI**: Install Vercel command-line tool
9. **Check Vercel secrets**: Validate secrets
10. **Verify Vercel CLI access**: Test authentication
11. **Link Vercel project**: Associate with Vercel project
12. **Vercel deploy**: Deploy to production

### Artifacts Generated
- `scheduled-scrape-<run_number>`: Contains scrape logs and data files

### Success Criteria
- ✅ Scheduled run executes successfully
- ✅ New data scraped and deployed
- ✅ Repository updated with latest data
- ✅ Vercel site updated with fresh data

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/scheduled-vercel.yml
2. Check for daily runs (marked with clock icon)
3. Verify latest run shows fresh data
4. Check commit history for "Update scraped data from scheduled run"

---

## 4. Dependency Updates (Dependabot)

**File**: `.github/dependabot.yml`

### Purpose
Automatically monitors npm dependencies and creates pull requests when updates are available.

### Configuration
- **Package Ecosystem**: npm
- **Directory**: `/` (root directory)
- **Schedule**: Weekly
- **Pull Request Limit**: Maximum 5 open PRs at a time
- **Commit Message**: Prefixed with "chore" and includes scope

### How It Works
1. Dependabot scans `package.json` and `package-lock.json` weekly
2. Checks for newer versions of dependencies
3. Creates pull requests with version bumps
4. Automatically triggers CI workflow on PRs
5. Maintains maximum of 5 open PRs to avoid spam

### Success Criteria
- ✅ Weekly PRs created for dependency updates
- ✅ PRs include clear description of changes
- ✅ CI runs automatically on Dependabot PRs

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/pulls
2. Filter by "dependabot" author
3. Review PR titles (format: "chore(deps): bump <package> from X to Y")
4. Check CI status on each PR

---

## 5. Code Review Workflow

**File**: `.github/workflows/code-review.yml`

### Purpose
Enhances code review process by automatically running linting, security scans, and code quality checks on pull requests.

### Triggers
- **Pull requests** targeting `main` branch

### Jobs

#### Job 1: Lint and Format
- **Name**: ESLint and Prettier
- **Steps**:
  1. Checkout repository
  2. Setup Node.js 20
  3. Install dependencies
  4. Run ESLint
  5. Check Prettier formatting
- **Output**: Annotations on PR files if issues found

#### Job 2: npm Audit
- **Name**: npm audit (high severity)
- **Steps**:
  1. Checkout repository
  2. Setup Node.js 20
  3. Install dependencies
  4. Run `npm audit --audit-level=high`
  5. Upload audit report as artifact
- **Artifacts**: `pr-npm-audit-report-npm-audit` (JSON report)

#### Job 3: CodeQL Analysis
- **Name**: CodeQL (JavaScript)
- **Steps**:
  1. Checkout repository
  2. Initialize CodeQL for JavaScript
  3. Perform CodeQL analysis
- **Output**: Security alerts in Security tab if vulnerabilities found

### Success Criteria
- ✅ All three jobs pass (green checkmarks)
- ✅ No linting or formatting errors
- ✅ No high-severity vulnerabilities
- ✅ CodeQL analysis completes
- ✅ PR can be merged (if required checks enabled)

### How to View Results
1. Open any pull request
2. Check "Checks" tab for status of all three jobs
3. View annotations on changed files if issues found
4. Download audit artifacts from Actions run
5. Check Security → Code scanning alerts for CodeQL results

---

## 6. Documentation Deployment

**File**: `.github/workflows/documentation.yml`

### Purpose
Automatically builds and deploys project documentation to GitHub Pages whenever documentation files change.

### Triggers
- **Push** with changes to `docs/**` directory
- **Manual dispatch** via Actions UI

### Configuration
- **Target Platform**: GitHub Pages
- **Build Method**: Automatic (Jekyll if configured, otherwise raw files)
- **Output Directory**: `docs-output/`

### Steps
1. **Checkout**: Clone repository
2. **Configure Pages**: Setup GitHub Pages environment
3. **Build docs**: 
   - If Jekyll config exists: Build with Jekyll
   - Otherwise: Copy raw files and convert markdown to HTML
   - Create `index.html` with file listing
   - Convert `README.md` to `README.html`
4. **Upload Pages artifact**: Prepare files for deployment
5. **Deploy to GitHub Pages**: Publish to `github-pages` environment

### Generated Files
- `index.html`: Main documentation page with file listing
- `README.html`: Converted from `README.md`
- Any other HTML files from markdown conversion

### Success Criteria
- ✅ Build completes successfully
- ✅ `index.html` created with proper links
- ✅ Markdown files converted to HTML
- ✅ Deployment completes
- ✅ Documentation accessible at GitHub Pages URL

### Documentation URL
**https://Salmanahmed1078.github.io/heavens-above/**

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/documentation.yml
2. Check latest run status
3. Visit Environments → `github-pages` for deployment URL
4. Visit documentation URL to verify it's live

---

## 7. Release Notes Workflow

**File**: `.github/workflows/release-notes.yml`

### Purpose
Automatically generates and publishes release notes when version tags are pushed, and optionally uploads data artifacts to releases.

### Triggers
- **Push** of tags matching pattern `v*.*.*` (e.g., `v1.0.0`)
- **Manual dispatch** via Actions UI

### Configuration
- **Release Drafter Config**: `.github/release-drafter.yml`
- **Categories**: Features, Fixes, Maintenance

### Steps
1. **Checkout**: Clone repository
2. **Setup Node.js**: Install Node.js 20
3. **Install dependencies**: Run `npm ci`
4. **Build data**: Execute `run.js` (optional, for artifacts)
5. **Release Drafter**: Generate release notes from merged PRs
6. **Install GitHub CLI**: Install `gh` command-line tool
7. **Upload data artifacts**: Attach `public/data/*` files to release (if tag triggered)

### Release Notes Format
- Categorized by type (Features, Fixes, Maintenance)
- Lists contributors
- Auto-generated from pull request titles and labels

### Success Criteria
- ✅ Release created on GitHub
- ✅ Release notes populated with categorized changes
- ✅ Data artifacts attached (if applicable)

### How to View Results
1. Go to: https://github.com/Salmanahmed1078/heavens-above/releases
2. View latest release
3. Check release notes for categorized changes
4. Download attached artifacts if any

---

## How to Interpret Results

### Understanding Workflow Status Icons

- ✅ **Green Checkmark**: Workflow/job completed successfully
- ❌ **Red X**: Workflow/job failed
- ⏸️ **Yellow Circle**: Workflow/job in progress
- ⏸️ **Gray Circle**: Workflow/job cancelled or skipped

### Common Issues and Solutions

#### CI Failures
- **Linting errors**: Fix code style issues shown in logs
- **Security vulnerabilities**: Review `npm audit` output, update dependencies
- **Missing dependencies**: Check `package.json` and install missing packages

#### Deployment Failures
- **Missing secrets**: Add `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` in repository settings
- **Authentication errors**: Verify token is valid and has correct permissions
- **Build errors**: Check logs in "Build data" step for scraper issues

#### Documentation Failures
- **GitHub Pages not enabled**: Enable in Settings → Pages → Source: GitHub Actions
- **Missing index.html**: Workflow should create it automatically; check build logs
- **404 errors**: Ensure workflow completed successfully and GitHub Pages is configured

---

## Test Reports and Artifacts

### Where to Find Artifacts

1. **CI Workflow Artifacts**:
   - Location: Actions → CI → Latest run → Artifacts section
   - Files: `npm-audit-report-18.x`, `npm-audit-report-20.x`
   - Contains: JSON format security audit reports

2. **Deployment Artifacts**:
   - Location: Actions → Deploy to Vercel → Latest run → Artifacts
   - Files: `scrape-output-<run_number>`
   - Contains: `scrape.log`, all files from `public/data/`

3. **Scheduled Task Artifacts**:
   - Location: Actions → Scheduled Daily Scrape → Latest run → Artifacts
   - Files: `scheduled-scrape-<run_number>`
   - Contains: Scrape logs and data files

4. **Code Review Artifacts**:
   - Location: Pull Request → Checks → npm audit job → Artifacts
   - Files: `pr-npm-audit-report-<job_name>`
   - Contains: Security audit report for PR

### How to Download Artifacts

1. Navigate to the workflow run page
2. Scroll to bottom to "Artifacts" section
3. Click on artifact name
4. Click "Download" button
5. Extract ZIP file to view contents

### Test Reports Summary

For assignment submission, collect:

1. **CI Test Reports**:
   - Screenshot of successful CI run showing both Node versions passing
   - Downloaded audit reports (JSON files)

2. **Deployment Logs**:
   - Screenshot of successful Vercel deployment
   - Deployment URL visible in logs
   - Screenshot of live site showing data tables

3. **Code Review Reports**:
   - Screenshot of PR with all checks passing
   - CodeQL results (if any alerts found)
   - Audit report from PR check

4. **Documentation Deployment**:
   - Screenshot of successful documentation workflow
   - Screenshot of live GitHub Pages documentation site

5. **Scheduled Task Evidence**:
   - Screenshot of scheduled workflow runs
   - Evidence of automatic daily runs
   - Commit history showing auto-committed data

---

## Workflow Files Summary

All workflow files are located in `.github/workflows/`:

1. ✅ `ci.yml` - Continuous Integration
2. ✅ `deploy-vercel.yml` - Vercel Deployment Pipeline
3. ✅ `scheduled-vercel.yml` - Scheduled Daily Scrape and Deploy
4. ✅ `code-review.yml` - Code Review Checks
5. ✅ `documentation.yml` - Documentation Deployment to GitHub Pages
6. ✅ `release-notes.yml` - Release Notes Generation
7. ⚠️ `deploy.yml` - GitHub Pages Deploy (disabled, Vercel is active)
8. ⚠️ `scheduled-tasks.yml` - GitHub Pages Scheduled (disabled, Vercel is active)

**Dependabot Config**: `.github/dependabot.yml`  
**Release Drafter Config**: `.github/release-drafter.yml`

---

## Repository Links

- **Repository**: https://github.com/Salmanahmed1078/heavens-above
- **Actions**: https://github.com/Salmanahmed1078/heavens-above/actions
- **CI Workflow**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/ci.yml
- **Deploy Workflow**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/deploy-vercel.yml
- **Documentation**: https://Salmanahmed1078.github.io/heavens-above/
- **Live Site (Vercel)**: https://heavens-above-eta.vercel.app/

---

*Last Updated: $(date)*
*Generated for Assignment 2 - GitHub Actions*

