import { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = "/api/tasks";


    // Get tasks
    const fetchTasks = async () => {

        try {

            const response = await fetch(API_URL);
            const data = await response.json();

            setTasks(data);

        } catch (error) {

            console.error("Error fetching tasks:", error);

        }

    };


    // Load tasks when application starts
    useEffect(() => {

        fetchTasks();

    }, []);


    // Add task
    const addTask = async () => {

        if (!title.trim()) {
            return;
        }

        setLoading(true);

        try {

            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title
                })

            });

            setTitle("");

            await fetchTasks();

        } catch (error) {

            console.error("Error adding task:", error);

        } finally {

            setLoading(false);

        }

    };


    // Delete task
    const deleteTask = async (id) => {

        try {

            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            await fetchTasks();

        } catch (error) {

            console.error("Error deleting task:", error);

        }

    };


    return (

        <div className="container">

            <h1>Task Manager</h1>

            <div className="input-section">

                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={addTask}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>

            </div>


            <div className="task-list">

                {tasks.length === 0 ? (

                    <p>No tasks found.</p>

                ) : (

                    tasks.map((task) => (

                        <div
                            className="task"
                            key={task.id}
                        >

                            <span>
                                {task.title}
                            </span>

                            <button
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default App;