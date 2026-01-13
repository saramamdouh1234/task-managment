import React, { useState } from 'react';
import api from '../services/api';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setErrorMessage('Title and Description are required');
      return;
    }

    try {
      await api.createTask({ title, description });
      setTitle('');
      setDescription('');
      setErrorMessage('');
      onTaskCreated();
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      setErrorMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br/>

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br/>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
