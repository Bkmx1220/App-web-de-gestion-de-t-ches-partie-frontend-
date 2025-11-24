import React, { useState, useEffect } from "react";
import axios from "../api"; 

const TaskForm = ({ onTaskAdded, taskToEdit }) => {
  const [task, setTask] = useState({ title: "", description: "" });

 
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
    } else {
      setTask({ title: "", description: "" });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        // ✍️ Si une tâche est en édition → PUT
        await axios.put(`/tasks/${taskToEdit.id}`, task);
      } else {
        // 🆕 Sinon → POST
        await axios.post("/tasks", task);
      }

      setTask({ title: "", description: "" });
      onTaskAdded(); // 🔥 Rafraîchit la liste dans Dashboard.jsx
    } catch (error) {
      console.error("Erreur lors de la création/modification de la tâche :", error);
      alert("❌ Impossible de créer la tâche !");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Titre"
              className="form-control"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Description"
              className="form-control"
              rows="3"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {taskToEdit ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
