FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npx playwright test && npx allure generate allure-results --clean -o allure-report && ls allure-report"]