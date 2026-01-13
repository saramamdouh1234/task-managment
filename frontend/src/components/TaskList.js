import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.getTasks();
      console.log(res.data);
      setTasks(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateTask(id, { status });
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      <TaskForm onTaskCreated={fetchTasks} />

      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>

              <select
                className="task-status"
                value={task.status}
                onChange={e => handleStatusChange(task.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <button
                className="task-delete"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
