import { Router } from "express";

const router = Router();

// 🔹 Datos en memoria (simula base de datos)
let activities = [
  { id: 1, title: "Estudiar Angular", completed: false },
  { id: 2, title: "Hacer ejercicio", completed: true }
];

// GET - Listar actividades
router.get("/", (req, res) => {
  res.json(activities);
});

// POST - Agregar actividad
router.post("/", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "El título es obligatorio" });

  const newActivity = {
    id: activities.length ? activities[activities.length - 1].id + 1 : 1,
    title,
    completed: completed || false
  };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});

// PUT - Editar actividad
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const activity = activities.find(a => a.id === parseInt(id));

  if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });

  if (title !== undefined) activity.title = title;
  if (completed !== undefined) activity.completed = completed;
  res.json(activity);
});

// DELETE - Eliminar actividad
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = activities.findIndex(a => a.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Actividad no encontrada" });

  const deleted = activities.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
