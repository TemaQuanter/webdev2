#!bin/bash

# This script assembles and then runs a PostgreSQL database.
# WARNING: This script should be used for development purposes ONLY!!!

# Import environmental variables necessary to create PostgreSQL database.
source ./scripts/helpers/load_env.sh

# Load environmental variables.
load_env '.env'

# Stop and remove the existing docker containser.
docker stop marketplace_db
docker rm marketplace_db

# Remove image.
docker rmi marketplace_db

# Create a new image.
docker build -t marketplace_db -f docker/postgresql.dockerfile .

echo "POSTGRES_USER=$POSTGRES_USER"
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD"
echo "POSTGRES_DB=$POSTGRES_DB"

# Run the database.
docker run -e POSTGRES_USER=$POSTGRES_USER -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_DB=$POSTGRES_DB -d -p 5432:5432 --name marketplace_db marketplace_db