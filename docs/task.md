# Task API SPEC

Base URL : http://localhost:3000/api/v1/task

## Add Task API Spec

Endpoint : POST /add

Request Body :

```json
{
  "title": "Example Title",
  "description": "Example Description",
  "dueDate": "2024-10-12" // still as a string
}
```

Response Body :

```json
{
  "success": true,
  "message": "Task added successfully",
  "result": {
    "id": "xxxxxx", // from uuid
    "title": "Example Title",
    "description": "Example Description",
    "dueDate": "2024-10-12",
    "status": "Pending", // default value
    "createdAt": "2024-12-10T14:00:35.574Z" // current time
  }
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message
}
```
