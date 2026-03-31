# Wikipedia Playwright Test Suite

## Overview

Hi!

This project is a small automated test suite for Wikipedia using [Playwright](https://playwright.dev/) with TypeScript.  
It demonstrates practical browser automation and testing patterns through several test cases, both positive and negative, including(but hopefully not limited to):

- **Reusable helper functions** for common UI actions (like searching Wikipedia)
- **Custom fixtures** for injecting test data (e.g., search terms)
- **Parameterized (data-driven) tests** for positive, negative, and edge cases
- **Test hooks** (`beforeEach`, `afterEach`) for setup, cleanup, and logging
- **Global setup/teardown** for authentication/session management
- **Rich reporting and debugging** with Playwright's HTML reports, traces, and screenshots

---

## What You Can Learn From This Project (I hope)

- How to structure Playwright tests for clarity and maintainability
- How to avoid code duplication by using helper functions for repeated actions
- How to use fixtures to inject dynamic data into your tests
- How to write parameterized tests to cover multiple scenarios efficiently
- How to handle negative and edge cases in UI automation
- How to use Playwright's reporting and debugging tools for faster troubleshooting
- How to organize your test codebase for real-world projects

---

## Project Structure

```
my-typescript-project
├── fixtures/
│   └── searchTerm.fixture.ts    # Custom fixture for search terms
├── helpers.ts                   # Helper functions for repeated actions
├── tests/
│   ├── searchwiki.spec.ts       # Main Wikipedia search tests (positive cases)
│   ├── assertArticleEditor.spec.ts # Tests for article editor assertions
│   └── negativeAndEdgeCases.spec.ts # Negative and edge case tests
├── .auth/
│   └── login.json               # Storage state for authenticated session
├── global-setup.ts              # Logs in before tests
├── global-teardown.ts           # Logs out after all tests
├── playwright.config.ts         # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd my-typescript-project
   ```
2. Install dependencies:
   ```sh
   npm install
   npx playwright install (if pw isn't installed yet)
   ```

3. Set up environment variables for login (if needed but recommended since I have a global setup/teardown functionality within the codebase):
   - Create a `.env` file with your Wikipedia credentials:
     ```
     WIKI_USERNAME=your_username
     WIKI_PASSWORD=your_password
     ```

---

## Running the Tests

1. **Run global setup (login and save session):**
   ```sh
   npx playwright test --global-setup
   ```
   *(Usually, Playwright runs this automatically before your tests if configured.)*

2. **Run all tests:**
   ```sh
   npx playwright test
   ```

3. **View the HTML report:**
   ```sh
   npx playwright show-report
   ```

---

## Key Features

- **Reusable Helpers:**  
  Common actions like searching Wikipedia are encapsulated in helper functions for DRY, maintainable tests.

- **Custom Fixtures:**  
  Easily inject different search terms or data into your tests for flexibility and reusability.

- **Parameterized Tests:**  
  Use arrays of test cases to efficiently cover positive, negative, and edge scenarios.

- **Negative & Edge Case Handling:**  
  Tests are included to ensure the app handles invalid input and edge cases gracefully.

- **Hooks:**  
  Use `beforeEach`, `afterEach`, etc., for setup, cleanup, and logging.

- **Global Setup/Teardown:**  
  Handles login before tests and logout after all tests automatically.

- **Rich Reporting & Debugging:**  
  Playwright's HTML reports, traces, and screenshots make it easy to debug failures.

- **Test Organization:**  
  Group related tests using `test.describe` for clarity and maintainability.

---

## Example: Parameterized Negative/Edge Case Test

```typescript
import { test } from '../fixtures/searchTerm.fixture';
import { expect } from '@playwright/test';
import { searchWikipedia } from '../helpers';

const testCases = [
  { term: 'asfjklasjdf' },   // unlikely to exist
  { term: '#$%^&*' }         // special characters
];

test.describe('Negative and Edge Cases for Wikipedia Search', () => {
  for (const { term } of testCases) {
    test(`Search for "${term}" and expect no results`, async ({ page }) => {
      await searchWikipedia(page, term);
      await expect(page.getByText('There were no results matching the query.')).toBeVisible();
    });
  }
});
```

---

## Contributing

Contributions are welcome since this is a small project!  
Feel free to open issues or submit pull requests for improvements as I am really open to learning more and expanding my Playwright knowledge.

---

## License

This project is licensed under the MIT License.
