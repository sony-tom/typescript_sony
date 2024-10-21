"use strict";
class TaskScheduler {
    constructor(options = {}) {
        this.tasks = new Map();
        this.maxConcurrent = 5;
        this.timezone = "UTC + 5.5";
    }
    schedule(task) {
        if (this.tasks.has(task.id)) {
            console.log("Task already scheduled");
        }
        else {
            console.log("Task Scheduling");
            this.tasks.set(task.id, task);
        }
        return this.tasks;
    }
    unschedule(taskId) {
        if (this.tasks.has(taskId)) {
            this.tasks.delete(taskId);
            console.log(`${taskId} - Task Unscheduled`);
        }
        return this.tasks;
    }
    pause(taskId) {
        console.log(`${taskId} -- Task paused`);
        return this.tasks;
    }
    resume(taskId) {
        console.log(`${taskId} -- Task resumed`);
        return this.tasks;
    }
    getNextRunTime(taskId) {
        if (this.tasks) {
            const task = this.tasks.get(taskId);
            if (!task) {
                console.log("No task found");
            }
        }
        return `${taskId + new Date() + 1} -- Next run time`;
    }
}
const Scheduler = new TaskScheduler({ maxConcurrent: 5, timezone: "time" });
Scheduler.schedule({
    id: "1",
    name: "New Task",
    execute: () => new Promise((resolve, reject) => {
        console.log("Task scheduled");
    }),
    schedule: "*/5",
    timeout: 1000,
    retryPolicy: {
        maxAttempts: 3,
        backoffMs: 1,
        exponential: true,
        maxBackoffMs: 2,
        // retryableErrors?: Array<new (...args: any[]) => Error>;
    },
    priority: 2,
    tags: ["Compilation error", "Runtime error"],
});
Scheduler.unschedule("1");
Scheduler.pause("1");
Scheduler.resume("1");
console.log(Scheduler.getNextRunTime("1"));
