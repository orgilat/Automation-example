# 🧪 Dropit Automation Test Suite

A full-featured automation framework built with **Playwright + TypeScript**, designed to test a Shopify-based storefront. It includes UI and API tests, Allure reporting, Docker integration, Winston logging, and GitHub CI workflows.

---

## 🚀 Technologies Used

| Technology       | Purpose |
|------------------|---------|
| **Playwright**   | Modern testing framework for end-to-end browser and API testing |
| **TypeScript**   | Strongly typed superset of JavaScript used for scalability and maintainability |
| **Allure Report**| Rich test reporting framework that generates visual test results with screenshots, videos, and traces |
| **Docker**       | Containerized, reproducible environment for consistent execution across systems |
| **Winston Logger** | Custom logging solution for both console and file logs |
| **GitHub Actions** | CI/CD pipeline to run tests on each push or pull request |
| **globalSetup (Playwright)** | Pre-authentication script that saves login state before test execution |


---

## 4. Local Execution

```bash
# Run API & UI tests\ npx playwright test

# Generate Allure report\ npx allure generate allure-results --clean -o allure-report

# Open the report\ npx allure open allure-report
```

# 🐳 Docker Execution
# Build Docker image
docker build -t dropit-tests .

# Run tests inside Docker and mount Allure report
docker run --rm -v "$(pwd)/allure-report:/app/allure-report" dropit-tests
## ⚙️ Test Design & Architecture

### 🧠 Page Object Model (POM)
All UI flows use the **Page Object Model** design pattern. Each page (e.g. ProductPage, CartPage) encapsulates locators and actions to keep tests clean and modular.

### 💡 globalSetup
The `global-setup.ts` script is executed **before the test suite** runs. It:
- Navigates to the Shopify storefront password page
- Fills in the password (`giclao`)
- Authenticates the session
- Saves the browser storage state to `storageState.json`

Playwright uses this saved state to start each test already authenticated — saving time and avoiding repetition.

### 🔌 API Layer – `PetClient`
The `PetClient` is a modular class-based client for testing against the **Petstore API**. It includes:
- `POST` - Create a new pet
- `PUT` - Update a pet’s name
- `GET` - Search pets by status

This separation of concerns keeps API tests clean and scalable.

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






