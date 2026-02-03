# Happy Thoughts 💭

Happy Thoughts is a fullstack web application where users can share short thoughts, like other users’ thoughts, and manage their own content. The project started as a frontend-only React app and has since evolved into a complete fullstack application with authentication, authorization, and a custom-built API.

The frontend is built with React and communicates with a RESTful backend API to handle authentication, data fetching, and updates in real time.

## Live Site: https://happysharing.netlify.app/

## Happy Thoughts API: https://github.com/gabriellaberko/js-project-api

---

## Tech Stack

- React
- JavaScript (ES6+)
- REST API Integration
- Zustand for Global State Management
- React Routing
- Styled Components
- HTML & CSS

---

## Features

- View all thoughts in real time
- Like thoughts (authenticated & anonymous users)
- Create thoughts as a logged-in or anonymous user
- Sign up & log in with persistent sessions
- Edit and delete your own thoughts
- Relative timestamps (e.g. “5 minutes ago”)
- Filter and sort thoughts (date & number of likes)
- Optimistic UI updates with automatic re-fetching
- Error handling and loading states

---

## Authentication

- Access tokens are stored in localStorage
- Tokens are sent in request headers to persist login state
- Authenticated routes enable editing and deleting thoughts
- Anonymous users can still read, like, and post thoughts
