# Getting Started with News Aggregator App

This is a simple React application for news aggregation. The application is created using Create React App with TypeScript, 
and it utilizes the Material-UI library for components. 
Styles are configured with Tailwind CSS. The entire project can be easily launched in a Docker container.

## Available Scripts

To run the project:

1. **Build Docker image:**
   ```bash
   docker build -t news-aggregator:latest .
   
2. **Run:**
      ```bash
   docker run -p 8080:3000 -d news-aggregator:latest

Application check:

Open your web browser and go to http://localhost:8080.

Additional instructions Environment Variables Setup:

If your application uses environment variables, make sure they are properly
configured when starting the Docker container.

**Development**:

If you want to make changes to the application, you can use the `npm start`
command to run the application in development mode.

Project Structure:

-   **src:** Code and React components.
-   **public:** Static resources and HTML files.
-   **Dockerfile:** Instructions for building the Docker image.
