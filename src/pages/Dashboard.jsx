import React, { useState } from "react";
import TaskList from "../components/TasksList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // ⚡ Appelé quand une tâche est ajoutée ou modifiée
  const handleTaskAdded = () => {
    setRefresh(!refresh);
    setTaskToEdit(null); // on réinitialise le formulaire
  };

  // ⚡ Lorsqu'on clique sur "Modifier"
  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <TaskForm onTaskAdded={handleTaskAdded} taskToEdit={taskToEdit} />
          </div>
          <div className="col-md-8">
            <TaskList refresh={refresh} onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
