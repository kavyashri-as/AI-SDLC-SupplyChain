# Workshop 2: Testing Persona – Phase 2
## Automation Scripting with BDD Framework

---

## 📋 **OVERVIEW**

**Workshop**: Testing Persona – Requirement to Test  
**Phase**: 2 of 3 (Automation Scripting)  

### **Scenario**
You are a **QA Automation Engineer** working on the **OctoCAT Supply Chain Management** system. In Phase 1, you generated 100+ comprehensive test scenarios for the Cart Icon feature. 

Now, you will:
1. Use **GitHub Copilot Custom Agent** to convert test scenarios into automated Selenium scripts in Python
2. Implement **BDD (Behavior-Driven Development)** approach using **Behave** framework (Python's Cucumber equivalent)
3. Create reusable page objects following best practices
4. Organize test scripts in a structured test suite
5. Prepare scripts for CI/CD integration (Phase 3)

### **Learning Objectives**
By completing Phase 2, you will learn to:
- ✅ Use GitHub Copilot Custom Agent to generate Selenium test scripts
- ✅ Implement BDD with Behave framework (Cucumber for Python)
- ✅ Create Gherkin feature files from test scenarios
- ✅ Implement Page Object Model (POM) pattern
- ✅ Generate step definitions using AI agents
- ✅ Configure Selenium WebDriver for multiple browsers
- ✅ Create reusable test utilities and fixtures
- ✅ Organize test suite with proper structure
- ✅ Configure MCP for Copilot Custom Agent integration

---

## 🎯 **PREREQUISITES**

### **Required Tools**
- ✅ Visual Studio Code with GitHub Copilot extension
- ✅ GitHub Copilot Chat with Custom Agent support
- ✅ GitHub MCP (Model Context Protocol) configured
- ✅ Python 3.9+ installed
- ✅ pip (Python package manager)
- ✅ Git installed and configured
- ✅ Chrome, Firefox, or Edge browser installed

### **Completion Requirements**
- ✅ **Workshop 2 Phase 1 completed**: Test scenarios generated and pushed to GitHub Issues
- ✅ **Documentation from Phase 1**:
  - `docs/testing/phase1-scenarios/*.md` (all test scenario files)
  - `docs/testing/cart-icon-master-test-plan.md`
  - 30+ GitHub Issues with test scenarios

### **Application Under Test**
- ✅ **Frontend**: http://localhost:5173 (running)
- ✅ **API**: http://localhost:3000 (running)
- ✅ **Cart Icon Feature**: Implemented in Workshop 1

---

## ⏱️ **Estimated Time**: 3.5 - 4 hours

---

## 🔗 **Continuation from Phase 1**

This exercise builds directly on Phase 1. You will:
- Take the test scenarios generated in Phase 1
- Convert them into Gherkin feature files
- Use GitHub Copilot to generate Selenium scripts in Python
- Implement BDD with Behave framework
- Create Page Object Model for maintainability

---

## 🚀 **PHASE 2: AUTOMATION SCRIPTING**

---

### **STEP 1: Setup Test Automation Framework** (30 minutes)

#### 1.1 Create Test Automation Directory Structure

Navigate to the workshop repository and create test automation structure:

```bash
cd ai-sdlc-brownfield-workshop
mkdir -p test-automation
cd test-automation
```

Create the following directory structure:

```bash
mkdir -p features
mkdir -p features/steps
mkdir -p pages
mkdir -p utils
mkdir -p config
mkdir -p reports
mkdir -p drivers
```

**Final structure:**
```
test-automation/
├── features/                  # Gherkin feature files
│   ├── cart_icon.feature
│   ├── cart_operations.feature
│   ├── cart_persistence.feature
│   └── steps/                 # Step definitions
│       ├── cart_icon_steps.py
│       ├── cart_operations_steps.py
│       └── common_steps.py
├── pages/                     # Page Object Model
│   ├── base_page.py
│   ├── home_page.py
│   ├── products_page.py
│   ├── cart_page.py
│   └── header_component.py
├── utils/                     # Utility functions
│   ├── driver_factory.py
│   ├── wait_helpers.py
│   └── test_data_helpers.py
├── config/                    # Configuration files
│   ├── config.py
│   └── test_config.json
├── reports/                   # Test reports (generated)
├── drivers/                   # Browser drivers
├── requirements.txt           # Python dependencies
├── behave.ini                 # Behave configuration
└── README.md                  # Test automation documentation
```

#### 1.2 Install Python Dependencies

Create `requirements.txt`:

```bash
touch requirements.txt
```

**Prompt 1: Generate requirements.txt**
```
Generate a requirements.txt file for a Selenium + Behave (BDD) test automation framework.

Include:
1. **Selenium WebDriver** (latest version)
2. **Behave** (BDD framework - Python's Cucumber)
3. **WebDriver Manager** (automatic driver management)
4. **pytest** (for assertions and utilities)
5. **allure-behave** (for test reporting)
6. **python-dotenv** (for environment variables)
7. **faker** (for test data generation)
8. **requests** (for API testing utilities)

Specify versions for stability.
```

**Expected output for requirements.txt:**
```txt
# Selenium and WebDriver
selenium==4.15.2
webdriver-manager==4.0.1

# BDD Framework
behave==1.2.6

# Testing Utilities
pytest==7.4.3
pytest-html==4.1.1

# Reporting
allure-behave==2.13.2

# Environment and Configuration
python-dotenv==1.0.0

# Test Data Generation
faker==20.1.0

# API Testing Support
requests==2.31.0

# Assertions
assertpy==1.1
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed selenium-4.15.2 behave-1.2.6 ...
```

#### 1.3 Configure Behave Framework

Create `behave.ini`:

```bash
touch behave.ini
```

**Prompt 2: Generate behave.ini Configuration**
```
Generate a behave.ini configuration file for the test automation framework.

Include:
1. **Default format**: pretty (readable output)
2. **Additional formats**: json, html
3. **Output directory**: reports/
4. **Logging configuration**
5. **Browser configuration** (support Chrome, Firefox, Edge)
6. **Tags configuration** (for selective test execution)
7. **Screenshots on failure**

Create a production-ready configuration.
```

**Expected output for behave.ini:**
```ini
[behave]
# Output formats
format = pretty
outfiles = reports/behave-report.txt
stdout_capture = false
stderr_capture = false
log_capture = false

# JSON report for CI/CD
json.pretty = true
json_file = reports/behave-report.json

# HTML report
html_report = reports/behave-report.html

# Screenshots
screenshots_on_failure = true
screenshots_dir = reports/screenshots

# Logging
logging_level = INFO
logging_format = %(asctime)s - %(name)s - %(levelname)s - %(message)s

# Default tags
default_tags = ~@skip ~@wip

# Browser configuration (can be overridden by command line)
browser = chrome
headless = false

# Base URL
base_url = http://localhost:5173
api_url = http://localhost:3000

# Timeouts (seconds)
implicit_wait = 10
explicit_wait = 30
page_load_timeout = 60

# Color output
color = true

# Stop on first failure (for debugging)
# stop = true
```

#### 1.4 Create Configuration Module

Create `config/config.py`:

**Prompt 3: Generate Configuration Module**
```
Generate a config/config.py file for the test automation framework.

Include:
1. **Browser configuration** (Chrome, Firefox, Edge, Safari)
2. **URL configuration** (base_url, api_url)
3. **Timeout configuration** (implicit, explicit, page_load)
4. **Test data paths**
5. **Screenshot configuration**
6. **Environment variables** (load from .env)
7. **Driver options** (headless, window size, etc.)

Use python-dotenv for environment variables.
Create a Config class with class methods.
```

**Expected output for config/config.py:**
```python
"""
Configuration module for test automation framework.
Loads configuration from behave.ini and environment variables.
"""

import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()


class Config:
    """Test automation configuration."""

    # Project paths
    PROJECT_ROOT = Path(__file__).parent.parent
    FEATURES_DIR = PROJECT_ROOT / "features"
    PAGES_DIR = PROJECT_ROOT / "pages"
    REPORTS_DIR = PROJECT_ROOT / "reports"
    SCREENSHOTS_DIR = REPORTS_DIR / "screenshots"
    DRIVERS_DIR = PROJECT_ROOT / "drivers"

    # Application URLs
    BASE_URL = os.getenv("BASE_URL", "http://localhost:5173")
    API_URL = os.getenv("API_URL", "http://localhost:3000")

    # Browser configuration
    BROWSER = os.getenv("BROWSER", "chrome").lower()
    HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"
    WINDOW_WIDTH = int(os.getenv("WINDOW_WIDTH", "1920"))
    WINDOW_HEIGHT = int(os.getenv("WINDOW_HEIGHT", "1080"))

    # Timeout configuration (in seconds)
    IMPLICIT_WAIT = int(os.getenv("IMPLICIT_WAIT", "10"))
    EXPLICIT_WAIT = int(os.getenv("EXPLICIT_WAIT", "30"))
    PAGE_LOAD_TIMEOUT = int(os.getenv("PAGE_LOAD_TIMEOUT", "60"))

    # Screenshot configuration
    SCREENSHOT_ON_FAILURE = os.getenv("SCREENSHOT_ON_FAILURE", "true").lower() == "true"
    SCREENSHOT_FORMAT = os.getenv("SCREENSHOT_FORMAT", "png")

    # Test data
    TEST_DATA_DIR = PROJECT_ROOT / "test_data"

    # Logging
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

    @classmethod
    def get_browser_options(cls, browser_name=None):
        """Get browser-specific options."""
        browser = browser_name or cls.BROWSER

        if browser == "chrome":
            from selenium.webdriver.chrome.options import Options
            options = Options()
            if cls.HEADLESS:
                options.add_argument("--headless=new")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--disable-gpu")
            options.add_argument(f"--window-size={cls.WINDOW_WIDTH},{cls.WINDOW_HEIGHT}")
            return options

        elif browser == "firefox":
            from selenium.webdriver.firefox.options import Options
            options = Options()
            if cls.HEADLESS:
                options.add_argument("--headless")
            options.add_argument(f"--width={cls.WINDOW_WIDTH}")
            options.add_argument(f"--height={cls.WINDOW_HEIGHT}")
            return options

        elif browser == "edge":
            from selenium.webdriver.edge.options import Options
            options = Options()
            if cls.HEADLESS:
                options.add_argument("--headless=new")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument(f"--window-size={cls.WINDOW_WIDTH},{cls.WINDOW_HEIGHT}")
            return options

        else:
            raise ValueError(f"Unsupported browser: {browser}")

    @classmethod
    def ensure_directories(cls):
        """Create necessary directories if they don't exist."""
        cls.REPORTS_DIR.mkdir(exist_ok=True)
        cls.SCREENSHOTS_DIR.mkdir(exist_ok=True)
        cls.TEST_DATA_DIR.mkdir(exist_ok=True)


# Create directories on import
Config.ensure_directories()
```

---

### **STEP 2: Configure GitHub Copilot Custom Agent with MCP** (25 minutes)

#### 2.1 Understanding GitHub Copilot Custom Agent

GitHub Copilot Custom Agent allows you to:
- Create domain-specific AI agents
- Generate code following specific patterns and frameworks
- Access custom knowledge bases
- Automate repetitive coding tasks

#### 2.2 Configure MCP (Model Context Protocol) for Custom Agent

**MCP** enables Copilot to access external context and tools.

**Create MCP Configuration File:**

Create `.vscode/mcp-config.json` in your project root:

```bash
cd ..  # Back to project root
mkdir -p .vscode
touch .vscode/mcp-config.json
```

**Prompt 4: Generate MCP Configuration for Testing Agent**
```
Generate an MCP configuration file for GitHub Copilot Custom Agent focused on test automation.

The agent should:
1. Have access to test scenario files (docs/testing/phase1-scenarios/)
2. Understand Selenium WebDriver patterns
3. Know Behave/BDD framework syntax
4. Follow Page Object Model pattern
5. Generate Python code with type hints
6. Include proper error handling
7. Follow PEP 8 style guide

Create .vscode/mcp-config.json configuration.
```

**Expected output for .vscode/mcp-config.json:**
```json
{
  "mcpServers": {
    "test-automation-agent": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": [
          "docs/testing",
          "test-automation"
        ]
      }
    }
  },
  "customInstructions": {
    "test-automation": {
      "role": "You are an expert QA Automation Engineer specializing in Selenium WebDriver with Python and BDD frameworks.",
      "context": [
        "Generate Selenium test scripts using Python",
        "Follow BDD with Behave framework (Gherkin syntax)",
        "Implement Page Object Model (POM) pattern",
        "Use explicit waits over implicit waits when possible",
        "Include proper error handling and logging",
        "Follow PEP 8 style guide",
        "Add type hints to all functions",
        "Create reusable utility functions",
        "Generate clear, maintainable code"
      ],
      "framework": "behave",
      "language": "python",
      "patterns": [
        "Page Object Model",
        "Page Factory",
        "Explicit Waits",
        "Fluent Interface"
      ],
      "knowledgeBase": [
        "docs/testing/phase1-scenarios/*.md",
        "docs/testing/cart-icon-master-test-plan.md"
      ]
    }
  }
}
```

#### 2.3 Configure VS Code Settings for Custom Agent

Add to `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "python": true,
    "gherkin": true
  },
  "github.copilot.advanced": {
    "customAgents": {
      "testAutomation": {
        "enabled": true,
        "description": "Test automation agent for Selenium + Behave",
        "prompt": "Generate Selenium test automation code using Python and Behave framework. Follow Page Object Model pattern and BDD best practices.",
        "context": [
          "docs/testing/**",
          "test-automation/**"
        ]
      }
    }
  },
  "python.analysis.typeCheckingMode": "basic",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[feature]": {
    "editor.defaultFormatter": "alexkrechik.cucumberautocomplete"
  }
}
```

#### 2.4 Create Custom Agent Instructions

Create `test-automation/.github-copilot-instructions.md`:

```markdown
# GitHub Copilot Instructions for Test Automation

## Context
You are generating test automation code for the OctoCAT Supply Chain Management system's Cart Icon feature.

## Framework & Tools
- **Language**: Python 3.9+
- **BDD Framework**: Behave (Python's Cucumber)
- **Automation Tool**: Selenium WebDriver
- **Pattern**: Page Object Model (POM)

## Code Generation Rules

### 1. Gherkin Feature Files
- Use Given-When-Then syntax
- Write clear, business-readable scenarios
- Use Scenario Outline for data-driven tests
- Include @tags for test organization

### 2. Step Definitions
- Use decorators: @given, @when, @then, @step
- Access context.browser for WebDriver
- Access context.pages for page objects
- Use explicit waits from utils/wait_helpers.py
- Include assertions using assertpy

### 3. Page Objects
- Inherit from BasePage
- Define locators as class attributes (By.CSS_SELECTOR, By.XPATH)
- Create methods for user actions (not technical steps)
- Return self for method chaining
- Use explicit waits for element interactions

### 4. Code Style
- Follow PEP 8
- Use type hints
- Add docstrings to all classes and methods
- Use descriptive variable names
- Keep functions under 20 lines

### 5. Error Handling
- Use try-except for WebDriver operations
- Log errors with context.logger
- Take screenshots on failures
- Provide helpful error messages

## Example Code Structure

### Feature File
```gherkin
Feature: Cart Icon Functionality
  As a user
  I want to see a cart icon with item count
  So that I can track items in my cart

  @smoke @cart-icon
  Scenario: Cart icon displays in header
    Given I am on the home page
    When the page loads
    Then I should see the cart icon in the header
```

### Step Definition
```python
from behave import given, when, then
from assertpy import assert_that

@given("I am on the home page")
def step_impl(context):
    context.pages['home'].navigate()

@then("I should see the cart icon in the header")
def step_impl(context):
    header = context.pages['header']
    assert_that(header.is_cart_icon_visible()).is_true()
```

### Page Object
```python
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class HeaderComponent(BasePage):
    CART_ICON = (By.CSS_SELECTOR, "a[href='/cart']")
    CART_BADGE = (By.CSS_SELECTOR, ".cart-badge")
    
    def is_cart_icon_visible(self) -> bool:
        return self.is_element_visible(self.CART_ICON)
    
    def get_cart_count(self) -> int:
        badge_text = self.get_element_text(self.CART_BADGE)
        return int(badge_text) if badge_text else 0
```

Generate code following these patterns and conventions.
```

---

### **STEP 3: Create Base Page and Utilities** (30 minutes)

#### 3.1 Create Driver Factory

Create `utils/driver_factory.py`:

**Prompt 5: Generate Driver Factory**
```
@workspace Generate a utils/driver_factory.py file for managing Selenium WebDriver instances.

Include:
1. **DriverFactory class** with get_driver() method
2. **Support for multiple browsers**: Chrome, Firefox, Edge
3. **Use webdriver_manager** for automatic driver installation
4. **Apply browser options** from config.Config
5. **Set implicit wait, page load timeout**
6. **Maximize window or set size**
7. **Quit driver method**

Use Selenium 4.x syntax.
Include type hints and docstrings.
```

**Expected key methods:**
```python
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.edge.service import Service as EdgeService
from config.config import Config
from typing import Optional


class DriverFactory:
    """Factory class for creating and managing WebDriver instances."""

    _driver: Optional[webdriver.Remote] = None

    @classmethod
    def get_driver(cls, browser: str = None) -> webdriver.Remote:
        """Get WebDriver instance."""
        if cls._driver is not None:
            return cls._driver

        browser = browser or Config.BROWSER
        # ... implementation

    @classmethod
    def quit_driver(cls):
        """Quit the WebDriver instance."""
        # ... implementation
```

#### 3.2 Create Wait Helpers

Create `utils/wait_helpers.py`:

**Prompt 6: Generate Wait Helpers**
```
Generate utils/wait_helpers.py with reusable wait utilities for Selenium.

Include:
1. **wait_for_element_visible(driver, locator, timeout)**
2. **wait_for_element_clickable(driver, locator, timeout)**
3. **wait_for_element_invisible(driver, locator, timeout)**
4. **wait_for_text_in_element(driver, locator, text, timeout)**
5. **wait_for_url_contains(driver, url_part, timeout)**
6. **wait_for_page_load(driver, timeout)**
7. **wait_for_ajax_complete(driver, timeout)**

Use Selenium's WebDriverWait and expected_conditions.
Include type hints and docstrings.
Handle TimeoutException with helpful messages.
```

#### 3.3 Create Base Page

Create `pages/base_page.py`:

**Prompt 7: Generate Base Page Object**
```
@workspace Generate pages/base_page.py implementing the Page Object Model pattern.

Include:
1. **Constructor**: accept WebDriver instance
2. **Element interaction methods**:
   - find_element(locator)
   - find_elements(locator)
   - click(locator)
   - type_text(locator, text)
   - get_element_text(locator)
   - is_element_visible(locator)
   - is_element_clickable(locator)
   - wait_for_element(locator, timeout)
3. **Navigation methods**:
   - navigate_to(url)
   - get_current_url()
   - get_page_title()
4. **JavaScript execution**:
   - execute_script(script)
   - scroll_to_element(locator)
5. **Screenshot method**
6. **Wait utilities integration**

Use explicit waits.
Include error handling.
Add type hints and docstrings.
```

**Expected Base Page structure:**
```python
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from typing import Tuple, List, Optional
from config.config import Config
import logging


class BasePage:
    """Base page object that all page objects inherit from."""

    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(driver, Config.EXPLICIT_WAIT)
        self.logger = logging.getLogger(self.__class__.__name__)

    def find_element(self, locator: Tuple[str, str]) -> WebElement:
        """Find a single element."""
        try:
            return self.wait.until(EC.presence_of_element_located(locator))
        except TimeoutException:
            self.logger.error(f"Element not found: {locator}")
            raise

    # ... more methods
```

---

### **STEP 4: Convert Test Scenarios to Gherkin Feature Files** (45 minutes)

#### 4.1 Create Feature File for Cart Icon Visibility

Create `features/cart_icon_visibility.feature`:

**Prompt 8: Generate Cart Icon Visibility Feature File**
```
@workspace Generate a Gherkin feature file for Cart Icon Visibility test scenarios.

Based on test scenarios from:
- docs/testing/phase1-scenarios/functional-test-scenarios.md
- Focus on scenarios: TS-CART-001 to TS-CART-010 (cart icon visibility and badge display)

Include:
1. **Feature description** with user story
2. **Background** (common setup steps)
3. **Scenarios** for:
   - Cart icon visible in header on all pages
   - Cart icon visible on home page
   - Cart icon visible on products page
   - Cart icon visible on cart page
   - Badge hidden when cart is empty
   - Badge shows correct count
   - Badge updates when items added
4. **Scenario Outline** for testing different item counts
5. **Tags**: @smoke, @cart-icon, @functional

Use proper Gherkin syntax (Given-When-Then).
Make scenarios business-readable.
```

**Expected output for features/cart_icon_visibility.feature:**
```gherkin
@cart-icon @functional
Feature: Cart Icon Visibility and Badge Display
  As a user of the OctoCAT Supply Chain system
  I want to see a cart icon with item count in the header
  So that I can track how many items I've added to my cart

  Background:
    Given the application is running
    And I clear the cart from local storage

  @smoke @critical
  Scenario: Cart icon is visible in the header on home page
    Given I am on the home page
    Then I should see the cart icon in the header
    And the cart icon should be clickable

  @smoke @critical
  Scenario: Cart icon is visible on all pages
    Given I am on the home page
    Then I should see the cart icon in the header
    When I navigate to the products page
    Then I should see the cart icon in the header
    When I navigate to the cart page
    Then I should see the cart icon in the header

  @critical
  Scenario: Cart badge is hidden when cart is empty
    Given I am on the products page
    And the cart is empty
    Then I should see the cart icon in the header
    And the cart badge should not be visible

  @critical
  Scenario: Cart badge appears when first item is added
    Given I am on the products page
    And the cart is empty
    When I add an item to the cart
    Then the cart badge should be visible
    And the cart badge should show "1"

  @high
  Scenario: Cart badge shows correct item count
    Given I am on the products page
    And the cart is empty
    When I add 3 items to the cart
    Then the cart badge should show "3"

  @high
  Scenario: Cart badge updates when items are added
    Given I am on the products page
    And the cart has 2 items
    When I add 1 item to the cart
    Then the cart badge should show "3"

  @medium
  Scenario Outline: Cart badge displays different item counts correctly
    Given I am on the products page
    And the cart is empty
    When I add <count> items to the cart
    Then the cart badge should show "<expected_count>"

    Examples:
      | count | expected_count |
      | 1     | 1              |
      | 5     | 5              |
      | 10    | 10             |
      | 99    | 99             |
      | 100   | 99+            |

  @high
  Scenario: Cart badge updates when item is removed
    Given I am on the products page
    And the cart has 3 items
    When I remove 1 item from the cart
    Then the cart badge should show "2"

  @high
  Scenario: Cart badge disappears when cart is cleared
    Given I am on the products page
    And the cart has 5 items
    When I clear the cart
    Then the cart badge should not be visible
```

#### 4.2 Create Feature File for Cart Operations

Create `features/cart_operations.feature`:

**Prompt 9: Generate Cart Operations Feature File**
```
Generate a Gherkin feature file for Cart Operations test scenarios.

Based on scenarios: TS-CART-011 to TS-CART-020 (cart operations)

Include scenarios for:
1. Add single item to cart
2. Add multiple different items
3. Add same item multiple times
4. Remove item from cart
5. Update item quantity
6. Clear entire cart
7. Cart icon click navigation
8. Toast notifications

Use Scenario Outline for data-driven tests where appropriate.
Tags: @cart-operations, @functional
```

**Expected structure (partial):**
```gherkin
@cart-operations @functional
Feature: Cart Operations
  As a user
  I want to manage items in my cart
  So that I can purchase the products I want

  Background:
    Given the application is running
    And I clear the cart from local storage
    And I am on the products page

  @critical
  Scenario: Add single item to cart
    Given the cart is empty
    When I click the "Add to Cart" button for product "Cat Treats"
    Then the cart badge should show "1"
    And I should see a success toast notification
    And the toast should contain "Added to cart"

  @high
  Scenario: Add multiple different items to cart
    Given the cart is empty
    When I add the following items to the cart:
      | Product Name       |
      | Cat Treats        |
      | Cat Toy           |
      | Cat Food          |
    Then the cart badge should show "3"
    And I should see 3 success toast notifications

  @critical
  Scenario: Cart icon click navigates to cart page
    Given the cart has 2 items
    When I click on the cart icon
    Then I should be redirected to the cart page
    And the URL should contain "/cart"
    And I should see 2 items in the cart

  # ... more scenarios
```

#### 4.3 Create Feature File for Cart Persistence

Create `features/cart_persistence.feature`:

**Prompt 10: Generate Cart Persistence Feature File**
```
Generate a Gherkin feature file for Cart Persistence test scenarios.

Based on scenarios: TS-CART-021 to TS-CART-030 (localStorage persistence)

Include scenarios for:
1. Cart persists after page refresh
2. Cart persists after browser back/forward
3. Cart persists after navigating between pages
4. Cart loads from localStorage on app start
5. Empty cart saved to localStorage
6. Multiple tabs share same cart
7. localStorage disabled handling

Tags: @cart-persistence, @integration
```

#### 4.4 Create Feature File for Accessibility

Create `features/cart_accessibility.feature`:

**Prompt 11: Generate Cart Accessibility Feature File**
```
Generate a Gherkin feature file for Cart Accessibility test scenarios.

Based on scenarios: TS-CART-A11Y-001 to TS-CART-A11Y-010

Include scenarios for:
1. Keyboard navigation to cart icon
2. Cart icon has ARIA labels
3. Badge has accessible text
4. Focus visible on cart icon
5. Screen reader announcements (test manually noted)
6. Color contrast verification

Tags: @accessibility, @a11y, @wcag
```

#### 4.5 Create Feature File for Edge Cases

Create `features/cart_edge_cases.feature`:

**Prompt 12: Generate Cart Edge Cases Feature File**
```
Generate a Gherkin feature file for Cart Edge Cases test scenarios.

Based on scenarios: TS-CART-EDGE-001 to TS-CART-EDGE-010

Include scenarios for:
1. Cart with 0 items (boundary)
2. Cart with 100+ items (badge limit)
3. Rapid cart updates (spam clicking)
4. Invalid product addition
5. localStorage quota exceeded
6. Concurrent updates from multiple tabs

Tags: @edge-cases, @boundary, @negative
```

---

### **STEP 5: Generate Page Objects with Copilot Custom Agent** (40 minutes)

#### 5.1 Create Home Page Object

Create `pages/home_page.py`:

**Prompt 13: Generate Home Page Object**
```
#testAutomation

Generate a Page Object for the Home Page of the OctoCAT Supply Chain application.

Context:
- Base URL: http://localhost:5173
- Home page route: "/"
- Elements: Header, Hero section, "Explore Products" button

Requirements:
1. Inherit from BasePage
2. Define locators for:
   - Page title/hero heading
   - "Explore Products" button
   - Header component elements
3. Methods:
   - navigate(): Navigate to home page
   - is_page_loaded(): Check if page loaded
   - click_explore_products(): Click the button
   - get_page_title(): Get hero title text
4. Use CSS selectors for locators
5. Include type hints and docstrings
6. Follow POM pattern from base_page.py

Reference: frontend/src/components/home/Home.tsx for element structure
```

**Expected output structure:**
```python
from selenium.webdriver.common.by import By
from pages.base_page import BasePage
from config.config import Config


class HomePage(BasePage):
    """Page Object for Home Page."""

    # Locators
    HERO_HEADING = (By.CSS_SELECTOR, "h1.hero-heading")
    EXPLORE_BUTTON = (By.CSS_SELECTOR, "button[aria-label='Explore Products'], a[href='/products']")
    HERO_SECTION = (By.CSS_SELECTOR, ".hero-section")

    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{Config.BASE_URL}/"

    def navigate(self) -> 'HomePage':
        """Navigate to the home page."""
        self.navigate_to(self.url)
        return self

    def is_page_loaded(self) -> bool:
        """Check if the home page is loaded."""
        return self.is_element_visible(self.HERO_SECTION)

    def click_explore_products(self) -> None:
        """Click the Explore Products button."""
        self.click(self.EXPLORE_BUTTON)

    def get_hero_title(self) -> str:
        """Get the hero heading text."""
        return self.get_element_text(self.HERO_HEADING)
```

#### 5.2 Create Header Component Page Object

Create `pages/header_component.py`:

**Prompt 14: Generate Header Component Page Object**
```
#testAutomation

Generate a Page Object for the Header Component (navigation bar).

Context:
- Header appears on all pages
- Contains: Logo, Navigation links, Cart Icon with Badge

Requirements:
1. Inherit from BasePage
2. Define locators for:
   - Cart icon (link to /cart)
   - Cart badge (shows item count)
   - Logo
   - Navigation links (Home, Products, etc.)
3. Methods:
   - is_cart_icon_visible(): Check cart icon visibility
   - click_cart_icon(): Click to navigate to cart
   - get_cart_count(): Get badge count as integer
   - is_cart_badge_visible(): Check if badge is displayed
   - get_badge_text(): Get badge text content
   - click_logo(): Navigate to home
   - is_header_visible(): Check header presence
4. Handle badge not visible case (return 0 for count)
5. Use explicit waits for dynamic elements

Reference: frontend/src/components/layout/Header.tsx and CartIcon.tsx
```

**Expected output structure:**
```python
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from pages.base_page import BasePage
from typing import Optional


class HeaderComponent(BasePage):
    """Page Object for Header Component (Navigation Bar)."""

    # Locators
    HEADER = (By.CSS_SELECTOR, "header, nav")
    LOGO = (By.CSS_SELECTOR, "a[href='/']")
    CART_ICON = (By.CSS_SELECTOR, "a[href='/cart'], [data-testid='cart-icon']")
    CART_BADGE = (By.CSS_SELECTOR, ".cart-badge, [data-testid='cart-badge']")
    NAV_PRODUCTS_LINK = (By.CSS_SELECTOR, "a[href='/products']")

    def is_header_visible(self) -> bool:
        """Check if header is visible."""
        return self.is_element_visible(self.HEADER)

    def is_cart_icon_visible(self) -> bool:
        """Check if cart icon is visible."""
        return self.is_element_visible(self.CART_ICON)

    def click_cart_icon(self) -> None:
        """Click the cart icon to navigate to cart page."""
        self.click(self.CART_ICON)

    def is_cart_badge_visible(self) -> bool:
        """Check if cart badge is visible."""
        try:
            return self.is_element_visible(self.CART_BADGE, timeout=2)
        except (NoSuchElementException, TimeoutException):
            return False

    def get_badge_text(self) -> Optional[str]:
        """Get the cart badge text."""
        if not self.is_cart_badge_visible():
            return None
        return self.get_element_text(self.CART_BADGE)

    def get_cart_count(self) -> int:
        """Get cart item count from badge."""
        badge_text = self.get_badge_text()
        if not badge_text:
            return 0
        
        # Handle "99+" case
        if "+" in badge_text:
            return int(badge_text.replace("+", ""))
        
        try:
            return int(badge_text)
        except ValueError:
            self.logger.warning(f"Could not parse badge text: {badge_text}")
            return 0

    def click_logo(self) -> None:
        """Click the logo to navigate to home page."""
        self.click(self.LOGO)
```

#### 5.3 Create Products Page Object

Create `pages/products_page.py`:

**Prompt 15: Generate Products Page Object**
```
#testAutomation

Generate a Page Object for the Products Page.

Context:
- Products page route: "/products"
- Displays grid of product cards
- Each card has: Image, Name, Price, "Add to Cart" button

Requirements:
1. Inherit from BasePage
2. Define locators for:
   - Products grid/container
   - Product cards
   - Product name
   - Product price
   - "Add to Cart" button
   - Toast notification
3. Methods:
   - navigate(): Navigate to products page
   - is_page_loaded(): Check if products loaded
   - get_product_cards(): Get all product card elements
   - get_product_count(): Count total products
   - add_product_to_cart_by_name(product_name): Add specific product
   - add_product_to_cart_by_index(index): Add product by position
   - add_multiple_products(count): Add N products
   - is_toast_visible(): Check toast notification
   - get_toast_message(): Get toast text
   - wait_for_toast(): Wait for toast to appear
4. Use dynamic waits for toast notifications (they appear/disappear)

Reference: frontend/src/components/entity/product/Products.tsx
```

**Expected structure (partial):**
```python
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from pages.base_page import BasePage
from config.config import Config
from typing import List
import time


class ProductsPage(BasePage):
    """Page Object for Products Page."""

    # Locators
    PRODUCTS_CONTAINER = (By.CSS_SELECTOR, ".products-grid, [data-testid='products-grid']")
    PRODUCT_CARD = (By.CSS_SELECTOR, ".product-card, [data-testid='product-card']")
    PRODUCT_NAME = (By.CSS_SELECTOR, ".product-name, h3")
    PRODUCT_PRICE = (By.CSS_SELECTOR, ".product-price, .price")
    ADD_TO_CART_BUTTON = (By.CSS_SELECTOR, "button[aria-label*='Add'], button:contains('Add to Cart')")
    TOAST_NOTIFICATION = (By.CSS_SELECTOR, ".toast, [role='alert'], .Toastify__toast")
    TOAST_MESSAGE = (By.CSS_SELECTOR, ".toast-message, .Toastify__toast-body")

    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{Config.BASE_URL}/products"

    def navigate(self) -> 'ProductsPage':
        """Navigate to the products page."""
        self.navigate_to(self.url)
        self.wait_for_page_load()
        return self

    def is_page_loaded(self) -> bool:
        """Check if products page is loaded."""
        return self.is_element_visible(self.PRODUCTS_CONTAINER)

    def get_product_count(self) -> int:
        """Get the total number of products displayed."""
        return len(self.find_elements(self.PRODUCT_CARD))

    def add_product_to_cart_by_index(self, index: int = 0) -> None:
        """Add a product to cart by its index position."""
        product_cards = self.find_elements(self.PRODUCT_CARD)
        if index < len(product_cards):
            add_button = product_cards[index].find_element(*self.ADD_TO_CART_BUTTON)
            add_button.click()
            time.sleep(0.5)  # Brief wait for state update
        else:
            raise IndexError(f"Product index {index} out of range")

    def add_multiple_products(self, count: int) -> None:
        """Add multiple products to the cart."""
        for i in range(count):
            self.add_product_to_cart_by_index(i)
            time.sleep(0.3)  # Small delay between additions

    def is_toast_visible(self) -> bool:
        """Check if toast notification is visible."""
        try:
            return self.is_element_visible(self.TOAST_NOTIFICATION, timeout=3)
        except TimeoutException:
            return False

    def get_toast_message(self) -> str:
        """Get the toast notification message."""
        if self.is_toast_visible():
            return self.get_element_text(self.TOAST_MESSAGE)
        return ""

    def wait_for_toast(self, timeout: int = 5) -> bool:
        """Wait for toast notification to appear."""
        try:
            self.wait_for_element(self.TOAST_NOTIFICATION, timeout)
            return True
        except TimeoutException:
            return False
```

#### 5.4 Create Cart Page Object

Create `pages/cart_page.py`:

**Prompt 16: Generate Cart Page Object**
```
#testAutomation

Generate a Page Object for the Cart Page.

Context:
- Cart page route: "/cart"
- Displays cart items with: Name, Price, Quantity controls, Remove button
- Shows total price
- Has "Clear Cart" and "Checkout" buttons

Requirements:
1. Inherit from BasePage
2. Define locators for:
   - Cart items container
   - Cart item rows
   - Item name, price, quantity
   - Quantity increase/decrease buttons
   - Remove item button
   - Clear cart button
   - Checkout button
   - Total price
   - Empty cart message
3. Methods:
   - navigate(): Navigate to cart page
   - is_page_loaded(): Check if cart page loaded
   - get_cart_item_count(): Count items in cart
   - is_cart_empty(): Check if cart has no items
   - get_item_names(): Get list of product names
   - remove_item_by_name(name): Remove specific item
   - update_item_quantity(name, quantity): Update quantity
   - click_clear_cart(): Clear all items
   - click_checkout(): Proceed to checkout
   - get_total_price(): Get cart total
4. Handle empty cart state

Reference: frontend/src/components/entity/cart/Cart.tsx
```

---

### **STEP 6: Generate Step Definitions with Copilot** (50 minutes)

#### 6.1 Create Environment Setup (Behave Hooks)

Create `features/environment.py`:

**Prompt 17: Generate Behave Environment File**
```
Generate features/environment.py for Behave hooks and test setup/teardown.

Include:
1. **before_all(context)**: Run once before all features
   - Setup logging
   - Create reports directory
   - Load configuration
2. **before_feature(context, feature)**: Run before each feature
   - Log feature start
3. **before_scenario(context, scenario)**: Run before each scenario
   - Initialize WebDriver
   - Setup page objects dictionary
   - Clear localStorage
   - Set browser size
4. **after_scenario(context, scenario)**: Run after each scenario
   - Take screenshot if failed
   - Clear cookies
   - Quit driver
5. **after_all(context)**: Run once after all features
   - Generate test report summary
   - Close all drivers

Use context object to store:
- context.browser (WebDriver)
- context.pages (dict of page objects)
- context.config (Config instance)
- context.logger (Logger instance)
```

**Expected structure:**
```python
import logging
from datetime import datetime
from selenium.common.exceptions import WebDriverException
from behave import fixture, use_fixture
from utils.driver_factory import DriverFactory
from pages.home_page import HomePage
from pages.products_page import ProductsPage
from pages.cart_page import CartPage
from pages.header_component import HeaderComponent
from config.config import Config


def before_all(context):
    """Setup before all tests."""
    # Setup logging
    logging.basicConfig(
        level=getattr(logging, Config.LOG_LEVEL),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    context.logger = logging.getLogger('BehaveTests')
    context.logger.info("Starting test execution")
    
    # Ensure directories exist
    Config.ensure_directories()
    
    # Store config
    context.config = Config


def before_scenario(context, scenario):
    """Setup before each scenario."""
    context.logger.info(f"Starting scenario: {scenario.name}")
    
    # Initialize WebDriver
    context.browser = DriverFactory.get_driver()
    
    # Initialize page objects
    context.pages = {
        'home': HomePage(context.browser),
        'products': ProductsPage(context.browser),
        'cart': CartPage(context.browser),
        'header': HeaderComponent(context.browser)
    }
    
    # Clear localStorage (cart data)
    context.browser.execute_script("window.localStorage.clear();")


def after_scenario(context, scenario):
    """Cleanup after each scenario."""
    # Take screenshot if scenario failed
    if scenario.status == "failed":
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_name = f"{scenario.name.replace(' ', '_')}_{timestamp}.png"
        screenshot_path = Config.SCREENSHOTS_DIR / screenshot_name
        
        try:
            context.browser.save_screenshot(str(screenshot_path))
            context.logger.info(f"Screenshot saved: {screenshot_path}")
        except WebDriverException as e:
            context.logger.error(f"Failed to take screenshot: {e}")
    
    # Cleanup
    context.logger.info(f"Scenario '{scenario.name}' finished with status: {scenario.status}")
    DriverFactory.quit_driver()


def after_all(context):
    """Cleanup after all tests."""
    context.logger.info("Test execution completed")
    DriverFactory.quit_driver()
```

#### 6.2 Create Common Step Definitions

Create `features/steps/common_steps.py`:

**Prompt 18: Generate Common Step Definitions**
```
#testAutomation

Generate features/steps/common_steps.py with common step definitions.

Include steps for:
1. **Given steps**:
   - "the application is running"
   - "I clear the cart from local storage"
   - "the cart is empty"
   - "the cart has {count} items"
   - "I am on the {page_name} page"

2. **When steps**:
   - "I navigate to the {page_name} page"
   - "the page loads"
   - "I wait for {seconds} seconds"

3. **Then steps**:
   - "I should be on the {page_name} page"
   - "the URL should contain {text}"
   - "the page title should be {title}"

Use:
- @given, @when, @then decorators
- context.browser for WebDriver
- context.pages for page objects
- assertpy for assertions
- Type hints
```

**Expected structure:**
```python
from behave import given, when, then, step
from assertpy import assert_that
import time


@given("the application is running")
def step_impl(context):
    """Verify the application is accessible."""
    context.pages['home'].navigate()
    assert_that(context.pages['home'].is_page_loaded()).is_true()


@given("I clear the cart from local storage")
@step("I clear the cart")
def step_impl(context):
    """Clear cart data from localStorage."""
    context.browser.execute_script("window.localStorage.removeItem('octocat-cart');")


@given("the cart is empty")
def step_impl(context):
    """Ensure the cart is empty."""
    context.browser.execute_script("window.localStorage.setItem('octocat-cart', '[]');")
    context.browser.refresh()
    time.sleep(0.5)


@given('the cart has {count:d} items')
def step_impl(context, count):
    """Setup cart with specified number of items."""
    context.pages['products'].navigate()
    context.pages['products'].add_multiple_products(count)
    time.sleep(0.5)


@given('I am on the {page_name} page')
@when('I navigate to the {page_name} page')
def step_impl(context, page_name):
    """Navigate to specified page."""
    page_name = page_name.lower()
    if page_name in context.pages:
        context.pages[page_name].navigate()
    else:
        raise ValueError(f"Unknown page: {page_name}")


@then('I should be on the {page_name} page')
def step_impl(context, page_name):
    """Verify current page."""
    page_name = page_name.lower()
    current_url = context.browser.current_url
    assert_that(current_url).contains(page_name)


@then('the URL should contain "{text}"')
def step_impl(context, text):
    """Verify URL contains specified text."""
    current_url = context.browser.current_url
    assert_that(current_url).contains(text)
```

#### 6.3 Create Cart Icon Step Definitions

Create `features/steps/cart_icon_steps.py`:

**Prompt 19: Generate Cart Icon Step Definitions**
```
#testAutomation

Generate features/steps/cart_icon_steps.py for cart icon visibility feature.

Based on features/cart_icon_visibility.feature, create step definitions for:

**Then steps**:
1. "I should see the cart icon in the header"
2. "the cart icon should be clickable"
3. "the cart badge should not be visible"
4. "the cart badge should be visible"
5. "the cart badge should show {expected_count}"

**When steps**:
1. "I add an item to the cart"
2. "I add {count} items to the cart"
3. "I remove {count} item(s) from the cart"
4. "I click on the cart icon"

Use:
- context.pages['header'] for HeaderComponent
- context.pages['products'] for adding items
- assertpy for assertions
- Explicit waits for dynamic updates
```

**Expected structure:**
```python
from behave import given, when, then
from assertpy import assert_that
import time


@then("I should see the cart icon in the header")
def step_impl(context):
    """Verify cart icon is visible in header."""
    header = context.pages['header']
    assert_that(header.is_cart_icon_visible()).is_true()


@then("the cart icon should be clickable")
def step_impl(context):
    """Verify cart icon is clickable."""
    header = context.pages['header']
    # Attempt to interact with the element
    try:
        cart_icon = header.find_element(header.CART_ICON)
        assert_that(cart_icon.is_enabled()).is_true()
        assert_that(cart_icon.is_displayed()).is_true()
    except Exception as e:
        raise AssertionError(f"Cart icon is not clickable: {e}")


@then("the cart badge should not be visible")
def step_impl(context):
    """Verify cart badge is not displayed."""
    header = context.pages['header']
    time.sleep(0.5)  # Wait for UI to settle
    assert_that(header.is_cart_badge_visible()).is_false()


@then("the cart badge should be visible")
def step_impl(context):
    """Verify cart badge is displayed."""
    header = context.pages['header']
    time.sleep(0.5)  # Wait for badge to appear
    assert_that(header.is_cart_badge_visible()).is_true()


@then('the cart badge should show "{expected_count}"')
def step_impl(context, expected_count):
    """Verify cart badge shows expected count."""
    header = context.pages['header']
    time.sleep(0.5)  # Wait for update
    
    badge_text = header.get_badge_text()
    assert_that(badge_text).is_equal_to(expected_count)


@when("I add an item to the cart")
@when("I add {count:d} item to the cart")
def step_impl(context, count=1):
    """Add item(s) to the cart from products page."""
    products_page = context.pages['products']
    
    # Ensure we're on products page
    current_url = context.browser.current_url
    if '/products' not in current_url:
        products_page.navigate()
    
    products_page.add_multiple_products(count)
    time.sleep(0.5)  # Wait for state update


@when("I add {count:d} items to the cart")
def step_impl(context, count):
    """Add multiple items to the cart."""
    context.execute_steps(f'When I add {count} item to the cart')


@when("I click on the cart icon")
def step_impl(context):
    """Click the cart icon in the header."""
    header = context.pages['header']
    header.click_cart_icon()
    time.sleep(0.5)
```

#### 6.4 Create Cart Operations Step Definitions

Create `features/steps/cart_operations_steps.py`:

**Prompt 20: Generate Cart Operations Step Definitions**
```
#testAutomation

Generate features/steps/cart_operations_steps.py for cart operations.

Based on features/cart_operations.feature, create step definitions for:

**When steps**:
1. 'I click the "Add to Cart" button for product {product_name}'
2. "I add the following items to the cart" (table)
3. "I remove {count} item from the cart"
4. "I clear the cart"
5. "I update quantity of {product_name} to {quantity}"

**Then steps**:
1. "I should see a success toast notification"
2. "the toast should contain {text}"
3. "I should see {count} success toast notifications"
4. "I should see {count} items in the cart"

Use products_page and cart_page methods.
Handle toast notifications with waits.
```

#### 6.5 Create Cart Persistence Step Definitions

Create `features/steps/cart_persistence_steps.py`:

**Prompt 21: Generate Cart Persistence Step Definitions**
```
#testAutomation

Generate features/steps/cart_persistence_steps.py for cart persistence.

Create step definitions for:

**When steps**:
1. "I refresh the page"
2. "I navigate back"
3. "I navigate forward"
4. "I close and reopen the browser"

**Then steps**:
1. "the cart should still have {count} items"
2. "the cart badge should persist showing {count}"
3. "localStorage should contain cart data"
4. "the cart state should be restored"

Test localStorage persistence by:
- Reading localStorage after operations
- Verifying cart data structure
- Checking cart state after refresh
```

---

### **STEP 7: Run and Validate Test Scripts** (30 minutes)

#### 7.1 Run Individual Feature File

Run cart icon visibility tests:

```bash
cd test-automation
behave features/cart_icon_visibility.feature
```

**Expected output:**
```
Feature: Cart Icon Visibility and Badge Display

  Scenario: Cart icon is visible in the header on home page
    Given the application is running ... passed
    And I clear the cart from local storage ... passed
    Then I should see the cart icon in the header ... passed
    And the cart icon should be clickable ... passed

  Scenario: Cart badge is hidden when cart is empty
    ...

5 scenarios (5 passed)
20 steps (20 passed)
```

#### 7.2 Run Tests with Tags

Run only smoke tests:

```bash
behave --tags=@smoke
```

Run critical tests:

```bash
behave --tags=@critical
```

Run specific feature:

```bash
behave --tags=@cart-icon
```

Exclude tests:

```bash
behave --tags=~@skip --tags=~@wip
```

#### 7.3 Run Tests in Different Browsers

**Chrome (default):**
```bash
behave -D browser=chrome
```

**Firefox:**
```bash
behave -D browser=firefox
```

**Edge:**
```bash
behave -D browser=edge
```

**Headless mode:**
```bash
behave -D headless=true
```

#### 7.4 Generate Test Reports

**HTML Report:**
```bash
behave --format=html --outfile=reports/test-report.html
```

**JSON Report:**
```bash
behave --format=json --outfile=reports/test-report.json
```

**Allure Report** (if allure-behave installed):
```bash
behave -f allure_behave.formatter:AllureFormatter -o reports/allure-results
allure serve reports/allure-results
```

#### 7.5 Validate Test Execution

Create `docs/testing/phase2-execution-summary.md`:

**Prompt 22: Generate Phase 2 Execution Summary**
```
Create a test execution summary document for Phase 2.

Include:
1. **Test Scripts Generated**:
   - 5+ feature files
   - 100+ Gherkin scenarios
   - 50+ step definitions
   - 5+ page objects

2. **Test Execution Results**:
   - Total scenarios: X
   - Passed: X
   - Failed: X
   - Skipped: X
   - Execution time: X minutes

3. **Coverage Mapping**:
   - Functional scenarios automated: X%
   - Integration scenarios automated: X%
   - Edge case scenarios automated: X%

4. **Test Artifacts Generated**:
   - HTML report
   - JSON report
   - Screenshots (on failure)
   - Allure report (optional)

5. **Issues Encountered**:
   - List any issues during script generation
   - Solutions applied

6. **Next Steps** (Phase 3):
   - Push scripts to GitHub repository
   - Setup CI/CD pipeline
   - Configure Azure DevOps / GitHub Actions
   - Schedule automated test runs

Generate a comprehensive summary.
```

---

## 📊 **DELIVERABLES**

At the end of Phase 2, you should have:

### **Test Automation Framework**
- ✅ Complete directory structure (`test-automation/`)
- ✅ Python dependencies installed (`requirements.txt`)
- ✅ Behave configuration (`behave.ini`)
- ✅ Configuration module (`config/config.py`)
- ✅ MCP configuration for Custom Agent (`.vscode/mcp-config.json`)

### **Gherkin Feature Files** (5+ files, 100+ scenarios)
- ✅ `features/cart_icon_visibility.feature` (10+ scenarios)
- ✅ `features/cart_operations.feature` (15+ scenarios)
- ✅ `features/cart_persistence.feature` (10+ scenarios)
- ✅ `features/cart_accessibility.feature` (8+ scenarios)
- ✅ `features/cart_edge_cases.feature` (10+ scenarios)

### **Page Objects** (POM Pattern)
- ✅ `pages/base_page.py` (base class)
- ✅ `pages/home_page.py`
- ✅ `pages/products_page.py`
- ✅ `pages/cart_page.py`
- ✅ `pages/header_component.py`

### **Step Definitions** (Python with Selenium)
- ✅ `features/steps/common_steps.py`
- ✅ `features/steps/cart_icon_steps.py`
- ✅ `features/steps/cart_operations_steps.py`
- ✅ `features/steps/cart_persistence_steps.py`
- ✅ `features/environment.py` (hooks)

### **Utilities**
- ✅ `utils/driver_factory.py` (WebDriver management)
- ✅ `utils/wait_helpers.py` (explicit waits)
- ✅ `utils/test_data_helpers.py` (test data utilities)

### **Documentation**
- ✅ `test-automation/README.md` (framework documentation)
- ✅ `docs/testing/phase2-execution-summary.md`
- ✅ Test execution reports (HTML, JSON)

---

## ✅ **SUCCESS CRITERIA**

**Phase 2 is complete when:**
- [ ] Test automation framework setup complete
- [ ] GitHub Copilot Custom Agent configured with MCP
- [ ] 5+ Gherkin feature files created (100+ scenarios)
- [ ] 5+ Page Objects implemented (POM pattern)
- [ ] 50+ step definitions generated in Python
- [ ] Selenium scripts run successfully
- [ ] Tests execute in multiple browsers (Chrome, Firefox, Edge)
- [ ] Test reports generated (HTML, JSON)
- [ ] Screenshots captured on failures
- [ ] All critical and smoke tests passing
- [ ] Documentation complete

---

## 🎓 **KEY TAKEAWAYS**

By completing Phase 2, you have learned:
1. ✅ How to use **GitHub Copilot Custom Agent** to generate test automation code
2. ✅ How to configure **MCP** for domain-specific AI agent context
3. ✅ How to implement **BDD** with **Behave** framework (Python's Cucumber)
4. ✅ How to write **Gherkin** feature files from test scenarios
5. ✅ How to implement **Page Object Model** (POM) pattern
6. ✅ How to generate **Selenium** scripts in Python using AI
7. ✅ How to organize test automation framework structure
8. ✅ How to execute tests with tags and generate reports
9. ✅ How to setup multi-browser test execution
10. ✅ How to prepare test scripts for CI/CD integration

---

## 🔜 **NEXT STEPS: PHASE 3**

In **Phase 3 (Execution & CI/CD Integration)**, you will:
- Push test scripts to GitHub repository
- Create GitHub Actions workflow for automated test execution
- Configure Azure Playwright Workspace (or alternative)
- Setup scheduled test runs
- Integrate test reports with CI/CD pipeline
- Configure notifications for test failures
- Setup test environment in cloud

**Preview of Phase 3:**
- Create `.github/workflows/test-automation.yml`
- Configure GitHub Actions to run Behave tests
- Setup matrix strategy for multi-browser testing
- Publish test reports as artifacts
- Configure test execution triggers (on PR, scheduled, manual)
- Setup Azure Playwright Testing (optional)

---

## 📚 **ADDITIONAL RESOURCES**

- **Behave Documentation**: https://behave.readthedocs.io/
- **Selenium Python Documentation**: https://selenium-python.readthedocs.io/
- **Gherkin Syntax Reference**: https://cucumber.io/docs/gherkin/reference/
- **Page Object Model Pattern**: https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
- **GitHub Copilot Custom Agent**: [Link to docs]
- **MCP Documentation**: [Link to MCP docs]
- **Allure Framework**: https://docs.qameta.io/allure/

---

## 📞 **SUPPORT**

If you encounter issues during Phase 2:
1. Verify Python and dependencies installed correctly
2. Check Selenium WebDriver compatibility
3. Review MCP configuration for Custom Agent
4. Verify application is running (frontend + API)
5. Check browser drivers are accessible
6. Review Behave logs for detailed error messages
7. Validate page object locators match actual UI elements

---

**END OF PHASE 2**

Proceed to **Phase 3: Execution & CI/CD Integration** once all deliverables are complete and tests are running successfully.

---

*Workshop 2: Testing Persona – Phase 2*  
*Last Updated: [Current Date]*  
*Version: 1.0*