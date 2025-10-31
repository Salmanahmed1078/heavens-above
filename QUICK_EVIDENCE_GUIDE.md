# Quick Evidence Collection Guide
## Screenshot Checklist for Assignment Submission

Use this quick checklist to ensure you capture all required evidence.

---

## 📸 Essential Screenshots to Take

### 1. CI Workflow (2 screenshots needed)

**Screenshot 1: Overall CI Success**
- Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/ci.yml
- Show: Latest run with green checkmarks for both Node 18.x and 20.x

**Screenshot 2: Audit Reports**
- Scroll to bottom of run
- Show: Artifacts section with downloadable audit reports

**Download**: Both audit report JSON files

---

### 2. Deployment Workflow (3 screenshots needed)

**Screenshot 1: Deployment Success**
- Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/deploy-vercel.yml
- Show: Latest successful run with green checkmark

**Screenshot 2: Deployment URL in Logs**
- Expand "Vercel deploy (production)" step
- Show: "✅ Deployment successful: https://..." message

**Screenshot 3: Live Site with Data**
- Visit: https://heavens-above-eta.vercel.app/
- Show: Page with populated data tables (ISS transit, Iridium flashes)

**Download**: `scrape-output-*` artifact

---

### 3. Scheduled Tasks (2 screenshots needed)

**Screenshot 1: Scheduled Runs List**
- Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/scheduled-vercel.yml
- Show: Multiple runs with clock icon (indicating scheduled runs)

**Screenshot 2: Auto-Commits**
- Go to: https://github.com/Salmanahmed1078/heavens-above/commits/main
- Show: Commits like "Update scraped data from scheduled run [skip ci]"

---

### 4. Code Review (2 screenshots needed)

**Screenshot 1: PR Checks**
- Create/open a PR: https://github.com/Salmanahmed1078/heavens-above/pulls
- Go to "Checks" tab
- Show: All three jobs passing (ESLint/Prettier, npm audit, CodeQL)

**Screenshot 2: CodeQL Results** (if available)
- Go to: https://github.com/Salmanahmed1078/heavens-above/security/code-scanning
- Show: CodeQL analysis status

**Download**: PR audit artifact

---

### 5. Documentation (2 screenshots needed)

**Screenshot 1: Documentation Deployment**
- Go to: https://github.com/Salmanahmed1078/heavens-above/actions/workflows/documentation.yml
- Show: Latest successful run

**Screenshot 2: Live Documentation Site**
- Visit: https://Salmanahmed1078.github.io/heavens-above/
- Show: Documentation index page with file listings

---

### 6. Dependabot (1 screenshot needed)

**Screenshot: Dependabot Configuration**
- Go to: https://github.com/Salmanahmed1078/heavens-above/blob/main/.github/dependabot.yml
- Show: File content showing weekly schedule

*(Note: If no PRs exist yet, that's normal - Dependabot runs weekly)*

---

### 7. Release Notes (1 screenshot needed)

**Screenshot: Release with Notes**
- Go to: https://github.com/Salmanahmed1078/heavens-above/releases
- Show: Latest release with auto-generated notes (Features, Fixes, etc.)

*(If no release exists, create one by pushing a tag: `git tag v0.2.0 && git push origin v0.2.0`)*

---

## 📥 Artifacts to Download

### From CI Workflow:
1. `npm-audit-report-18.x` (JSON)
2. `npm-audit-report-20.x` (JSON)

### From Deployment Workflow:
1. `scrape-output-<run_number>` (ZIP containing scrape.log and data files)

### From Code Review (PR):
1. `pr-npm-audit-report-<job>` (JSON)

---

## ✅ Final Checklist Before Submission

- [ ] All 7+ screenshots captured
- [ ] All artifacts downloaded
- [ ] Screenshots placed in correct Test_Reports/ subdirectories
- [ ] Artifacts extracted and organized
- [ ] Documentation reviewed (WORKFLOWS_DOCUMENTATION.md)
- [ ] Submission guide reviewed (SUBMISSION_GUIDE.md)
- [ ] All YAML files verified in YAML_Files/ directory

---

## 🚀 Quick Commands

### Create Test PR for Code Review:
```bash
cd ~/heavens-above
git checkout -b test-pr-$(date +%Y%m%d)
echo "// Test PR" > src/test.js
git add . && git commit -m "Test PR"
git push -u origin test-pr-$(date +%Y%m%d)
# Then create PR on GitHub
```

### Trigger Manual Workflow Runs:
1. Go to Actions tab
2. Click on workflow name
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

### Create Test Release:
```bash
cd ~/heavens-above
git tag v0.2.0
git push origin v0.2.0
```

---

*Use this guide alongside SUBMISSION_GUIDE.md for complete instructions*

