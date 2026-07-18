# No-Frills Math Exam For Kids

A lightweight, focused utility application built to create customized math tests for children and analyze their performance over time. 

Unlike typical educational apps, this tool strips away gamification and distractions, focusing purely on core mathematics and robust statistical tracking.

[START EXAM](https://tavoda.github.io/math-for-kids/)
---

## 🚀 Features

* **Distraction-Free Design:** Completely avoids playful gimmicks, animations, or gamification to keep kids focused entirely on the assessment.
* **Custom Exam Creation:** Easily generate targeted math worksheets based on specific arithmetic operations and difficulty levels.
* **Data-Driven Insights:** Includes a dedicated statistics module to track historical scores, identify persistent learning gaps, and monitor overall progress.

## 🛠️ Technical Architecture

The application is engineered with a strict focus on minimalism, speed, and efficiency:

* **Framework:** Built using **[Preact](https://preactjs.com/)** to ensure a highly responsive UI with a microscopic bundle size.
* **Serverless Architecture:** Fully client-side with **no backend**. All logic, exam generation, and statistical processing happen instantly in the browser.
* **Dependency Philosophy:** Minimalistic library usage. The app relies almost exclusively on native Web APIs to keep the codebase clean, maintainable, and lightweight.

## 📦 Getting Started

### Prerequisites

Make sure you have [npm](https://npmjs.org/) installed. Best is to use [nvm](https://github.com/nvm-sh/nvm) for working with different npm versions.

### Build and run locally

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/tavoda/math-for-kids
   npm install
   ```

2. Start locally:
   ```bash
   npm run dev
   ```

3. Open browser on [http://localhost:3000](http://localhost:3000)
