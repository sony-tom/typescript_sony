interface RetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  exponential?: boolean;
  maxBackoffMs?: number;
  retryableErrors?: Array<new (...args: any[]) => Error>;
}

interface ScheduledTask<T = any> {
  id: string;
  name: string;
  execute: () => Promise<T>;
  schedule: string; // Cron expression
  timeout?: number;
  retryPolicy?: RetryPolicy;
  priority?: number;
  tags?: string[];
}

interface TaskExecution {
  taskId: string;
  startTime: Date;
  endTime?: Date;
  status: "running" | "completed" | "failed" | "retry";
  attempt: number;
  result?: any;
  error?: Error;
}

class TaskScheduler {
  // constructor(options: {
  //     maxConcurrent?: number;
  //     timezone?: string;
  //     allTasks: ScheduledTask[]
  // });

  schedule(task: ScheduledTask<{}>) {
    return task;
    //   allTasks.push
  }

  unschedule(taskId: string) {
    return `${taskId}Task Unscheduled`;
  }

  pause(taskId: string) {
    return `${taskId}Task paused`;
  }

  resume(taskId: string) {
    return `${taskId}Task resumed`;
  }

  getNextRunTime(taskId: string) {
    return `${taskId}Next run time`;
  }
  // getTaskHistory(taskId: string): Promise<TaskExecution[]>;

  // on(event: 'taskStart' | 'taskComplete' | 'taskFail', handler: (execution: TaskExecution) => void): void;
}

const Scheduler = new TaskScheduler();

console.log(
  Scheduler.schedule({
    id: "1",
    name: "New Task",
    execute: () =>
      new Promise((resolve, reject) => {
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
  })
);

console.log(Scheduler.unschedule("1"));
console.log(Scheduler.pause("1"));
console.log(Scheduler.resume("1"));
console.log(Scheduler.getNextRunTime("1"));
