# Modern Store

A modern online store built with Angular 21, TypeScript, standalone components, Signals, RxJS and SCSS.

The application provides a product catalogue, product details, a shopping cart, a product creation form and a protected administration area.

## Features

- **Product catalogue:** retrieves products from [Fake Store API](https://fakestoreapi.com/) and displays loading and error states.
- **Product details:** displays individual products using route parameters and RxJS.
- **Shopping cart:** shares cart state between components using Angular Signals.
- **Product creation:** reactive form with required fields, price validation and a custom validator.
- **Authentication:** simulated login and logout.
- **Protected administration:** route guard and lazy-loaded administrative routes.
- **Custom pipe:** formats prices as euros using the Spanish locale.
- **Standalone architecture:** uses standalone Angular components and modern template control flow.
- **Change detection:** uses `ChangeDetectionStrategy.OnPush` where appropriate.
- **Responsive interface:** styled with SCSS.

## Technology stack

| Technology | Purpose |
|---|---|
| Angular 21 | Frontend framework |
| TypeScript | Application logic |
| RxJS | Asynchronous streams and HTTP workflows |
| Signals | Reactive shared state |
| Angular Router | Navigation and route protection |
| Reactive Forms | Product creation and validation |
| SCSS | Component styling |
| Fake Store API | Example product data |
| Git and GitHub | Version control and collaboration |

## Requirements

Install the following before running the application:

- Node.js compatible with the Angular version used by the project.
- npm.
- Angular CLI (optional globally; `npx ng` can use the project installation).
- Git.

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd modern-store
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Available commands

```bash
# Start the development server
npx ng serve

# Build the application
npx ng build

# Run automated tests
npx ng test

# Run the Angular CLI test target
npx ng test
```

The exact test runner and supported command-line options depend on the test configuration in `package.json` and `angular.json`.

## Application routes

| Route | Purpose | Access |
|---|---|---|
| `/products` | Product catalogue | Public |
| `/products/:id` | Product details | Public |
| `/cart` | Shopping cart | Public |
| `/login` | Login form | Public |
| `/admin` | Administration area | Protected |
| `/admin/...` | Administrative child routes | Protected |

Unknown routes redirect to the product catalogue.

## Project structure

```text
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── models/
    │   └── services/
    ├── features/
    │   ├── admin/
    │   ├── auth/
    │   ├── cart/
    │   ├── catalog/
    │   └── product-detail/
    ├── shared/
    │   ├── components/
    │   └── pipes/
    ├── app.config.ts
    ├── app.routes.ts
    └── ...
```

This structure separates shared infrastructure, reusable UI and application features. Exact filenames may vary slightly depending on the final project layout.

## Shopping cart

The cart uses a shared Angular service with Signals to maintain the selected products and their quantities.

The service exposes reactive values for:

- Cart items.
- Total item quantity.
- Total cart price.

Adding an existing product increases its quantity; decreasing the quantity to zero removes it.

## Product creation

The product form uses Angular Reactive Forms. It validates required fields and the product price before submitting a POST request to Fake Store API.

Fake Store API is a demonstration service: a successful POST response does not guarantee that the product is permanently stored on the server.

## Authentication and security

The login and protected routes demonstrate client-side authentication and route guards.

**Important:** authentication in this project is simulated. Client-side guards do not provide real backend security. A production application must authenticate users on a trusted server and authorize protected operations on the backend.

Do not use the demonstration credentials or client-side authentication as a real security mechanism.

## Testing

Automated tests should cover:

- Cart service operations and price calculations.
- Custom price pipe formatting.
- Product service HTTP requests.
- Authentication and route guard behaviour.
- Product form validation and submission.

Run the tests with the command supported by the configured Angular test runner. See the test files and testing guide for details.

## Branching strategy

The project uses a simplified Git Flow approach:

- `main`: stable, deliverable versions.
- `develop`: integration branch.
- `feature/*`: new features.
- `fix/*`: bug fixes.
- `test/*`: automated tests.
- `docs/*`: documentation.
- `release/*`: release preparation, when needed.
- `hotfix/*`: urgent production fixes, when needed.

Feature, fix, test and documentation branches are temporary and should normally be merged into `develop` through Pull Requests.

## Limitations

- Product data comes from a public demonstration API.
- Product creation is not guaranteed to persist remotely.
- Authentication is simulated and is not production-grade.
- The cart is maintained in client-side memory and may reset when the application reloads.
- The application does not implement a real payment gateway.

## Future improvements

- Add persistent cart storage.
- Introduce a real backend and database.
- Implement server-side authentication and authorization.
- Add end-to-end tests.
- Add CI checks for builds and tests.
- Add product search, filtering and sorting.

## License

Choose and add a license file before distributing this project publicly. If no license is included, do not assume that others have permission to reuse the code.

---

Developed as an Angular learning project.