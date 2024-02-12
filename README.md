# retoTecnico
# **Guía de Inicio Rápido**

Esta guía proporciona los pasos necesarios para levantar la aplicación en un entorno que solo cuenta con Docker. 

## **Requisitos Previos**
- Docker instalado.

## **Pasos**

### **1. Clonar el Repositorio**
  Abre una terminal y ejecuta los siguientes comandos:
  
    git clone https://github.com/Adrianabalcd/retoTecnico.git
    
    cd retoTecnico

### **2. Configurar Variables de Entorno**
  Antes de iniciar la aplicación, debes configurar las variables de entorno necesarias. Esto incluye la conexión a la base de datos y cualquier otra configuración relevante.
  Para ello ingresa al archivo docker-compose.yml y verifica las environments.

### **3. Construir y Ejecutar la Aplicación con Docker Compose**

  docker-compose up -d

### **4. Verificar la Ejecución**
  Una vez que los contenedores estén ejecutándose, podrás verificar que la aplicación se está ejecutando correctamente accediendo a ella.

  ***Ejemplo***
    Prueba la siguiente ruta a través del navegador: http://localhost:3000/apiDocs 

