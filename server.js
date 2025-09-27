import express from 'express';
import cors from 'cors';
import sequelize from './database/conection.js';
import Activity from '../back/models/activity.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Listar todas las tareas
app.get('/api/tareas', async (req, res) => {
  const list = await Activity.findAll();
  res.json(list);
});

// ✅ Crear nueva tarea
app.post('/api/tareas', async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const nueva = await Activity.create({
      title,
      description,
      due_date,
      priority
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Sincroniza la base de datos
await sequelize.sync();

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
