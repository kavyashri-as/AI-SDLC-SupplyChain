# Workshop 2: Testing Persona – Phase 3
## Execution & CI/CD Integration with Azure Playwright

---

## 📋 **OVERVIEW**

**Workshop**: Testing Persona – Requirement to Test  
**Phase**: 3 of 3 (Execution & CI/CD Integration)  

### **Scenario**
You are a **QA DevOps Engineer** working on the **OctoCAT Supply Chain Management** system. In Phase 1, you generated comprehensive test scenarios, and in Phase 2, you created automated test scripts using Selenium and Behave framework.

Now, you will:
1. Push test automation scripts to GitHub repository
2. Create **GitHub Actions** workflow to trigger automated test execution
3. Configure **Azure Playwright Testing** workspace for cloud-based test execution
4. Execute tests in Azure cloud environment to validate the Cart Icon feature
5. Integrate test results into CI/CD pipeline
6. Setup test reporting and notifications
7. Schedule automated test runs

### **Learning Objectives**
By completing Phase 3, you will learn to:
- ✅ Push test automation code to GitHub repository
- ✅ Create GitHub Actions workflows for CI/CD
- ✅ Configure Azure Playwright Testing workspace
- ✅ Execute tests in Azure cloud environment
- ✅ Integrate test execution with pull request workflows
- ✅ Generate and publish test reports
- ✅ Configure test result notifications (email, Slack, Teams)
- ✅ Setup scheduled test runs (nightly, weekly)
- ✅ Monitor test execution and analyze failures
- ✅ Implement test result dashboards

---

## 🎯 **PREREQUISITES**

### **Required Tools & Accounts**
- ✅ Visual Studio Code with GitHub Copilot extension
- ✅ Git installed and configured
- ✅ GitHub account with repository access
- ✅ Azure account (free tier acceptable)
- ✅ Azure CLI installed
- ✅ GitHub CLI (gh) installed (optional)
- ✅ Python 3.9+ installed
- ✅ Node.js 18+ and npm installed

### **Completion Requirements**
- ✅ **Workshop 2 Phase 1 completed**: Test scenarios generated
- ✅ **Workshop 2 Phase 2 completed**: Test automation scripts created
- ✅ **Test Automation Framework Ready**:
  - `test-automation/` directory with all scripts
  - Feature files, page objects, step definitions
  - requirements.txt with dependencies
  - behave.ini configuration

### **Azure Prerequisites**
- ✅ **Azure Subscription**: Active subscription (free tier works)
- ✅ **Azure Playwright Testing**: Service enabled
- ✅ **Resource Group**: Created for testing resources
- ✅ **Service Connection**: GitHub to Azure connection

---

## ⏱️ **Estimated Time**: 3.5 - 4.5 hours

---

## 🔗 **Continuation from Phase 2**

This exercise builds directly on Phase 2. You will:
- Take the automated test scripts from Phase 2
- Push them to GitHub repository
- Create CI/CD pipeline with GitHub Actions
- Configure Azure Playwright Testing workspace
- Execute tests in cloud environment
- Validate Cart Icon feature in production-like environment

---

## 🚀 **PHASE 3: EXECUTION & CI/CD INTEGRATION**

---

### **STEP 1: Prepare Test Repository for CI/CD** (25 minutes)

#### 1.1 Review and Organize Test Automation Structure

Verify your test automation structure from Phase 2:

```bash
cd ai-sdlc-brownfield-workshop/test-automation
```

**Expected structure:**
```
test-automation/
├── .github/
│   └── workflows/              # CI/CD workflows (to be created)
│       ├── test-execution.yml
│       ├── nightly-tests.yml
│       └── pr-validation.yml
├── features/                   # Gherkin feature files
│   ├── cart_icon_visibility.feature
│   ├── cart_operations.feature
│   ├── cart_persistence.feature
│   ├── cart_accessibility.feature
│   ├── cart_edge_cases.feature
│   └── steps/                  # Step definitions
│       ├── __init__.py
│       ├── common_steps.py
│       ├── cart_icon_steps.py
│       ├── cart_operations_steps.py
│       └── cart_persistence_steps.py
├── pages/                      # Page Object Model
│   ├── __init__.py
│   ├── base_page.py
│   ├── home_page.py
│   ├── products_page.py
│   ├── cart_page.py
│   └── header_component.py
├── utils/                      # Utilities
│   ├── __init__.py
│   ├── driver_factory.py
│   ├── wait_helpers.py
│   └── test_data_helpers.py
├── config/                     # Configuration
│   ├── __init__.py
│   ├── config.py
│   └── test_config.json
├── reports/                    # Test reports (gitignored)
│   └── .gitkeep
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── requirements.txt            # Python dependencies
├── behave.ini                  # Behave configuration
├── pytest.ini                  # Pytest configuration (optional)
└── README.md                   # Documentation
```

#### 1.2 Create .gitignore File

Create `test-automation/.gitignore`:

```bash
touch .gitignore
```

**Content:**
```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Test reports and artifacts
reports/
screenshots/
*.html
*.json
*.xml
allure-results/
allure-report/
test-results/
playwright-report/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment variables
.env
.env.local
*.log

# Drivers (managed by webdriver-manager)
drivers/
.wdm/

# Coverage
.coverage
htmlcov/
.pytest_cache/
```

#### 1.3 Create Environment Variables Template

Create `.env.example`:

