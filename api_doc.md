# Note API Documentation

| Endpoint          | Method | Description          | Request Body       | Response Body      |
| ----------------- | ------ | -------------------- | ------------------ | ------------------ |
| `/notes/`          | POST   | Create new note      | `NoteCreate`       | `Note`             |
| `/notes/{note_id}` | GET    | Get note by ID       | None               | `Note`             |
| `/notes/{note_id}` | PUT    | Update a note        | `NoteUpdate`       | `Note`             |
| `/notes/{note_id}` | DELETE | Delete a note        | None               | `Note`             |
| `/notes/`          | GET    | Retrieve notes       | None               | List[`Note`]       |

## Example Requests

### Create Note
```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "My Note", "notes": "This is my note"}' http://localhost/api/notes/
```

### Get Note by ID
```bash
curl -X GET http://localhost/api/notes/1
```

### Update Note
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Note", "notes": "This is my updated note"}' http://localhost/api/notes/1
```

### Delete Note
```bash
curl -X DELETE http://localhost/api/notes/1
```

### Get All Notes
```bash
curl -X GET http://localhost/api/notes/
```