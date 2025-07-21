import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);
const db: any = {};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(dbConfig);

// Read all model files in the current directory
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.ts'
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

  // console.log("Here is the DB Object : ", db);

  

// Set up associations between models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log("Here is the DB Object, Bigger me : ", db);

export const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        // await sequelize.sync({force: false});
        // console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export default db;
export { sequelize };