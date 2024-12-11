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

## Acc Task API Spec

Endpoint : POST /acc/:id

Request Body :

```json
{
  "id": "xxxxxx"
}
```

Response Body : (If task founded)

```json
{
  "success": true,
  "message": "This task completed",
  "result": {
    "id": "xxxxxx", // from uuid
    "title": "Example Title",
    "description": "Example Description",
    "dueDate": "2024-10-12",
    "status": "Complete", // default value
    "createdAt": "2024-12-10T14:00:35.574Z" // current time
  }
}
```

Response Body : (If task not founded)

```json
{
  "success": false,
  "errors": "Task not found"
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message
}
```

## Edit Task API Spec

Endpoint : POST /edit/:id

Request Body :

```json
{
  "title": "New Title",
  "description": "New Description",
  "dueDate": "2024-10-12"
}
```

Response Body : (If task founded)

```json
{
  "success": true,
  "message": "Task edited succesfully",
  "result": {
    "id": "xxxxxx",
    "title": "New Title",
    "description": "New Description",
    "dueDate": "2024-10-12",
    "status": "Complete", // got prev status
    "createdAt": "2024-12-11T10:06:54.610Z" // got prev createdAt
  }
}
```

Response Body : (If task not founded)

```json
{
  "success": false,
  "errors": "Task not found"
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message
}
```

## Del Task API Spec

Endpoint : POST /del/:id

Request Body :

```json
{
  "id": "xxxxxx"
}
```

Response Body : (If task founded)

```json
{
  "success": true,
  "message": "Task deleted succesfully",
  "result": {
    "title": "Example Title"
  }
}
```

Response Body : (If task not founded)

```json
{
  "success": false,
  "errors": "Task not found"
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message
}
```
