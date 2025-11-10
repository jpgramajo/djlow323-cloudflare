# DJ Low 323 - Cloudflare

This is the official website for DJ Low 323, a professional DJ service. This project is a modern, single-page application built with Next.js and deployed on Cloudflare.

## Live Demo

You can visit the live website at: [www.djlow323.com](https://www.djlow323.com)

## Description

This project is a landing page for DJ Low 323, showcasing the services offered, pricing plans, an about section, a gallery, and contact information. It's designed to be a fast, responsive, and user-friendly experience for potential clients.

The website features a modern design with smooth animations and a clear layout. It also includes a quote request system with two options: a traditional form and an AI-powered assistant.

## Features

*   **Single-Page Application:** A smooth, seamless user experience with no page reloads.
*   **Responsive Design:** Looks great on all devices, from mobile phones to desktop computers.
*   **AI Quote Assistant:** An innovative way for clients to get a quote using an AI-powered chat.
*   **Traditional Quote Form:** For users who prefer a classic form-based approach.
*   **User Authentication:** A secure way for users to log in and manage their information.
*   **Gallery:** A showcase of past events and photos.
*   **FAQ Section:** Answers to common questions about the DJ services.
*   **Contact Form:** A simple way for clients to get in touch.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)
*   **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/)
*   **Storage:** [Cloudflare R2](https://developers.cloudflare.com/r2/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Authentication:** [JWT](https://jwt.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/jpgramajo/djlow323-cloudflare.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is deployed on Cloudflare Pages. The `wrangler.jsonc` file is configured for Cloudflare's environment.

To deploy your own version, you can use the following command:

```sh
npm run deploy
```

This will build the project and deploy it to your Cloudflare account.

## License

This project's code and web design are provided under the MIT License, allowing for use as a template. However, all assets, including images and logos, are the exclusive property of DJLOW - Las Vegas, Nevada, United States, and may not be used without explicit permission. See `LICENSE` for more information regarding the code.