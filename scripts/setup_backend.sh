#!/usr/bin/env bash
set -e

# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl make -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

cp ../src/backend/.env.example ../src/backend/.env
cd ..
sudo docker compose --env-file ./src/backend/.env up -d --build
sudo docker exec liftingpal-app composer install
sudo docker exec liftingpal-app php artisan key:generate
sudo docker exec liftingpal-app php artisan storage:link
sudo docker exec liftingpal-app php artisan migrate:fresh --seed

sudo docker compose --env-file ./src/backend/.env down
sudo docker compose --env-file ./src/backend/.env up -d --build

echo "Back-end development environment has been successfully deployed..."
