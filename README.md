
# TASK-EMPLOYEE MANAGER

TASK-EMPLOYEE MANAGER is an application that allows the management of tasks and employees. Each registered employee can create, update or delete their created tasks, as well as their profile. It is easy to track the tasks of each employee that they have started and what status they have - in progress or completed.

## Start the app

- open TERMINAL<br />
- npm i<br />
- npm start<br />

## Architecture

```bash
├───configurations
├───controllers
├───middlewares
├───models
├───services
├───util
├───views
│   ├───auth
│   ├───employees
│   ├───home
│   ├───layouts
│   ├───tasks
└───routes
```


## Features

### Logged-out employee

- View Home(statistics) page
- View Login page and Registre page
- View Tasks page with only info functionality
- View Employees page with only info functionality
- View Info page without functionality

### Logged-in employee

- View Home(statistics) page
- View Add Task page
- View Logout page

#### non-Authenticated Logged-in employee

- View Tasks page with "status" and "info" functionality
- View Employees page with "status" and "info" functionality
- View Info page without functionality

#### Authenticated Logged-in employee

- View Tasks page with full("edit", "delete") functionality
- View Employees page with full("edit", "delete") functionality
- View Info page with functionality

## Technologies

#### Node.js
#### Express.js
#### Express-handlebars
#### MongoDB with Mongoose