**Prompt 1: Generate .env.example**
```
Create a .env.example file with environment variables for the test automation framework.

Include:
1. **Application URLs**:
   - BASE_URL
   - API_URL
2. **Browser Configuration**:
   - BROWSER (chrome, firefox, edge)
   - HEADLESS (true/false)
3. **Azure Playwright Configuration**:
   - AZURE_PLAYWRIGHT_URL
   - AZURE_PLAYWRIGHT_TOKEN
4. **Test Execution Settings**:
   - IMPLICIT_WAIT
   - EXPLICIT_WAIT
   - SCREENSHOT_ON_FAILURE
5. **CI/CD Settings**:
   - CI (true/false)
   - TEST_ENV (local, staging, production)
6. **Reporting**:
   - REPORT_FORMAT (html, json, allure)

Provide example values with comments.
```

**Expected output for .env.example:**
```bash
# Application URLs
BASE_URL=http://localhost:5173
API_URL=http://localhost:3000

# Browser Configuration
BROWSER=chrome
HEADLESS=false
WINDOW_WIDTH=1920
WINDOW_HEIGHT=1080

# Azure Playwright Testing
AZURE_PLAYWRIGHT_URL=wss://your-workspace.playwright.azure.microsoft.com
AZURE_PLAYWRIGHT_TOKEN=your-access-token
AZURE_PLAYWRIGHT_ENABLED=false

# Test Execution Settings
IMPLICIT_WAIT=10
EXPLICIT_WAIT=30
PAGE_LOAD_TIMEOUT=60
SCREENSHOT_ON_FAILURE=true

# CI/CD Environment
CI=false
TEST_ENV=local
PARALLEL_WORKERS=1

# Reporting
REPORT_FORMAT=html
ALLURE_RESULTS_DIR=reports/allure-results
```

#### 1.4 Create Comprehensive README

Create `test-automation/README.md`:

**Prompt 2: Generate Test Automation README**
```
Generate a comprehensive README.md for the test automation framework.

Include:
1. **Project Overview**
   - Purpose and scope
   - Features tested (Cart Icon)
   - Tech stack (Selenium, Behave, Python)

2. **Prerequisites**
   - Python version
   - Required tools
   - Azure account (for cloud execution)

3. **Setup Instructions**
   - Clone repository
   - Install dependencies
   - Configure environment variables
   - Verify setup

4. **Running Tests Locally**
   - Run all tests
   - Run specific features
   - Run by tags
   - Multi-browser execution
   - Headless mode

5. **Running Tests in Azure Playwright**
   - Azure setup
   - Configuration
   - Execution commands

6. **CI/CD Integration**
   - GitHub Actions workflows
   - Triggering tests
   - Viewing results

7. **Test Reports**
   - HTML reports
   - Allure reports
   - Screenshots

8. **Project Structure**
   - Directory layout explanation

9. **Writing New Tests**
   - Creating feature files
   - Adding page objects
   - Writing step definitions

10. **Troubleshooting**
    - Common issues and solutions

Create a professional, detailed README.
```

#### 1.5 Commit and Push to GitHub

Initialize git (if not already done) and commit:

```bash
cd ai-sdlc-brownfield-workshop

# Check git status
git status

# Add test automation files
git add test-automation/

# Commit
git commit -m "feat: Add test automation framework for Cart Icon feature

- Add Selenium + Behave (BDD) test framework
- Add 5+ Gherkin feature files with 100+ scenarios
- Implement Page Object Model (POM) pattern
- Add utilities for driver management and waits
- Configure Behave framework with behave.ini
- Add comprehensive documentation

Relates to Workshop 2 Phase 2"

# Push to GitHub
git push origin main
```

**Verify on GitHub:**
1. Go to https://github.com/CanarysPlayground/ai-sdlc-brownfield-workshop
2. Navigate to `test-automation/` directory
3. Verify all files are present

---

### **STEP 2: Create GitHub Actions Workflow for Test Execution** (45 minutes)

#### 2.1 Create GitHub Actions Directory

```bash
cd test-automation
mkdir -p .github/workflows
```

#### 2.2 Create Basic Test Execution Workflow

Create `.github/workflows/test-execution.yml`:

**Prompt 3: Generate GitHub Actions Workflow for Test Execution**
```
Generate a GitHub Actions workflow file for running Selenium + Behave tests.

Workflow name: "Test Execution - Cart Icon Feature"

Triggers:
- Push to main branch (test-automation/* path)
- Pull request targeting main
- Manual workflow dispatch with parameters

Jobs:
1. **test-execution**:
   - Runs on: ubuntu-latest
   - Python version: 3.9
   - Steps:
     a. Checkout code
     b. Setup Python
     c. Install dependencies (requirements.txt)
     d. Setup browsers (Chrome, Firefox)
     e. Start application (frontend + API using docker-compose)
     f. Wait for application to be ready
     g. Run Behave tests with tags
     h. Upload test reports as artifacts
     i. Upload screenshots (if failures)
     j. Post test summary as comment (on PR)
     k. Fail workflow if tests fail

Environment variables:
- BASE_URL, API_URL
- BROWSER, HEADLESS=true
- CI=true

Use actions/checkout@v4, actions/setup-python@v5, actions/upload-artifact@v4

Include matrix strategy for multiple browsers (optional).
```

