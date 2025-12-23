Overview

This project is an automation testing framework built using:

JavaScript (Node.js)

Cucumber (BDD)

Playwright

Supports API testing and Web UI testing

Designed to run locally and on CI/CD pipelines

The framework follows best practices such as:

Page Object Model (POM)

Cucumber World for data sharing

Retry & timeout handling for API calls

Tag-based execution (@UI)

```bash
git clone https://github.com/trungnt9391/Jitsu.git
cd Jitsu
npm install
npx playwright install
npx cucumber-js
