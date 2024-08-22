#!/bin/bash

# Función para instalar Docker
install_docker() {
    echo "Instalando Docker..."
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
}

# Función para instalar Docker Compose
install_docker_compose() {
    echo "Instalando Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Docker no está instalado."
    install_docker
else
    echo "Docker ya está instalado."
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose no está instalado."
    install_docker_compose
else
    echo "Docker Compose ya está instalado."
fi

# Construir y levantar los contenedores usando docker-compose
echo "Construyendo y levantando los contenedores con docker-compose..."
docker-compose up --build

# Verificar el estado de los contenedores
echo "Verificando el estado de los contenedores..."
docker ps

# Mensaje final
echo "Los contenedores están en ejecución. Puedes conectarte a PostgreSQL con:"
echo "  Host: localhost"
echo "  Puerto: 5432"
echo "  Usuario: davidnotes"
echo "  Contraseña: 1234"

echo "El frontend está disponible en http://localhost:3000"
echo "El backend está disponible en http://localhost:8080"