**Expected output for .github/workflows/test-execution.yml:**
```yaml
name: Test Execution - Cart Icon Feature

on:
  push:
    branches:
      - main
    paths:
      - 'test-automation/**'
      - 'supply-chain-system/**'
      - '.github/workflows/test-execution.yml'
  
  pull_request:
    branches:
      - main
    paths:
      - 'test-automation/**'
      - 'supply-chain-system/**'
  
  workflow_dispatch:
    inputs:
      browser:
        description: 'Browser to run tests'
        required: false
        default: 'chrome'
        type: choice
        options:
          - chrome
          - firefox
          - edge
      tags:
        description: 'Behave tags to run (e.g., @smoke)'
        required: false
        default: '@smoke'
        type: string
      headless:
        description: 'Run in headless mode'
        required: false
        default: true
        type: boolean

env:
  PYTHON_VERSION: '3.9'
  NODE_VERSION: '18'

jobs:
  test-execution:
    name: Run Automated Tests
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        browser: [chrome]
        # Uncomment for multi-browser testing
        # browser: [chrome, firefox]
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'supply-chain-system/**/package-lock.json'
      
      - name: Install Python dependencies
        working-directory: ./test-automation
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Install application dependencies
        run: |
          cd supply-chain-system/api
          npm ci
          cd ../frontend
          npm ci
      
      - name: Start API server
        working-directory: ./supply-chain-system/api
        run: |
          npm run dev &
          echo "API_PID=$!" >> $GITHUB_ENV
        env:
          NODE_ENV: test
      
      - name: Start Frontend server
        working-directory: ./supply-chain-system/frontend
        run: |
          npm run dev &
          echo "FRONTEND_PID=$!" >> $GITHUB_ENV
        env:
          NODE_ENV: test
      
      - name: Wait for application to be ready
        run: |
          echo "Waiting for API to be ready..."
          timeout 60 bash -c 'until curl -f http://localhost:3000/health || curl -f http://localhost:3000; do sleep 2; done'
          echo "Waiting for Frontend to be ready..."
          timeout 60 bash -c 'until curl -f http://localhost:5173; do sleep 2; done'
          echo "Application is ready!"
      
      - name: Run Behave tests
        working-directory: ./test-automation
        env:
          BASE_URL: http://localhost:5173
          API_URL: http://localhost:3000
          BROWSER: ${{ matrix.browser }}
          HEADLESS: true
          CI: true
          SCREENSHOT_ON_FAILURE: true
        run: |
          # Determine tags to run
          TAGS="${{ github.event.inputs.tags }}"
          if [ -z "$TAGS" ]; then
            TAGS="@smoke"
          fi
          
          echo "Running tests with tags: $TAGS"
          behave --tags="$TAGS" \
                 --format=html --outfile=reports/test-report.html \
                 --format=json --outfile=reports/test-report.json \
                 --format=pretty \
                 --no-capture \
                 --no-capture-stderr
      
      - name: Generate test summary
        if: always()
        working-directory: ./test-automation
        run: |
          echo "## Test Execution Summary 🧪" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "**Browser**: ${{ matrix.browser }}" >> $GITHUB_STEP_SUMMARY
          echo "**Environment**: CI/CD Pipeline" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          
          # Parse JSON report for summary
          if [ -f reports/test-report.json ]; then
            python -c "
import json
import sys
with open('reports/test-report.json', 'r') as f:
    data = json.load(f)
    total = len([f for f in data if f.get('elements')])
    passed = len([e for f in data for e in f.get('elements', []) if e.get('status') == 'passed'])
    failed = len([e for f in data for e in f.get('elements', []) if e.get('status') == 'failed'])
    print(f'**Total Scenarios**: {total}')
    print(f'**Passed**: ✅ {passed}')
    print(f'**Failed**: ❌ {failed}')
            " >> $GITHUB_STEP_SUMMARY || echo "Could not parse test results"
          fi
      
      - name: Upload test reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports-${{ matrix.browser }}
          path: |
            test-automation/reports/
          retention-days: 30
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-screenshots-${{ matrix.browser }}
          path: test-automation/reports/screenshots/
          retention-days: 30
      
      - name: Cleanup
        if: always()
        run: |
          # Kill application servers
          kill $API_PID || true
          kill $FRONTEND_PID || true
      
      - name: Fail workflow if tests failed
        if: failure()
        run: |
          echo "❌ Tests failed! Check the reports for details."
          exit 1
```

#### 2.3 Create Nightly Test Execution Workflow

Create `.github/workflows/nightly-tests.yml`:

**Prompt 4: Generate Nightly Test Workflow**
```
Generate a GitHub Actions workflow for scheduled nightly test execution.

Workflow name: "Nightly Test Execution"

Triggers:
- Cron schedule: "0 2 * * *" (2 AM UTC daily)
- Manual workflow dispatch

Jobs:
1. **nightly-tests**:
   - Run all tests (not just smoke tests)
   - Multi-browser matrix (Chrome, Firefox)
   - Extended timeout
   - Generate comprehensive reports
   - Send notification on failure (GitHub issue or email)
   - Upload detailed test artifacts

Include comprehensive test execution with all feature files.
Generate detailed HTML report.
```

