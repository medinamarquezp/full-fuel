/* eslint-disable no-useless-escape */
module.exports = {
  apps : [{
    name: "API",
    script: "./build/apps/api/app.js",
    instances: 1,
    exec_mode: "cluster",
    time: true,
    watch: true,
    ignore_watch : ["node_modules", "patches", "tests", "logs", "build", "\.git"],
    autorestart: true
  }, {
    name: "FuelStationsJob",
    script: "./build/apps/scheduledTasks/jobs/FuelStationsJob.js",
    exec_mode: "fork",
    time: true,
    watch: false,
    cron_restart: "*/20 * * * *",
    autorestart: false
  }, {
    name: "NotificationsJob",
    script: "./build/apps/scheduledTasks/jobs/NotificationsJob.js",
    exec_mode: "fork",
    time: true,
    watch: false,
    cron_restart: "30 6,13,19 * * *",
    autorestart: false
  }, {
    name: "CCAAJob",
    script: "./build/apps/scheduledTasks/jobs/CCAAJob.js",
    exec_mode: "fork",
    time: true,
    watch: false,
    cron_restart: "0 0 * * 0",
    autorestart: false
  }, {
    name: "RemovePricesJob",
    script: "./build/apps/scheduledTasks/jobs/RemovePricesJob.js",
    exec_mode: "fork",
    time: true,
    watch: false,
    cron_restart: "0 7 1 * *",
    autorestart: false
  }]
};
