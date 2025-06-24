import { Add, Close, Delete } from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import Modal from '~/core/ui/Modal';

const ToDoListModal = ({ ticketId, open, handleClose }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  if (!open) return null;

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <DialogTitle
        component={'div'}
        className="flex flex-row items-start gap-2"
      >
        <h3 className="flex-1 text-xl font-bold text-white">To-Do List</h3>
        <button
          onClick={handleClose} // Chama a função passada como prop para fechar
          className="cursor-pointer text-zinc-400 hover:text-zinc-200"
        >
          <Close />
        </button>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="input w-full"
          />
          <button
            type="button"
            className="w-12 cursor-pointer rounded-md bg-zinc-700 text-zinc-400 hover:text-zinc-200"
            disabled={!newTask.trim()}
            onClick={handleAddTask}
          >
            <Add />
          </button>
        </div>

        <ul className="mt-2 max-h-60 space-y-2 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center rounded-md p-2 transition-colors hover:bg-zinc-700/50"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="h-5 w-5 cursor-pointer rounded border-zinc-500 bg-zinc-600 text-zinc-500 focus:ring-zinc-500"
              />
              <span
                className={`ml-3 flex-grow ${
                  task.completed
                    ? 'text-zinc-500 line-through'
                    : 'text-zinc-200'
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="ml-3 cursor-pointer p-1 text-zinc-500 transition-colors hover:text-white"
              >
                <Delete size={18} />
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Modal>
  );
};

export default ToDoListModal;
