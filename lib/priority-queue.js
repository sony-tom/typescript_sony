"use strict";
const tasks = [
    { id: 5, name: "Handing over", priority: 5 },
    { id: 1, name: "Debug issue", priority: 1 },
    { id: 2, name: "Write docs", priority: 4 },
    { id: 3, name: "Test feature", priority: 2 },
    { id: 4, name: "Unit Testing", priority: 3 },
];
function prioritySort(tasks) {
    let sortedTasks = tasks.slice();
    if (sortedTasks.length > 0) {
        return sortedTasks.sort((task1, task2) => task1.priority - task2.priority);
    }
    else {
        return "No Tasks";
    }
}
console.log(prioritySort(tasks));
console.log("Original array", tasks);
