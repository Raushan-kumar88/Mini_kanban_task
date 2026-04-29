import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./components/Task";
const baseUrl = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(baseUrl);
      console.log(data, "res data")
      if (data?.status === 200) {
        setTasks(data?.tasks);
      } else {
        setTasks([])
      }
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header part */}
      <div className="bg-white shadow p-5 flex justify-between">
        <h1 className="text-xl font-semibold">Mini Kanban Task Manager</h1>
        <span className="text-blue-500">{tasks.length} Tasks</span>
      </div>

      {error && <p className="p-5 text-red-500">{error}</p>}
      <Task tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks} setError={setError} />
     
    </div>
  );
}

export default App;