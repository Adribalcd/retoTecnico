# Usar una imagen base de Node.js
FROM node:16

# Definir el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

RUN npm install -g nodemon

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev:server"]
