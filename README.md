# Marketplace Project

This project is set up to run in Docker containers, including a PostgreSQL database and a Next.js application. Follow the steps below to configure and run the project on your local machine.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- The `webdev2` project folder.
- A database dump file (e.g., `dump_27_oct_2024.sql`) and directories (`public_images` and `protected_images`) inside the dump folder.

## Setup Instructions

1. **Copy Environment Variables**

   The project requires environment variables stored in `.env`. Copy the contents of `env.txt` into a new file named `.env` within the root of the `webdev2` project folder.

   ### Unix (Linux and macOS)

   ```bash
   cp env.txt .env
   ```

   ### Windows

   ```powershell
   copy env.txt .env
   ```

2. **Prepare Image Folders**

   Replace the existing `public_images` and `protected_images` folders in `webdev2` with the corresponding folders from the database dump.

   ### Unix (Linux and macOS)

   ```bash
   rm -rf webdev2/public_images
   rm -rf webdev2/protected_images
   cp -r dump_27_oct_2024/public_images webdev2/
   cp -r dump_27_oct_2024/protected_images webdev2/
   ```

   ### Windows

   ```powershell
   rmdir /S /Q webdev2\public_images
   rmdir /S /Q webdev2\protected_images
   xcopy dump_27_oct_2024\public_images webdev2\public_images /E /I
   xcopy dump_27_oct_2024\protected_images webdev2\protected_images /E /I
   ```

3. **Restore Database**

   To restore the database, run the following command to import the provided SQL dump into your PostgreSQL container:

   ### Unix (Linux and macOS)

   ```bash
   docker exec -i postgres-marketplace psql -U <YOUR_DB_USER> -d <YOUR_DB_NAME> < dump_27_oct_2024.sql
   ```

   ### Windows

   ```powershell
   type dump_27_oct_2024.sql | docker exec -i postgres-marketplace psql -U <YOUR_DB_USER> -d <YOUR_DB_NAME>
   ```

   Replace `<YOUR_DB_USER>` and `<YOUR_DB_NAME>` with your actual database username and name as specified in the `.env` file.

4. **Build and Run Containers**

   Use Docker Compose to build and run the project. By default, the Next.js application will be exposed on port 80. You can change this to another port, such as 3000, by modifying the `ports` section in `docker-compose.yml`.

   ```bash
   docker compose up --build
   ```

   This command will:

   - Build the Docker images for both the PostgreSQL and Next.js services.
   - Start the containers and initialize the necessary networks and volumes.

5. **Access the Application**

   Once the containers are up and running, you can access the Next.js application at [http://localhost](http://localhost) if you are using port 80. If you've changed the port, access it at `http://localhost:<NEW_PORT>`.

## Docker Compose Configuration

- **Database Service** (`postgres-marketplace`):

  - A PostgreSQL container with a health check to ensure it's ready before Next.js starts.
  - Uses an external volume for data persistence: `marketplace-postgres-data`.

- **Next.js Service** (`nextjs-app`):
  - A Next.js container exposed on port 80 by default, but this can be changed to 3000 or any other available port for local development.
  - Mounts two external volumes for `protected_images` and `public_images` to ensure image persistence.

## Notes

- Ensure that Docker volumes `marketplace-postgres-data`, `marketplace-nextjs-protected-images`, and `marektplace-nextjs-public-images` are created and accessible as external volumes.
- The `internal-network` is used for internal communication between services, while the `external-network` is available for outside access. `external-network` must be initialized manually.

## Troubleshooting

- **Database Issues**: Ensure the PostgreSQL database container is running and accessible before trying to restore or connect from the Next.js app.
- **Volume Issues**: If image persistence isn't working, check that the `protected_images` and `public_images` folders are correctly mounted and the volumes are configured as external.

For more detailed logs, you can view them using:

```bash
docker compose logs -f
```
