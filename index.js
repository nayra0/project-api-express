const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let numberOfRequests = 0;

function findProjectById(id) {
  return projects.find(project => project.id === id);
}

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = findProjectById(id);

  if (!project) {
    return res.status(400).json({ error: `Project with id: ${id} does not exist` });
  }

  return next();
}

function logOfRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Number of Requests: ${numberOfRequests}`);

  next();
}

server.use(logOfRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const project = findProjectById(id);

  res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = findProjectById(id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = findProjectById(id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
