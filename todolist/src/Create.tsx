import { useState } from "react";
import axios from "axios";

interface CreateProps {
  onAddSuccess: () => void;
}

function Create({ onAddSuccess }: CreateProps) {
  const [task, setTask] = useState<string>("");
  const handleAdd = () => {
    if (!task.trim()) return;
    axios
      .post("http://localhost:3001/add", { task })
      .then(() => {
        setTask("");
        onAddSuccess();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
