module.exports = {
  apps : [{
    name: "API",
    script: "./build/apps/api/app.js",
    instances: 2,
    exec_mode: "cluster",
    watch: true,
    ignore_watch : ["node_modules", "patches", "tests", "logs", "build"],
    autorestart: true
  }, {
    name: "JOBS",
    script: "./build/apps/scheduledTasks/scheduledTasks.js",
    exec_mode: "fork",
    watch: true,
    ignore_watch : ["node_modules", "patches", "tests", "logs", "build"],
    autorestart: true
  }]
};