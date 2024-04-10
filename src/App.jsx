import { Button } from "./components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get");
      console.log(response.data.data.text);
      setDisplayText(response.data.data.text);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/count");
      console.log(response.data.data);
      setCount(response.data.data.count);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUpdateCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/count/update"
      );
      console.log(response.data.data);
      setCount1(response.data.data.count);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCount();
    fetchData();
    fetchUpdateCount();
  }, [editMode]); // Trigger fetchData whenever editMode changes

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButtonClick = async () => {
    if (editMode) {
      try {
        setIsLoading(true);
        let url = "http://localhost:8080/api/add/text";
        if (displayText !== "") {
          // Check if displayText is not empty, then update
          url = "http://localhost:8080/api/update/text";
        }
        await axios.post(url, {
          text: inputValue,
        });
        setEditMode(false);
        setInputValue("");
        fetchData(); // Fetch updated data after adding or updating
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setInputValue("");
      setEditMode(true);
    }
  };

  const handleEditButtonClick = () => {
    setInputValue(displayText); // Set input value to current display text
    setEditMode(true);
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-[95%] lg:w-[90%] m-auto mt-10 lg:mt-20 h-[450px] 2xl:h-[800px]">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full rounded-lg border-4"
        >
          <ResizablePanel
            defaultSize={50}
            className="flex justify-center items-center"
          >
            <div className="mt-4">
              <p>
                <span className="font-semibold">Text:</span> {displayText}{" "}
              </p>
              <p>Post Api Count:- {count}</p>
              <p>Update Api Count:- {count1}</p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="mt-4">
                  <p>
                    <span className="font-semibold">Text:</span> {displayText}{" "}
                  </p>
                  <p>Post Api Count:- {count}</p>
                  <p>Update Api Count:- {count1}</p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={75}>
                <div className="mt-4">
                  <p>
                    <span className="font-semibold">Text:</span> {displayText}{" "}
                  </p>
                  <p>Post Api Count:- {count}</p>
                  <p>Update Api Count:- {count1}</p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="flex flex-col items-center justify-center p-6">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
          className="border border-gray-300 p-2 mb-2 rounded-md"
          disabled={!editMode || isLoading}
        />
        <div className="flex gap-4">
          <Button onClick={handleAddButtonClick} className="p-4 text-xl">
            {editMode ? "Save" : "Add"}
          </Button>
          <Button onClick={handleEditButtonClick} className="p-4 text-xl">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
export default App;
