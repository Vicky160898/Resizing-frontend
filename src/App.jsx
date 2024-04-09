import { Button } from "./components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButtonClick = () => {
    if (editMode) {
      setDisplayText(inputValue);
      setEditMode(false);
      setInputValue("");
    } else {
      setDisplayText("");
      setInputValue("");
      setEditMode(true);
    }
  };

  const handleEditButtonClick = () => {
    setInputValue(displayText);
    setEditMode(true);
  };

  return (
    <>
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
              <span className="font-semibold">Text:</span> {displayText}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Text: </span> {displayText}
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Text: </span> {displayText}
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
          disabled={!editMode}
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
