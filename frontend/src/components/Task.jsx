import React from 'react'
import { useState } from 'react';
import axios from "axios";
const baseUrl = "https://mini-kanban-task.onrender.com/tasks";
const Task = ({ tasks, setTasks, fetchTasks, setError }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const addTask = async () => {
        if (!input.trim()) return;
        setLoading(true)
        try {
            const { data } = await axios.post(baseUrl, { title: input });
            if (data?.status === 201) {
                setInput("");
                setTimeout(() => {
                    setLoading(false)
                    fetchTasks();
                }, 100);
            }
        } catch {
            setLoading(false)
            setError("Failed to add task");
        }
    };

    const updateTask = async (id, status) => {
        try {
            const { data } = await axios.put(`${baseUrl}/${id}`, { status });
            if (data?.status === 200) {
                fetchTasks();
            }
        } catch {
            setError("Failed to update");
        }
    };

    const deleteTask = async (id) => {
        try {
            const { data } = await axios.delete(`${baseUrl}/${id}`);
            if (data?.status === 200) {
                alert(data?.message || "task deleted successfully")
                fetchTasks();
            }
        } catch {
            setError("Failed to delete");
        }
    };

    const todo = tasks?.filter((txt) => txt?.status === "todo");
    const done = tasks?.filter((txt) => txt?.status === "done");
    return (
        <>
            <div className="p-5 grid grid-cols-2 gap-5">
                {/* TODO Taks List*/}
                <div className="bg-white p-5 rounded-xl">
                    <h2 className="text-blue-500 font-semibold mb-3">
                        To Do ({todo.length})
                    </h2>

                    <div className="flex gap-2 mb-4">
                        <input
                            className="border p-2 rounded w-full"
                            placeholder="Enter task..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            onClick={addTask}
                            className="bg-blue-500 flex-nowrap text-white px-4 rounded"
                        >
                            {loading ? 'loading...' : '+ Add'}
                        </button>
                    </div>

                    {todo && todo.map((task) => (
                        <div
                            key={task.id}
                            className="bg-gray-50 flex items-center justify-between p-4 rounded shadow mb-3"
                        >
                            <p>{task.title}</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => updateTask(task.id, "done")}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Done
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DONE Tasks List */}
                <div className="bg-white p-5 rounded-xl">
                    <h2 className="text-green-500 font-semibold mb-3">
                        Done ({done.length})
                    </h2>

                    {done && done.map((task) => (
                        <div
                            key={task.id}
                            className="bg-gray-50 flex items-center justify-between p-4 rounded shadow mb-3"
                        >
                            <p>{task.title}</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => updateTask(task.id, "todo")}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Undo
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Task