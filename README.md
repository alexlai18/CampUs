## What is CampUs?

This is a web application written and designed by Alexander Lai.

The idea for this app was to have it be a social media app, where you could look for group mates or study buddies for you course or assignments.

The only feature outside of searching for people is a chat room.

## Backend
The backend is at this repository (currently migrating), moving away from full-stack in one codebase.
https://github.com/alexlai18/CampUs-backend

## Tech Stack

- Vercel (PaaS)
- NextJS
- ShadCN (UI Library)
- ReactJS
- MongoDB
- NodeJS

This is currently hosted on Vercel @ https://campus-psi.vercel.app/

The application is currently a full-stack application in one codebase, but I am planning to migrate it to separate codebases and tech stacks for the backend.

## Application Features

### Login/Register Pages

As the title suggests, these are just generic login and register pages.

**TODO**
- Enable OAuth2 with Google and Github

### Dashboard Page

This page shows all the details about you. Shows how many courses you've joined, how many groups. It shows your "about me" section and your highest rated group mates.
Also shows notifications.

**TODO**
- Add ratings to the database and remove the hardcoded values for groupmates.
- Add notifications to actions

### Courses Page

This page shows all the courses available in the application. Also shows all the groups that are created for the course.

### Connections Page

Shows all your added friends.

### My Groups Page

Shows all the groups you are a part of, and separates them from current and past.

**TODO**
- Find ways to purge through all the groups of users and change them to past, once the term is over

### Profile Page

Shows information about yourself, or other users.

**TODO**
- Add image to database so users can have their own picture

### Settings Page

Forms where you can change name, email, school, light and dark mode, etc.

### Search Page

Shows any user, group, or course that has the search prompts inside it, ordered from earliest appeared in name, and frequency.


### New User and New Group Page

Creates new user or new group
