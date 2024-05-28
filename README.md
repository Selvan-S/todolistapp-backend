# Todolist App
## About
This is a Backend for the Todolist App project, built using the MERN stack.

- [Live Preview](https://2dolist-app.netlify.app/)

## Run
Step 1:
```
npm install
```
Step 2: Create .env file
```
.env
```
Step 3: Name the key and value in your .env file as
```
MONGO_CONNECTION_STRING=<Connection String>
SESSION_SECRET=<Your session secret>
```
Step 4: Add the `.env` in `.gitignore` file <br/> <br/>
Step 5:
```
npm run dev
```
Step 6: Use the below API endpoints for `User` and Base URL is `http://localhost:<PORT>/api/v1/users`:
```
"/" -  Get authenticated user (GET)
"/signup" - Signup user (POST). eg., {"username": "name", "email": "example@email.com", "password":"pass123"}
"/login" - Login user (POST). eg., {"username": "name", "password":"pass123"}
"/logout" - Logout user (POST)
```
Step 7: Use the below API endpoints for `Todo` and Base URL is `http://localhost:<PORT>/api/v1/todos`:
```
"/" -  Get Todos for specific user (GET).
"/:todoId" - Get specific Todo (GET)
"/" - Create new Todo (POST). eg., {"title": "todo title"}
"/:todoId" - Update Todo (PUT).
"/:todoId" - Delete Todo (Delete)
""
```
Step 8: Use the below API endpoints for `Task` and Base URL is `http://localhost:<PORT>/api/v1/tasks`:
```
"/" -  Get Todos for specific user (GET).
"/:todoId" - Get specific Task (GET)
"/" - Create new Todo (POST). eg., {"todo_id": <Specific Todo _id>, task: <your description>}
"/" - Update Todo (PUT).
"/" - Delete Task (Delete)
""
```
