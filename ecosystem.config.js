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
    name: "Fuel stations JOB",
    script: "./build/apps/scheduledTasks/jobs/FuelStationsJob.js",
    exec_mode: "fork",
    watch: false,
    autorestart: false,
    cron_restart: "0 6,13,19 * * *",
  }, {
    name: "Notifications JOB",
    script: "./build/apps/scheduledTasks/jobs/NotificationsJob.js",
    exec_mode: "fork",
    watch: false,
    autorestart: false,
    cron_restart: "30 6,13,19 * * *",
  }, {
    name: "CCAAs JOB",
    script: "./build/apps/scheduledTasks/jobs/CCAAJob.js",
    exec_mode: "fork",
    watch: false,
    autorestart: false,
    cron_restart: "0 0 * * 0",
  }]
};
