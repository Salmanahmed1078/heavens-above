# Assignment 2 Submission Guide
## GitHub Actions Workflows - Complete Checklist

This guide helps you collect all required deliverables for your assignment submission.

---

## 📋 Deliverables Checklist

### 1. ✅ YAML Files (Already Complete)

All workflow files are in your repository. Verify you have:

- [x] `.github/workflows/ci.yml`
- [x] `.github/workflows/deploy-vercel.yml`
- [x] `.github/workflows/scheduled-vercel.yml`
- [x] `.github/workflows/code-review.yml`
- [x] `.github/workflows/documentation.yml`
- [x] `.github/workflows/release-notes.yml`
- [x] `.github/dependabot.yml`
- [x] `.github/release-drafter.yml`

**Location**: https://github.com/Salmanahmed1078/heavens-above/tree/main/.github

---

### 2. 📄 Documentation

**Main Documentation File**: `WORKFLOWS_DOCUMENTATION.md` (already created)

This comprehensive document includes:
- Purpose of each workflow
- Configuration details
- How to interpret results
- Success criteria
- Troubleshooting guide

---

### 3. 📊 Test Reports and Artifacts

Follow this step-by-step guide to collect all required evidence:

---

## Step-by-Step: Collecting Test Reports

### A. Continuous Integration Reports

**What to Collect:**
1. Screenshot of successful CI runs
2. Downloaded audit reports (JSON files)

**How to Collect:**

1. **Navigate to CI Workflow**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/ci.yml
   - Click on the latest successful run (green checkmark)

2. **Take Screenshot**:
   - Capture the entire run page showing:
     - Both matrix jobs (Node 18.x and 20.x) with green checkmarks
     - Job durations
     - Commit message

3. **Download Artifacts**:
   - Scroll to bottom of run page
   - Find "Artifacts" section
   - Download `npm-audit-report-18.x`
   - Download `npm-audit-report-20.x`
   - Save these JSON files for submission

**Save as**: `ci-reports/ci-success-screenshot.png` and `ci-reports/audit-*.json`

---

### B. Deployment Logs and Evidence

**What to Collect:**
1. Screenshot of successful deployment
2. Deployment URL in logs
3. Screenshot of live site with data

**How to Collect:**

1. **Navigate to Deploy Workflow**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/deploy-vercel.yml
   - Click on latest successful run

2. **Take Screenshots**:
   - Screenshot 1: Overall run status (green checkmark)
   - Screenshot 2: "Vercel deploy (production)" step showing:
     - ✅ Deployment successful message
     - Deployment URL (e.g., `https://heavens-above-eta.vercel.app/`)
   - Screenshot 3: "Build data" step showing file counts and sizes

3. **Verify Live Site**:
   - Visit: https://heavens-above-eta.vercel.app/
   - Take screenshot showing:
     - Data tables populated with ISS transit information
     - Iridium flash data
     - Generate celestial phenomenon forecast section

4. **Download Artifacts**:
   - From workflow run, download `scrape-output-<run_number>`
   - Extract to see `scrape.log` and `public/data/` files

**Save as**: 
- `deployment-reports/deploy-success-screenshot.png`
- `deployment-reports/deploy-url-screenshot.png`
- `deployment-reports/live-site-screenshot.png`
- `deployment-reports/scrape-artifact.zip`

---

### C. Scheduled Task Evidence

**What to Collect:**
1. Screenshot of scheduled workflow runs
2. Evidence of automatic execution
3. Commit history showing auto-commits

**How to Collect:**

1. **Navigate to Scheduled Workflow**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/scheduled-vercel.yml

2. **Take Screenshots**:
   - Screenshot showing multiple scheduled runs (with clock icon)
   - Screenshot of a successful scheduled run
   - Expand "Run scraper" step to show execution

3. **Check Commit History**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/commits/main
   - Look for commits like "Update scraped data from scheduled run"
   - Screenshot showing these auto-commits

