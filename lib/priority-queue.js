"use strict";
const projects = [
    { name: "Project A", priority: 2, deadline: new Date("2023-12-31") },
    { name: "Project B", priority: 1, deadline: new Date("2023-11-30") },
];
// interface Task extends Sortable {
//   id: number;
//   name: string;
//   priority: number;
// }
// const tasks: Task[] = [
//   { id: 5, name: "Handing over", priority: 5 },
//   { id: 1, name: "Debug issue", priority: 1 },
//   { id: 2, name: "Write docs", priority: 4 },
//   { id: 3, name: "Test feature", priority: 2 },
//   { id: 4, name: "Unit Testing", priority: 3 },
// ];
function prioritySort(items) {
    if (!items || items.length === 0) {
        return [];
    }
    return [...items].sort((a, b) => a.priority - b.priority);
}
console.log(prioritySort(projects));
console.log("Original array", projects);
