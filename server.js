import express from 'express';
import cors from 'cors';
import sequelize from './database/conection.js';
import Activity from './models/activity.js'; // usa la ruta correcta

const app = express();
app.use(cors());
app.use(express.json());

// Listar
app.get('/api/tareas', async (req, res) => {
  const list = await Activity.findAll();
  res.json(list);
});

// Crear
app.post('/api/tareas', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body; // usa el mismo nombre del modelo
    const nueva = await Activity.create({ title, description, dueDate, priority });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Actualizar
app.put('/api/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.update(req.body, { where: { id } });
    res.json({ message: 'Tarea actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// Eliminar
app.delete('/api/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.destroy({ where: { id } });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

await sequelize.sync();
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
