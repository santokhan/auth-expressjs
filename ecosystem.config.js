export default {
    apps: [
        {
            name: 'sanb',       // Application name
            script: './app.js',            // Path to your main file
            instances: 'max',              // Use all available CPUs
            exec_mode: 'cluster',          // Run in cluster mode
        }
    ]
}