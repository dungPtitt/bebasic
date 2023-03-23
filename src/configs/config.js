require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "timezone": "+07:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "compilerOptions": {
    "target": "ES2021",                                 
    "lib": [
      "esnext"
    ],                                       
    "module": "commonjs",                               
    "rootDir": "src",                                 
    "baseUrl": "./",                                
    "resolveJsonModule": true,                       
    "sourceMap": true,                            
    "outDir": "./dist",                                  
    "esModuleInterop": true,                           
    "forceConsistentCasingInFileNames": true,            
    "strict": true,                                    
    "skipLibCheck": true                             
  }
}
