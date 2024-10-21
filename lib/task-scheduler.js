"use strict";
class TaskScheduler {
    // constructor(options: {
    //     maxConcurrent?: number;
    //     timezone?: string;
    //     allTasks: ScheduledTask[]
    // });
    schedule(task) {
        return task;
        //   allTasks.push
    }
    unschedule(taskId) {
        return `${taskId}Task Unscheduled`;
    }
    pause(taskId) {
        return `${taskId}Task paused`;
    }
    resume(taskId) {
        return `${taskId}Task resumed`;
    }
    getNextRunTime(taskId) {
        return `${taskId}Next run time`;
    }
}
const Scheduler = new TaskScheduler();
console.log(Scheduler.schedule({
    id: "1",
    name: "New Task",
    execute: () => new Promise((resolve, reject) => {
        console.log("Promise error found");
    }),
    schedule: "*/5",
    timeout: 1000,
    retryPolicy: {
        maxAttempts: 3,
        backoffMs: 1,
        exponential: true,
        maxBackoffMs: 2,
        //   retryableErrors?: Array<new (...args: any[]) => Error>;
    },
    priority: 2,
    tags: ["Compilation error", "Runtime error"],
}));
console.log(Scheduler.unschedule("1"));
console.log(Scheduler.pause("1"));
console.log(Scheduler.resume("1"));
console.log(Scheduler.getNextRunTime("1"));
