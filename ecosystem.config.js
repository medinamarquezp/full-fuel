module.exports = {
  apps : [{
    name: "API",
    script: "./build/apps/api/app.js",
    instances: 2,
    exec_mode: "cluster",
    time: true,
    watch: true,
    ignore_watch : ["node_modules", "patches", "tests", "logs", "build"],
    autorestart: true
  }, {
    name: "JOBS",
    script: "./build/apps/scheduledTasks/scheduledTasks.js",
    instances: 1,
    exec_mode: "cluster",
    time: true,
    watch: false,
    autorestart: false,
    max_memory_restart: "1500M"
  }]
};
