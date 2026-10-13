# PTHub — Official Website

Welcome to the official website repository for **PTHub**.

PTHub is a platform connecting personal trainers and fitness enthusiasts, helping users discover trainers, connect with them, and manage their fitness journeys.

## About This Repository

This repository hosts the public-facing informational website for PTHub.

The website is designed to introduce the platform, highlight its key features, and provide access to important legal information.

## Website Pages

- **Home** — Introduction to PTHub and its features.
- **Privacy Policy** — Information about privacy and data protection.
- **Terms of Service** — Terms and conditions for using PTHub.

## Technology

The website is built with dependency-free static HTML, CSS, and JavaScript for compatibility with GitHub Pages.

## Local Preview

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000/](http://localhost:8000/).

## Project Structure

```text
.
├── index.html                 # Homepage
├── privacy/index.html         # Privacy and account/data deletion policy
├── terms/index.html           # Terms of service and Store terms
└── assets/
    ├── css/styles.css         # Shared responsive styles
    ├── images/logo/logo512.png
    └── js/main.js             # Accessible mobile navigation
```

All internal URLs use relative paths. The same source works from localhost, the GitHub Pages project path (`/pthub-site/`), and a future custom domain without changing asset paths.

## Legal Information

Official PTHub legal documents are available at:

https://mr-dau.github.io/pthub-legal/

## Contact

For inquiries or support: pthub.vn@gmail.com
