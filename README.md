## Next.js - Open Jira App


### Para correr localmente se necesita correr la base de datos mongo con docker:
```
docker-compose up -d
```

### MongoDB Url Local:
```
mongodb://localhost:27018/entriesdb
```

### Variables de entorno: 
Copiar las de .env.template y crear el archivo.env

### Llenar la BD con datos de prueba: 
Llamar a:
```
http://localhost:3000/api/seed
```