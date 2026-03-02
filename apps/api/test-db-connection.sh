#!/bin/bash

# Configuration
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH=$JAVA_HOME/bin:$PATH
JAVA_COMMAND="java"
JAR_PATH="target/api-0.0.1-SNAPSHOT.jar"

echo "🔍 Building API to ensure latest changes are included..."
./mvnw clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for compilation errors."
    exit 1
fi

echo "🚀 Running Database Connection Test with 'db-test' profile..."

# Load .env variables if they exist
if [ -f ../.env ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

echo "🚀 Option 1: Running Standalone JDBC Test (Fast)..."
# Download JDBC driver if missing
if [ ! -f "postgresql-42.3.2.jar" ]; then
    echo "📦 Downloading PostgreSQL driver..."
    mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.postgresql:postgresql:42.3.2:jar -Ddest=postgresql-42.3.2.jar
fi

# Compile and Run Standalone
javac src/test/java/com/orthopedic/api/PostgresqlExample.java -d .
java -cp ".:postgresql-42.3.2.jar" PostgresqlExample

echo ""
echo "🚀 Option 2: Running Optimized Spring Boot Test..."
$JAVA_COMMAND -Dspring.profiles.active=db-test -jar $JAR_PATH
