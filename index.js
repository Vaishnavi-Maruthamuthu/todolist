const toggleBtn = document.getElementById("themeToggle");
toggleBtn.onclick = () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  toggleBtn.textContent = isDark ? "🔆" : "🌙";
};
const taskList = document.getElementById("taskList");
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}
function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  attachItemHandlers();
}
function attachItemHandlers() {
  taskList.querySelectorAll("li").forEach(li => {
    const cb = li.querySelector("input[type='checkbox']");
    const btn = li.querySelector("button");
    cb.onchange = () => {
      li.classList.toggle("completed", cb.checked);
      saveTasks();
    };
    btn.onclick = () => {
      li.remove();
      saveTasks();
    };
  });
}
document.getElementById("todoForm").onsubmit = e => {
  e.preventDefault();
  const t = document.getElementById("taskInput").value;
  const due = document.getElementById("taskTime").value;
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox">
    <span>${t}${due ? " (Due: " + due + ")" : ""}</span>
    <button>❌</button>
  `;
  taskList.append(li);
  document.getElementById("taskInput").value = "";
  document.getElementById("taskTime").value = "";
  attachItemHandlers();
  saveTasks();
};
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "🔆";
}
loadTasks();