**Expected output for .github/workflows/nightly-tests.yml:**
```yaml
name: Nightly Test Execution

on:
  schedule:
    # Run at 2 AM UTC every day
    - cron: '0 2 * * *'
  
  workflow_dispatch:
    inputs:
      browsers:
        description: 'Browsers to test (comma-separated)'
        required: false
        default: 'chrome,firefox'
        type: string

jobs:
  nightly-tests:
    name: Nightly Regression Tests
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        browser: [chrome, firefox]
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.9'
          cache: 'pip'
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./test-automation
        run: |
          pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Install application dependencies
        run: |
          cd supply-chain-system/api && npm ci
          cd ../frontend && npm ci
      
      - name: Start application
        run: |
          cd supply-chain-system/api && npm run dev &
          cd supply-chain-system/frontend && npm run dev &
          sleep 30
      
      - name: Run comprehensive tests
        working-directory: ./test-automation
        env:
          BASE_URL: http://localhost:5173
          API_URL: http://localhost:3000
          BROWSER: ${{ matrix.browser }}
          HEADLESS: true
          CI: true
        run: |
          # Run all tests (no tag filtering)
          behave --format=html --outfile=reports/nightly-report-${{ matrix.browser }}.html \
                 --format=json --outfile=reports/nightly-report-${{ matrix.browser }}.json \
                 --no-capture
      
      - name: Upload comprehensive reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: nightly-test-reports-${{ matrix.browser }}
          path: test-automation/reports/
          retention-days: 90
      
      - name: Create issue on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Nightly Test Failure - ${new Date().toDateString()}`,
              body: `## Nightly Test Execution Failed ❌\n\n**Browser**: ${{ matrix.browser }}\n**Date**: ${new Date().toISOString()}\n**Workflow Run**: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}\n\nPlease investigate the test failures.`,
              labels: ['test-failure', 'automated-tests', 'bug']
            })
```

#### 2.4 Create PR Validation Workflow

Create `.github/workflows/pr-validation.yml`:

**Prompt 5: Generate PR Validation Workflow**
```
Generate a GitHub Actions workflow for pull request validation.

Workflow name: "PR Test Validation"

Triggers:
- Pull request opened, synchronized, reopened

Jobs:
1. **pr-tests**:
   - Run smoke tests only (@smoke tag)
   - Fast execution (< 10 minutes)
   - Report results as PR comment
   - Block merge if tests fail (status check)
   - Show test summary in PR

Use PR comment action to post results.
```

---

### **STEP 3: Configure Azure Playwright Testing Workspace** (40 minutes)

#### 3.1 Setup Azure Playwright Testing Service

**Prerequisites:**
- Azure subscription
- Azure CLI installed and authenticated

**Login to Azure:**
```bash
az login
```

**Create Resource Group:**
```bash
az group create \
  --name rg-playwright-testing \
  --location eastus
```

#### 3.2 Create Azure Playwright Testing Workspace

**Using Azure Portal:**

1. Navigate to Azure Portal: https://portal.azure.com
2. Search for "Microsoft Playwright Testing"
3. Click "Create"
4. Fill in details:
   - **Subscription**: Your subscription
   - **Resource Group**: rg-playwright-testing
   - **Workspace Name**: octocat-playwright-workspace
   - **Region**: East US
   - **Pricing Tier**: Free or Standard
5. Click "Review + Create"
6. Click "Create"

**Or using Azure CLI:**

```bash
# Create Playwright Testing workspace
az playwright testing workspace create \
  --resource-group rg-playwright-testing \
  --name octocat-playwright-workspace \
  --location eastus
```

#### 3.3 Get Workspace Access Token

**Get workspace URL and token:**

```bash
# Get workspace details
az playwright testing workspace show \
  --resource-group rg-playwright-testing \
  --name octocat-playwright-workspace

# Generate access token
az playwright testing workspace get-access-token \
  --resource-group rg-playwright-testing \
  --name octocat-playwright-workspace
```

**Save the output:**
- **Workspace URL**: `wss://your-workspace.playwright.azure.microsoft.com`
- **Access Token**: Copy the token (valid for limited time)

#### 3.4 Configure GitHub Secrets for Azure

Add Azure credentials to GitHub repository secrets:

1. Go to GitHub repository: https://github.com/CanarysPlayground/ai-sdlc-brownfield-workshop
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

**Add the following secrets:**

```
AZURE_PLAYWRIGHT_URL
Value: wss://your-workspace.playwright.azure.microsoft.com

AZURE_PLAYWRIGHT_TOKEN
Value: [Your access token]

AZURE_CLIENT_ID
Value: [Your Azure App Client ID]

AZURE_CLIENT_SECRET
Value: [Your Azure App Client Secret]

AZURE_TENANT_ID
Value: [Your Azure Tenant ID]
```

**To get Azure Service Principal credentials:**
```bash
# Create service principal
az ad sp create-for-rbac \
  --name "github-actions-playwright" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/rg-playwright-testing \
  --sdk-auth
```

Copy the JSON output and extract `clientId`, `clientSecret`, `tenantId`.

#### 3.5 Update Test Configuration for Azure Playwright

Update `test-automation/config/config.py` to support Azure Playwright:

**Prompt 6: Update Config for Azure Playwright**
```
Update config/config.py to add Azure Playwright Testing support.

Add new configuration variables:
1. AZURE_PLAYWRIGHT_ENABLED (bool, default False)
2. AZURE_PLAYWRIGHT_URL (from env)
3. AZURE_PLAYWRIGHT_TOKEN (from env)
4. get_playwright_driver() method that returns:
   - Local Selenium driver (if Azure disabled)
   - Azure Playwright connected driver (if Azure enabled)

Keep existing Selenium configuration.
Add conditional logic to switch between local and Azure execution.
```

