module.exports = {
    apps: [
        {
            name: 'sanb',       // Application name
            script: './app.js',            // Path to your main file
            instances: 'max',              // Use all available CPUs
            exec_mode: 'cluster',          // Run in cluster mode
            env: {
                NODE_ENV: 'development',    // Environment for development
                PORT: 3000                   // Default port
            },
            env_production: {
                NODE_ENV: 'production',     // Environment for production
                PORT: 3000                   // Default port for production
            }
        }
    ]
};