4. **Verify Schedule**:
   - Check workflow file shows: `cron: '45 21 * * *'` (daily at 02:45 PKT)

**Save as**: 
- `scheduled-reports/scheduled-runs-screenshot.png`
- `scheduled-reports/auto-commits-screenshot.png`

---

### D. Code Review Workflow Evidence

**What to Collect:**
1. Screenshot of PR with checks
2. Evidence of CodeQL analysis
3. Audit report from PR

**How to Collect:**

1. **Create a Test PR** (if you don't have one):
   ```bash
   cd ~/heavens-above
   git checkout -b test-pr-$(date +%Y%m%d)
   echo "// Test PR for code review" >> src/test-code-review.js
   git add .
   git commit -m "Test: trigger code review workflow"
   git push -u origin test-pr-$(date +%Y%m%d)
   ```
   - Then create PR on GitHub

2. **Take Screenshots**:
   - Screenshot of PR page showing "Checks" tab
   - Show all three jobs: ESLint/Prettier, npm audit, CodeQL
   - All should show green checkmarks

3. **Download Artifacts**:
   - Go to PR → Checks → npm audit job
   - Download audit artifact

4. **Check CodeQL** (if available):
   - Go to: https://github.com/Salmanahmed1078/heavens-above/security/code-scanning
   - Screenshot showing CodeQL analysis status

**Save as**: 
- `code-review-reports/pr-checks-screenshot.png`
- `code-review-reports/codeql-screenshot.png`
- `code-review-reports/pr-audit-artifact.zip`

---

### E. Documentation Deployment Evidence

**What to Collect:**
1. Screenshot of successful docs deployment
2. Screenshot of live documentation site

**How to Collect:**

1. **Navigate to Documentation Workflow**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/documentation.yml
   - Click on latest successful run

2. **Take Screenshots**:
   - Screenshot of successful run (green checkmark)
   - Screenshot of "Build docs" step showing files created
   - Screenshot of "Deploy to GitHub Pages" step

3. **Verify Live Documentation**:
   - Visit: https://Salmanahmed1078.github.io/heavens-above/
   - Take screenshot showing:
     - Index page with file listing
     - Styled documentation page
     - Links to README.html and other docs

**Save as**: 
- `docs-reports/docs-deploy-screenshot.png`
- `docs-reports/live-docs-screenshot.png`

---

### F. Dependency Updates Evidence

**What to Collect:**
1. Screenshot of Dependabot PRs
2. Evidence of weekly schedule working

**How to Collect:**

1. **Check Dependabot PRs**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/pulls
   - Filter by author: "dependabot"
   - Screenshot showing Dependabot PRs (if any exist)

2. **Check Dependabot Configuration**:
   - Verify `.github/dependabot.yml` exists
   - Screenshot of file showing weekly schedule

**Note**: If no PRs exist yet, that's okay - Dependabot runs weekly. Document that it's configured correctly.

**Save as**: 
- `dependabot-reports/dependabot-config-screenshot.png`
- `dependabot-reports/dependabot-prs-screenshot.png` (if available)

---

### G. Release Notes Evidence

**What to Collect:**
1. Screenshot of generated release
2. Evidence of release notes

**How to Collect:**

1. **Create a Test Release** (if needed):
   ```bash
   cd ~/heavens-above
   git tag v0.2.0
   git push origin v0.2.0
   ```

2. **Navigate to Releases**:
   - Go to: https://github.com/Salmanahmed1078/heavens-above/releases
   - Click on latest release

3. **Take Screenshots**:
   - Screenshot of release page showing:
     - Auto-generated release notes
     - Categorized changes (Features, Fixes, Maintenance)
     - Contributors list

**Save as**: 
- `release-reports/release-notes-screenshot.png`

---

## 📦 Organizing Your Submission

Create the following folder structure for your submission:

```
Assignment2_Submission/
├── YAML_Files/
│   ├── ci.yml
│   ├── deploy-vercel.yml
│   ├── scheduled-vercel.yml
│   ├── code-review.yml
│   ├── documentation.yml
│   ├── release-notes.yml
│   ├── deploy.yml (disabled)
│   ├── scheduled-tasks.yml (disabled)
│   ├── dependabot.yml
│   └── release-drafter.yml
│
├── Documentation/
│   ├── WORKFLOWS_DOCUMENTATION.md
│   └── SUBMISSION_GUIDE.md (this file)
│
├── Test_Reports/
│   ├── ci-reports/
│   │   ├── ci-success-screenshot.png
│   │   ├── audit-report-18.json
│   │   └── audit-report-20.json
│   │
│   ├── deployment-reports/
│   │   ├── deploy-success-screenshot.png
│   │   ├── deploy-url-screenshot.png
│   │   ├── live-site-screenshot.png
│   │   └── scrape-artifact.zip
│   │
│   ├── scheduled-reports/
│   │   ├── scheduled-runs-screenshot.png
│   │   └── auto-commits-screenshot.png
│   │
│   ├── code-review-reports/
│   │   ├── pr-checks-screenshot.png
│   │   ├── codeql-screenshot.png
│   │   └── pr-audit-artifact.zip
│   │
│   ├── docs-reports/
│   │   ├── docs-deploy-screenshot.png
│   │   └── live-docs-screenshot.png
│   │
│   ├── dependabot-reports/
│   │   ├── dependabot-config-screenshot.png
│   │   └── dependabot-prs-screenshot.png
│   │
│   └── release-reports/
│       └── release-notes-screenshot.png
│
└── README.txt (optional: submission instructions)
```

---

## 🔗 Quick Links for Evidence Collection

### GitHub Links
- **All Workflows**: https://github.com/Salmanahmed1078/heavens-above/actions
- **CI Workflow**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/ci.yml
- **Deploy Workflow**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/deploy-vercel.yml
- **Scheduled Workflow**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/scheduled-vercel.yml
- **Code Review**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/code-review.yml
- **Documentation**: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/documentation.yml
- **Releases**: https://github.com/Salmanahmed1078/heavens-above/releases
- **Pull Requests**: https://github.com/Salmanahmed1078/heavens-above/pulls

### Live URLs
- **Main Site (Vercel)**: https://heavens-above-eta.vercel.app/
- **Documentation (GitHub Pages)**: https://Salmanahmed1078.github.io/heavens-above/

---

## ✅ Final Submission Checklist

Before submitting, ensure you have:

- [ ] All 8 workflow YAML files (or 6 active + 2 disabled)
- [ ] Dependabot configuration file
- [ ] Release drafter configuration file
- [ ] Complete documentation (WORKFLOWS_DOCUMENTATION.md)
- [ ] Screenshots of successful CI runs
- [ ] Downloaded CI audit reports (JSON)
- [ ] Screenshots of successful deployments
- [ ] Screenshot of live site with data
- [ ] Evidence of scheduled tasks running
- [ ] Screenshots of code review checks on PR
- [ ] Screenshots of documentation deployment
- [ ] Screenshot of live documentation site
- [ ] Evidence of release notes generation
- [ ] All artifacts downloaded and organized

---

## 📝 Submission Notes

### Important Points to Include in Submission:

1. **Repository URL**: https://github.com/Salmanahmed1078/heavens-above
2. **Main Deployment**: Vercel (changed from GitHub Pages)
3. **Documentation**: GitHub Pages (separate deployment)
4. **All workflows are functional and tested**
5. **Scheduled tasks run daily at 02:45 PKT**

### If Something is Missing:

- **No Dependabot PRs yet?** That's normal - it runs weekly. Document that it's configured.
- **Documentation shows 404?** Run the documentation workflow manually and wait for completion.
- **Code Review hasn't run?** Create a test PR to trigger it.

---

*Good luck with your submission!*