**Key additions to config.py:**
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # ... existing config ...
    
    # Azure Playwright Testing
    AZURE_PLAYWRIGHT_ENABLED = os.getenv("AZURE_PLAYWRIGHT_ENABLED", "false").lower() == "true"
    AZURE_PLAYWRIGHT_URL = os.getenv("AZURE_PLAYWRIGHT_URL", "")
    AZURE_PLAYWRIGHT_TOKEN = os.getenv("AZURE_PLAYWRIGHT_TOKEN", "")
    
    @classmethod
    def is_azure_playwright_enabled(cls):
        """Check if Azure Playwright is configured and enabled."""
        return (cls.AZURE_PLAYWRIGHT_ENABLED and 
                cls.AZURE_PLAYWRIGHT_URL and 
                cls.AZURE_PLAYWRIGHT_TOKEN)
```

#### 3.6 Create Azure Playwright Execution Workflow

Create `.github/workflows/azure-playwright-tests.yml`:

**Prompt 7: Generate Azure Playwright Workflow**
```
Generate a GitHub Actions workflow for running tests in Azure Playwright Testing.

Workflow name: "Azure Playwright Test Execution"

Triggers:
- Push to main
- Manual workflow dispatch
- Scheduled (daily)

Jobs:
1. **azure-tests**:
   - Setup Python
   - Install Playwright (not Selenium)
   - Configure Azure Playwright connection
   - Run tests against Azure Playwright workspace
   - Collect results from Azure
   - Upload artifacts

Use secrets: AZURE_PLAYWRIGHT_URL, AZURE_PLAYWRIGHT_TOKEN

Note: This requires converting tests to Playwright.
For now, show the workflow structure.
Alternative: Run Selenium tests but deploy app to Azure.
```

**Expected output for .github/workflows/azure-playwright-tests.yml:**
```yaml
name: Azure Playwright Test Execution

on:
  push:
    branches:
      - main
    paths:
      - 'test-automation/**'
  
  workflow_dispatch:
    inputs:
      environment:
        description: 'Test environment'
        required: false
        default: 'staging'
        type: choice
        options:
          - staging
          - production
  
  schedule:
    - cron: '0 6 * * *'  # 6 AM UTC daily

env:
  PYTHON_VERSION: '3.9'

jobs:
  azure-playwright-tests:
    name: Run Tests in Azure Playwright
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        working-directory: ./test-automation
        run: |
          pip install --upgrade pip
          pip install -r requirements.txt
          # Install Playwright
          pip install playwright pytest-playwright
          playwright install chromium firefox webkit
      
      - name: Setup Azure Playwright connection
        env:
          AZURE_PLAYWRIGHT_URL: ${{ secrets.AZURE_PLAYWRIGHT_URL }}
          AZURE_PLAYWRIGHT_TOKEN: ${{ secrets.AZURE_PLAYWRIGHT_TOKEN }}
        run: |
          echo "Configuring Azure Playwright Testing connection..."
          echo "AZURE_PLAYWRIGHT_ENABLED=true" >> $GITHUB_ENV
          echo "AZURE_PLAYWRIGHT_URL=$AZURE_PLAYWRIGHT_URL" >> $GITHUB_ENV
          echo "AZURE_PLAYWRIGHT_TOKEN=$AZURE_PLAYWRIGHT_TOKEN" >> $GITHUB_ENV
      
      - name: Deploy application to test environment
        run: |
          echo "Deploying application to staging environment..."
          # For Azure App Service deployment:
          # az webapp up --name octocat-app --resource-group rg-playwright-testing
          
          # For this workshop, we'll run locally and use ngrok for public access
          # In production, deploy to Azure App Service or Container Apps
      
      - name: Start application with public access
        run: |
          # Install and setup ngrok for public URL (alternative to Azure deploy)
          curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
          echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
          sudo apt update && sudo apt install ngrok
          
          # Start application
          cd supply-chain-system/api && npm ci && npm run dev &
          cd supply-chain-system/frontend && npm ci && npm run dev &
          sleep 30
          
          # Expose via ngrok
          ngrok http 5173 --log=stdout > ngrok.log &
          sleep 5
          
          # Get public URL
          export PUBLIC_URL=$(curl -s localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
          echo "PUBLIC_URL=$PUBLIC_URL" >> $GITHUB_ENV
          echo "Application accessible at: $PUBLIC_URL"
      
      - name: Run tests in Azure Playwright workspace
        working-directory: ./test-automation
        env:
          BASE_URL: ${{ env.PUBLIC_URL }}
          AZURE_PLAYWRIGHT_ENABLED: true
          AZURE_PLAYWRIGHT_URL: ${{ secrets.AZURE_PLAYWRIGHT_URL }}
          AZURE_PLAYWRIGHT_TOKEN: ${{ secrets.AZURE_PLAYWRIGHT_TOKEN }}
        run: |
          # Run tests with Azure Playwright connection
          # Note: This requires Playwright-based tests
          # For Selenium tests, they run locally but can test deployed Azure app
          
          behave --tags="@smoke" \
                 --format=html --outfile=reports/azure-test-report.html \
                 --format=json --outfile=reports/azure-test-report.json
      
      - name: Collect Azure Playwright results
        if: always()
        run: |
          echo "Collecting test results from Azure Playwright workspace..."
          # Azure Playwright automatically collects traces, videos, screenshots
          # Results are available in the Azure portal
      
      - name: Upload test reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: azure-playwright-reports
          path: |
            test-automation/reports/
          retention-days: 60
      
      - name: Post results to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const reportPath = 'test-automation/reports/azure-test-report.json';
            
            if (fs.existsSync(reportPath)) {
              const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
              const comment = `## Azure Playwright Test Results 🎭\n\nTests executed in Azure Playwright Testing workspace\n\n**Environment**: Azure Cloud\n**Status**: ${report.status}\n\nView detailed results in workflow artifacts.`;
              
              github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: comment
              });
            }
      
      - name: Cleanup
        if: always()
        run: |
          # Stop application and ngrok
          pkill -f ngrok || true
          pkill -f "npm run dev" || true
