import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [localStorageData, setLocalStorageData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const loadDataFromLocalStorage = () => {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      data.push({ key, value: parsedValue });
    }
    setLocalStorageData(data);
  };

  const addToLocalStorage = () => {
    if (item.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 500);
      return;
    }
    const randomKey = Math.random().toString();
    const newItem = { item };
    localStorage.setItem(randomKey, JSON.stringify(newItem));
    loadDataFromLocalStorage();
    setItem("");
  };

  const deleteFromLocalStorage = (key) => {
    localStorage.removeItem(key);
    loadDataFromLocalStorage();
  };

  const updateFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    localStorage.removeItem(key);
    loadDataFromLocalStorage();
    const parsedData = JSON.parse(data);
    setItem(parsedData.item);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setLocalStorageData([]);
  };

  return (
    <div className="App">
      <div className="card">
        <h2 className="card-title">To Do List</h2>
        <div className="card-body">
          <label htmlFor="itemInput" className="label">
            Enter your Item :
          </label>
          <input
            id="itemInput"
            className="input"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          {error && <p className="error">*Enter at least one character</p>}
          <div className="button-container">
            <button className="button_add" onClick={addToLocalStorage}>
              Add into List
            </button>
            <button className="button_clear" onClick={clearLocalStorage}>
              Clear Data
            </button>
          </div>
        </div>
      </div>

      <div className="items-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th
                className="table-cell"
                colSpan={4}
                style={{ textAlign: "center" }}
              >
                Items List
              </th>
            </tr>
          </thead>

          <tbody>
            {localStorageData.length > 0 &&
              localStorageData.map((item, index) => (
                <tr key={item.key} className="table-row">
                  <td className="table-cell_sno">
                    <b>{index + 1}</b>
                  </td>
                  <td className="table-cell">{item.value.item}</td>
                  <td className="table-cell_b" style={{ textAlign: "center" }}>
                    <button
                      className="delete-button"
                      onClick={() => deleteFromLocalStorage(item.key)}
                    >
                      Completed
                    </button>
                  </td>
                  <td className="table-cell_b" style={{ textAlign: "center" }}>
                    <button
                      className="update-button"
                      onClick={() => updateFromLocalStorage(item.key)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
