import { Sequelize } from 'sequelize';

// Conexión directa (puedes cambiar credenciales)
const sequelize = new Sequelize('api_node', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,      // Puerto por defecto de MySQL
  logging: false   // Pon true para ver las consultas en consola
});

// Prueba inmediata de conexión
try {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL exitosa.');
} catch (error) {
  console.error('❌ Error al conectar a MySQL:', error);
}

export default sequelize;
