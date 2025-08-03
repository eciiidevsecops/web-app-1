# Use the official MySQL 8.0 image as the base image for this Dockerfile
FROM mysql:8.0

# Copy the schema.sql file into the Docker image's initialization directory.
# Any .sql files in /docker-entrypoint-initdb.d/ are automatically executed by MySQL when the container starts for the first time.
COPY ./schema.sql /docker-entrypoint-initdb.d/ 