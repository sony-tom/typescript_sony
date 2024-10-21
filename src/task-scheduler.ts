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
  schedule: string;
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
  tasks: Map<string, ScheduledTask>;
  tasksExecuting: Map<string, TaskExecution>;
  maxConcurrent: number;
  timezone: string;

  constructor(options: { maxConcurrent?: number; timezone?: string } = {}) {
    this.tasks = new Map();
    this.tasksExecuting = new Map();
    this.maxConcurrent = 5;
    this.timezone = "UTC + 5";
  }

  schedule<T>(task: ScheduledTask<T>): void {
    if (this.tasks.has(task.id)) {
      console.log("Task already scheduled");
    } else {
      console.log("Task Scheduling");
      this.tasks.set(task.id, task);
    }
  }

  unschedule(taskId: string): void {
    if (this.tasks.has(taskId)) {
      this.tasks.delete(taskId);
      console.log(`${taskId} - Task Unscheduled`);
    }
  }

  pause(taskId: string): void {
    console.log(`${taskId} -- Task paused`);
  }

  resume(taskId: string): void {
    console.log(`${taskId} -- Task resumed`);
  }

  getNextRunTime(taskId: string): Date | null {
    if (this.tasks) {
      const task = this.tasks.get(taskId);
      if (!task) {
        console.log("No task found");
      }
    }
    return new Date();
  }
  // getTaskHistory(taskId: string): Promise<TaskExecution[]>;

  // on(
  //   event: "taskStart" | "taskComplete" | "taskFail",
  //   handler: (execution: TaskExecution) => void
  // ): void {
  //   if (this.tasksExecuting.size < this.maxConcurrent) {
  //     this.tasksExecuting.set(execution.taskId, execution);
  //   }
  // }
}

const Scheduler = new TaskScheduler({ maxConcurrent: 5, timezone: "time" });

Scheduler.schedule({
  id: "1",
  name: "New Task",
  execute: () =>
    new Promise((resolve, reject) => {
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
Scheduler.getNextRunTime("1");
