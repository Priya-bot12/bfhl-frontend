import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const filterOptions = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highestAlphabet", label: "Highest Alphabet" }
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [data, setData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "22BCS15310"; // Set the website title to your roll number
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) throw new Error("Invalid JSON format");

      setError(""); // Clear errors if JSON is valid

      // Call backend API (Replace with your actual backend URL)
      const response = await axios.post("http://localhost:5000/api/process", parsedData);
      setData(response.data);
    } catch (err) {
      setError(err+"Invalid JSON! Please enter a valid format.");
    }
  };

  const getFilteredData = () => {
    if (!data) return null;

    let result = {};
    if (selectedFilters.some((f) => f.value === "alphabets")) {
      result.alphabets = data.alphabets;
    }
    if (selectedFilters.some((f) => f.value === "numbers")) {
      result.numbers = data.numbers;
    }
    if (selectedFilters.some((f) => f.value === "highestAlphabet")) {
      result.highestAlphabet = data.highestAlphabet;
    }
    return result;
  };

  return (
    <div className="container">
      <h1>Frontend App</h1>

      <textarea
        placeholder='Enter JSON (e.g. {"data":["A","1","B","3"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <Select
            isMulti
            options={filterOptions}
            onChange={setSelectedFilters}
            placeholder="Select filters"
          />

          <div className="output">
            <h3>Filtered Response:</h3>
            <pre>{JSON.stringify(getFilteredData(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
