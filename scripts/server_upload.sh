# This script uploads the project to the server
# with all the necessary privates.

#!/bin/bash

# Import environmental variables necessary to create PostgreSQL database.
source ./scripts/helpers/load_env.sh

# Load environmental variables.
load_env '.env'

# Go to one directory up.
cd ..

# Make a copy of the project.
cp -r webdev2 tu_marketplace_copy

# Go into the copy of the project.
cd tu_marketplace_copy

# Remove unnecessary files from the project.
rm -rf .next
rm -rf .vscode
rm -rf .git
rm -rf node_modules

# Get out of the directory.
cd ..

# Create a zipped file from a copy of the project.
tar cJf tu_marketplace.tar.xz tu_marketplace_copy

# Remove the copy of the project.
rm -rf tu_marketplace_copy

echo "Started data transfer from the local machine to the remove server"

# Transfer the zipped project to the server.
scp -P $SERVER_SSH_PORT tu_marketplace.tar.xz $SERVER_USER@$SERVER_IP:$SERVER_PROJECT_PATH

# Remove the zipped project from local computer.
rm tu_marketplace.tar.xz

# Return back into the project directory.
cd webdev2