module.exports = {
  apps : [{
    name: "API",
    script: "./build/apps/api/app.js",
    instances: 2,
    exec_mode: "cluster",
    watch: false,
    autorestart: true
  }, {
    name: "JOBS",
    script: "./build/apps/scheduledTasks/scheduledTasks.js",
    exec_mode: "fork",
    watch: false,
    autorestart: true
  }]
};
