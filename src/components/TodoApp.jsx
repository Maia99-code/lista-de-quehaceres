import React, { useState, useEffect } from "react";

const TodoApp = () => {
  // Función para obtener las tareas almacenadas en localStorage
  const initialTasks = () => {
    const localStorageTasks = localStorage.getItem("tasks");
    return localStorageTasks ? JSON.parse(localStorageTasks) : [];
  };

  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState(initialTasks);

  // Estado para manejar el texto de la nueva tarea
  const [newTask, setNewTask] = useState("");

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Función para manejar el cambio en el input de nueva tarea
  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  // Función para agregar una nueva tarea
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = { text: newTask, completed: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask(""); // Limpiar el input después de agregar
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Función para marcar una tarea como completada
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Escribe una nueva tarea"
        />
        <button onClick={addTask}>Agregar Tarea</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
