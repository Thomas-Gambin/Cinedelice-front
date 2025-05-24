
# Cinedelices

**Cinedelices** is a group project completed at the end of our training program. Our mission was to create a website wich users could browse and create recipes inspired by pop culture (movies, TV series, anime/manga, video games, literature).


# Cinedelices Frontend

This is the frontend repository for the Cinedelices project, a platform dedicated to cinema and gastronomy.
The backend repository must be running to use all features.  
Backend repo link: [https://github.com/Thomas-Gambin/Cinedelice-back](https://github.com/Thomas-Gambin/Cinedelice-back)

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: >=18.x)
- [PNPM](https://pnpm.io/) (version 10.7.1 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Thomas-Gambin/Cinedelice-front.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file at the root of the project based on the following example:
   ```ini
   VITE_API_URL = http://localhost:3000/api
   ```

# Frontend Structure

## HTML Pages:
- Home page
- Recipe detail page
- Recipe list page
- Login page
- Signup page
- Media detail page
- Media list page
- Recipe creation page

## Running the Project

1. To start the project, use the command:
```bash
pnpm dev
```

2. To access all features, either:
Create a new account (make sure MailerSend keys are set up in the backend), or use the pre-included credentials from the database:

- Email: john@doe.fr  
- Password: johnEstVraimentUnSuperPseudo
