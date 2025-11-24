import React, { useEffect, useState } from "react";
import axios from "../api"; 

const TaskList = ({ refresh, onEdit }) => {
  const [tasks, setTasks] = useState([]);

  // Charge les tâches à chaque refresh
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches :", error);
      }
    };

    fetchTasks();
  }, [refresh]);


  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      try {
        await axios.delete(`/tasks/${id}`);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="mt-3">
      {tasks && tasks.length > 0 ? (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
            >
              <div>
                <strong>{task.title}</strong>
                {task.description && (
                  <p className="mb-0 text-muted small">{task.description}</p>
                )}
              </div>
              <div className="mt-2 mt-md-0">
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(task)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune tâche pour le moment.</p>
      )}
    </div>
  );
};

export default TaskList;