```

---

### **STEP 4: Execute Tests and Validate Results** (30 minutes)

#### 4.1 Trigger Manual Test Execution

**Via GitHub Actions UI:**

1. Go to GitHub repository
2. Navigate to **Actions** tab
3. Select "Test Execution - Cart Icon Feature" workflow
4. Click "Run workflow"
5. Select parameters:
   - Branch: main
   - Browser: chrome
   - Tags: @smoke
   - Headless: true
6. Click "Run workflow"

**Via GitHub CLI:**

```bash
# Trigger test execution workflow
gh workflow run test-execution.yml \
  --ref main \
  -f browser=chrome \
  -f tags=@smoke \
  -f headless=true
```

#### 4.2 Monitor Test Execution

**Watch workflow progress:**

```bash
# List workflow runs
gh run list --workflow=test-execution.yml

# Watch specific run
gh run watch [run-id]

# View run logs
gh run view [run-id] --log
```

**In GitHub UI:**
1. Actions tab → Select workflow run
2. View real-time logs
3. Check each step status
4. Review test summary

#### 4.3 Download and Review Test Reports

**Download artifacts via CLI:**

```bash
# List artifacts
gh run list --workflow=test-execution.yml --limit 1

# Download artifacts from latest run
gh run download [run-id] --name test-reports-chrome
```

**Download via GitHub UI:**
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Download "test-reports-chrome"
4. Extract and open `test-report.html`

#### 4.4 Review Test Results

**Analyze test report:**

```bash
cd test-reports-chrome
open test-report.html  # macOS
# or
start test-report.html  # Windows
# or
xdg-open test-report.html  # Linux
```

**Expected sections in report:**
- Test summary (total, passed, failed, skipped)
- Feature-wise results
- Scenario details
- Step-by-step execution log
- Failure details (if any)
- Execution time

#### 4.5 Create Test Results Dashboard

**Prompt 8: Generate Test Dashboard Script**
```
Create a Python script to generate a test results dashboard.

Script: test-automation/utils/generate_dashboard.py

Features:
1. Parse JSON test reports from multiple runs
2. Calculate metrics:
   - Pass rate
   - Failure trends
   - Test duration trends
   - Flaky tests
3. Generate HTML dashboard with charts (using plotly or matplotlib)
4. Show test history over time
5. Highlight failing tests
6. Browser-wise comparison

