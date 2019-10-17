REST API using express

### Routes

- `POST /projects`: Create a new Project

  - Body params => `id` and `title`

- `GET /projects`: List all projects

- `PUT /projects/:id`: Update title project of given `id`

- `DELETE /projects/:id`: Delete project of given `id`

- `POST /projects/:id/tasks`: Add a new Task to the project
  - Body params: `title`
