***Guía de Despliegue en la Nube***

Esta guía describe los pasos para desplegar la aplicación Node.js instanciada en Docker y conectada a MongoDB en un entorno en la nube.

**Requisitos Previos**
    - Tener una cuenta un proveedor de servicios en la nube (ej. AWS, Azure, Google Cloud).
    - Tener Docker instalado en su máquina local.
    - Tener acceso al string de conexión de la base de datos MongoDB.
    - Tener instalado y configurado Git.

**Pasos/Fases**

***1. Preparación de Entorno Local***
    
    Finalidad: Verificar el correcto funcionamiento de la aplicación en el entorno local.

    - Para ello clonar el repositorio en la máquina local:
    
        git clone https://github.com/Adrianabalcd/retoTecnico.git

    - Verificar el archivo ***docker-compose.yml*** en caso se requiera modificar la conexión a la base de datos a través de [MONGO_DB_URI].

    - Ejecutar la aplicación en Docker
        
        docker-compose up -d


***2. Preparación de entorno en la nube***

    - Crear una instancia de máquina virtual en el proveedor de la nub elegidoe.

    - Instalar Docker y Docker Compose en la instancia.


***3. Despliegue en la Nube***

    - Conectarse a la máquina virtual mediante SSH.

    - Clonar el repositorio en la máquina virtual.

    - Iniciar la aplicación usando Docker Compose:
        
        docker-compose up -d


***4. Verificación de Despliegue***

    - Comprobar que la aplicación esté funcionando correctamente accediendo a través de la IP   pública de la máquina virtual.