Input: reports/*.json files
Output: dashboard.html
```

---

### **STEP 5: Setup Test Monitoring and Notifications** (25 minutes)

#### 5.1 Configure Slack Notifications

**Create Slack webhook:**

1. Go to Slack workspace
2. Navigate to Apps → Incoming Webhooks
3. Create new webhook
4. Copy webhook URL

**Add webhook to GitHub secrets:**

```
Name: SLACK_WEBHOOK_URL
Value: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Update workflow to send Slack notifications:**

Add this step to `.github/workflows/test-execution.yml`:

```yaml
- name: Send Slack notification
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Test Execution Completed",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Cart Icon Feature Tests*\n*Status*: ${{ job.status }}\n*Browser*: ${{ matrix.browser }}\n*Branch*: ${{ github.ref_name }}"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View Results"
                },
                "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
              }
            ]
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```

#### 5.2 Configure Email Notifications

**Using GitHub Actions email action:**

Add step to workflow:

```yaml
- name: Send email notification on failure
  if: failure()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.MAIL_USERNAME }}
    password: ${{ secrets.MAIL_PASSWORD }}
    subject: Test Failure - Cart Icon Feature
    to: qa-team@example.com
    from: GitHub Actions
    body: |
      Test execution failed for Cart Icon feature.
      
      Workflow: ${{ github.workflow }}
      Browser: ${{ matrix.browser }}
      Branch: ${{ github.ref_name }}
      
      View details: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

#### 5.3 Configure Teams Notifications

**Create Teams webhook:**

1. Go to Teams channel
2. Connectors → Incoming Webhook
3. Configure webhook
4. Copy webhook URL

**Add to GitHub secrets:**

```
Name: TEAMS_WEBHOOK_URL
Value: https://outlook.office.com/webhook/...
```

**Add Teams notification step:**

```yaml
- name: Send Teams notification
  if: always()
  uses: jdcargile/ms-teams-notification@v1.3
  with:
    github-token: ${{ github.token }}
    ms-teams-webhook-uri: ${{ secrets.TEAMS_WEBHOOK_URL }}
    notification-summary: "Test Execution: ${{ job.status }}"
    notification-color: ${{ job.status == 'success' && '28a745' || 'dc3545' }}
    timezone: America/New_York
```

#### 5.4 Create Test Failure Issue Automatically

Add step to create GitHub issue on test failure:

```yaml
- name: Create issue on test failure
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      const fs = require('fs');
      
      // Read test report
      let failureDetails = 'See workflow logs for details.';
      if (fs.existsSync('test-automation/reports/test-report.json')) {
        const report = JSON.parse(fs.readFileSync('test-automation/reports/test-report.json'));
        // Extract failure details
        failureDetails = report.failures?.map(f => `- ${f.name}: ${f.error}`).join('\n') || failureDetails;
      }
      
      await github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: `Test Failure: Cart Icon - ${new Date().toDateString()}`,
        body: `## Automated Test Failure Report 🚨\n\n**Workflow**: ${context.workflow}\n**Browser**: ${{ matrix.browser }}\n**Branch**: ${context.ref}\n**Run ID**: ${context.runId}\n\n### Failure Details\n${failureDetails}\n\n### Actions\n- [ ] Investigate failure\n- [ ] Fix issue\n- [ ] Re-run tests\n\n[View Workflow Run](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})`,
        labels: ['test-failure', 'bug', 'automated', 'cart-feature'],
        assignees: ['qa-lead']  // Assign to QA lead
      });
```

---

### **STEP 6: Analyze Test Results and Generate Report** (30 minutes)

#### 6.1 Review Test Execution Summary

Create `docs/testing/phase3-execution-report.md`:

**Prompt 9: Generate Phase 3 Execution Report**
```
Generate a comprehensive Phase 3 execution report.

Include:
1. **Executive Summary**
   - Test execution overview
   - Total scenarios executed
   - Pass/Fail statistics
   - Critical findings

2. **CI/CD Integration Status**
   - GitHub Actions workflows configured
   - Azure Playwright workspace setup
   - Automated triggers enabled

3. **Test Execution Results**
   - Smoke tests results
   - Regression tests results
   - Multi-browser results
   - Azure cloud execution results

4. **Test Coverage Achieved**
   - Features tested
   - Scenarios automated
   - Coverage percentage

5. **Performance Metrics**
   - Average execution time
   - Fastest/slowest scenarios
   - Resource utilization

6. **Issues Found**
   - Bugs discovered during testing
   - Test failures analysis
   - Flaky tests identified

7. **Infrastructure Setup**
   - GitHub Actions configuration
   - Azure Playwright workspace
   - Notification channels

8. **Recommendations**
   - Areas for improvement
   - Additional test scenarios
   - Performance optimization

9. **Next Steps**
   - Continuous improvement
   - Test maintenance
   - Expansion to other features

Generate a professional report with metrics and insights.
```

#### 6.2 Validate Cart Feature in Azure

**Execute comprehensive validation:**

1. **Trigger Azure Playwright workflow:**
   ```bash
   gh workflow run azure-playwright-tests.yml
   ```

2. **Monitor execution in Azure Portal:**
   - Go to Azure Portal
   - Navigate to Playwright Testing workspace
   - View test runs
   - Check execution logs
   - Review screenshots/videos

3. **Analyze results:**
   - Total tests executed
   - Pass rate
   - Failure analysis
   - Performance metrics

#### 6.3 Generate Final Test Report

**Prompt 10: Generate Final Validation Report**
```
Create a final validation report for the Cart Icon feature.

Document:
1. **Feature Validation Summary**
   - All functional requirements validated
   - All non-functional requirements validated
   - Edge cases covered

2. **Test Environment**
   - Local execution results
   - CI/CD pipeline results
   - Azure cloud execution results

3. **Quality Metrics**
   - Defect density
   - Test coverage
   - Code quality
   - Performance benchmarks

4. **Sign-off Recommendation**
   - Ready for production: Yes/No
   - Blockers: None / List
   - Conditions: None / List

5. **Lessons Learned**
   - What worked well
   - Challenges faced
   - Improvements for next iteration

Create a sign-off ready document.
```

---

## 📊 **DELIVERABLES**

At the end of Phase 3, you should have:

### **CI/CD Infrastructure**
- ✅ GitHub Actions workflows configured:
  - `test-execution.yml` (on push/PR)
  - `nightly-tests.yml` (scheduled)
  - `pr-validation.yml` (PR checks)
  - `azure-playwright-tests.yml` (cloud execution)
- ✅ Azure Playwright Testing workspace created
- ✅ GitHub repository secrets configured
- ✅ Service connections established

### **Test Execution Results**
- ✅ Local test execution successful (100+ scenarios)
- ✅ CI/CD pipeline execution successful
- ✅ Azure Playwright execution successful
- ✅ Multi-browser validation complete
- ✅ Test reports generated (HTML, JSON)
- ✅ Screenshots captured for failures

### **Monitoring & Notifications**
- ✅ Slack notifications configured
- ✅ Email notifications configured
- ✅ Teams notifications configured (optional)
- ✅ Auto-issue creation on failures
- ✅ Test summary in PR comments

### **Documentation**
- ✅ `test-automation/README.md` (comprehensive guide)
- ✅ `docs/testing/phase3-execution-report.md`
- ✅ `docs/testing/azure-playwright-setup-guide.md`
- ✅ `docs/testing/cicd-pipeline-documentation.md`
- ✅ Final validation report

### **Artifacts**
- ✅ Test reports (HTML, JSON) in GitHub artifacts
- ✅ Screenshots of failures
- ✅ Test execution logs
- ✅ Performance metrics
- ✅ Coverage reports

---

## ✅ **SUCCESS CRITERIA**

**Phase 3 is complete when:**
- [ ] All test scripts pushed to GitHub repository
- [ ] GitHub Actions workflows created and working
- [ ] Azure Playwright Testing workspace configured
- [ ] Tests execute successfully in CI/CD pipeline
- [ ] Tests execute successfully in Azure cloud
- [ ] Multi-browser testing validated
- [ ] Test reports generated and accessible
- [ ] Notifications configured and working
- [ ] Scheduled tests running automatically
- [ ] PR validation blocking merge on failures
- [ ] Test results reviewed and documented
- [ ] Cart Icon feature validated in all environments
- [ ] Final sign-off report completed

---

## 🎓 **KEY TAKEAWAYS**

By completing Phase 3, you have learned:
1. ✅ How to push test automation code to GitHub repository
2. ✅ How to create **GitHub Actions workflows** for CI/CD
3. ✅ How to configure **Azure Playwright Testing** workspace
4. ✅ How to execute tests in **Azure cloud environment**
5. ✅ How to integrate test execution with pull request workflows
6. ✅ How to generate and publish test reports as artifacts
7. ✅ How to configure **notifications** (Slack, Email, Teams)
8. ✅ How to setup **scheduled test runs** (nightly, weekly)
9. ✅ How to monitor test execution and analyze failures
10. ✅ How to create comprehensive test execution reports
11. ✅ How to validate features in production-like environments
12. ✅ How to implement continuous testing in DevOps pipeline

---

## 🎉 **WORKSHOP 2 COMPLETION**

**Congratulations!** You have successfully completed **Workshop 2: Testing Persona – Requirement to Test**.

### **Journey Summary**

**Phase 1: Test Scenario Generation**
- ✅ Used Foundry Agent to analyze requirements
- ✅ Generated 100+ comprehensive test scenarios
- ✅ Created master test plan with coverage matrix
- ✅ Pushed 30+ test stories to GitHub Issues

**Phase 2: Automation Scripting**
- ✅ Setup Selenium + Behave (BDD) framework
- ✅ Configured GitHub Copilot Custom Agent with MCP
- ✅ Created 5+ Gherkin feature files
- ✅ Implemented Page Object Model pattern
- ✅ Generated 50+ step definitions in Python
- ✅ Executed tests locally across multiple browsers

**Phase 3: CI/CD Integration**
- ✅ Pushed test scripts to GitHub repository
- ✅ Created GitHub Actions workflows for automation
- ✅ Configured Azure Playwright Testing workspace
- ✅ Executed tests in Azure cloud environment
- ✅ Setup monitoring and notifications
- ✅ Generated comprehensive test reports
- ✅ Validated Cart Icon feature end-to-end

### **Skills Acquired**
- AI-powered test scenario generation
- BDD test automation with Behave/Cucumber
- Page Object Model implementation
- CI/CD pipeline configuration
- Cloud-based test execution (Azure)
- Test reporting and analytics
- DevOps testing practices
- GitHub Actions expertise

### **Next Steps**
- Apply these skills to other features
- Expand test coverage to entire application
- Integrate with other testing tools (Postman, JMeter)
- Implement visual regression testing
- Setup performance testing pipelines
- Contribute to open-source testing frameworks

---

## 📚 **ADDITIONAL RESOURCES**

### **GitHub Actions**
- GitHub Actions Documentation: https://docs.github.com/en/actions
- Workflow Syntax: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
- Marketplace: https://github.com/marketplace?type=actions

### **Azure Playwright Testing**
- Azure Playwright Testing Docs: https://learn.microsoft.com/en-us/azure/playwright-testing/
- Playwright Documentation: https://playwright.dev/
- Azure DevOps Integration: https://learn.microsoft.com/en-us/azure/devops/

### **CI/CD Best Practices**
- Continuous Testing: https://www.atlassian.com/continuous-delivery/continuous-testing
- Test Automation Pyramid: https://martinfowler.com/articles/practical-test-pyramid.html
- DevOps Testing: https://www.devops.com/testing-in-devops/

### **Testing Tools**
- Behave Framework: https://behave.readthedocs.io/
- Selenium: https://www.selenium.dev/
- GitHub CLI: https://cli.github.com/
- Azure CLI: https://learn.microsoft.com/en-us/cli/azure/

---

## 📞 **SUPPORT**

If you encounter issues during Phase 3:
1. Check GitHub Actions logs for detailed errors
2. Verify Azure Playwright workspace configuration
3. Ensure GitHub secrets are correctly set
4. Review workflow YAML syntax
5. Check application is accessible from Azure
6. Verify browser drivers are compatible
7. Review Azure Playwright service status
8. Check network connectivity and firewall rules

---

## 🏆 **ACHIEVEMENT UNLOCKED**

**Testing Automation Expert** 🎭

You have successfully:
- Generated AI-powered test scenarios
- Automated tests with BDD framework
- Integrated tests into CI/CD pipeline
- Validated features in cloud environment
- Established continuous testing practices

**Impact**:
- 100+ test scenarios automated
- Sub-10-minute feedback loop
- 24/7 automated test execution
- Production-ready test infrastructure
- Full Cart Icon feature validation

---

**END OF PHASE 3**

**END OF WORKSHOP 2**

---

*Workshop 2: Testing Persona – Phase 3*  
*Last Updated: [Current Date]*  
*Version: 1.0*