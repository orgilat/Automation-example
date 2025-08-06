# 🧪 Dropit Automation Test Suite

A full-featured automation framework built with **Playwright + TypeScript**, designed to test a Shopify-based storefront. It includes UI and API tests, Allure reporting, Docker integration, Winston logging, and GitHub CI workflows.

---
## time machine answer.txt- This file contains my answer to Part 3 – "Just for fun to know you better" ##

## 🚀 Technologies Used

| Technology       | Purpose |
|------------------|---------|
| **Playwright**   | Modern testing framework for end-to-end browser and API testing |
| **TypeScript**   | Strongly typed superset of JavaScript used for scalability and maintainability |
| **Allure Report**| Rich test reporting framework that generates visual test results with screenshots, videos, and traces - Two screenshots showing successful test execution and the corresponding Allure report output are included in the repository. |
| **Winston Logger** |  Winston configured only in the Page Object Model classes for structured, leveled logs. |
| **Page Object Model** |Reusable classes in `tests/pages/` |
| **globalSetup (Playwright)** | global-setup.ts` logs into the admin panel and saves `storageState.json` for UI tests. |
| **PetClient (Custom API Layer)** | Class-based HTTP client built using Playwright’s APIRequestContext |
| **Docker**       | 	Encapsulates the entire environment (Node, Playwright, Allure) to allow consistent execution across machines and CI agents.  |

---

#  Local Execution

```bash
# Run API & UI tests\ npx playwright test

# Generate Allure report\ npx allure generate allure-results --clean -o allure-report

# Open the report\ npx allure open allure-report
```

## 🐳 Docker Execution
For convenience, a fully configured Dockerfile is included for users who prefer to run the tests in an isolated environment without installing dependencies locally.

✅ The entire test suite was successfully executed inside Docker, including Allure report generation.
### 📸 A screenshot of the successful run is provided in the repository under the name docker - run.jpg
## Build Docker image
docker build -t dropit-tests .

### Run tests inside Docker and mount Allure report
docker run --rm -v "$(pwd)/allure-report:/app/allure-report" dropit-tests
# ⚙️ Test Design & Architecture

## 🧠 Page Object Model (POM)
All UI flows use the **Page Object Model** design pattern. Each page ( ProductPage, CartPage , CatalogPage , CheckoutPage ) encapsulates locators and actions to keep tests clean and modular.


## 💡 globalSetup
The `global-setup.ts` script is executed **before the test suite** runs. It:
 Navigates to the Shopify storefront password page
 Fills in the password (`giclao`)
 Authenticates the session
 Saves the browser storage state to `storageState.json`

Playwright uses this saved state to start each test already authenticated — saving time and avoiding repetition.

## 🔌 API Layer – `PetClient`
The `PetClient` is a modular class-based client for testing against the **Petstore API**.

Contains three main functions:

createPet(pet) – Adds a new pet to the store.

updatePet(pet) – Updates an existing pet (e.g., name, status, etc.).

findPetsByStatus(status) – Searches for pets based on their status (e.g., available, sold, etc.).

---

## 🧾 Logging – Winston
The project uses **Winston** for structured logging. 

##  CI Pipeline Behavior

On every push or PR to `main`, GitHub Actions will:

1. Checkout code & install dependencies (`npm ci`).
2. Install Playwright browsers (`npx playwright install --with-deps`).
3. Run all tests (`npx playwright test`).
4. Generate Allure report (`npx allure generate allure-results --clean -o allure-report`).
5. Upload `allure-report/` as an artifact.

---
##  Testing Scope & Summary

**Results:** 5 of 5 automated tests passed.

Further automation can be added upon request.





