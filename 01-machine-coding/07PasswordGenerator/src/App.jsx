import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./Components/Button";
import Checkbox from "./Components/Checkbox";
import usePasswordGenerator from "./hook/usePasswordGeerator";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };
  const {password, errorMessage, generatePassword} = usePasswordGenerator()

  return (
    <div className="p-5 w-3/5 ml-48 mt-32 bg-slate-900">
      {password ? (
        <div className="flex justify-between">
        <div className="text-white">{password}</div>

        <Button onClick={handleCopy} text={copied ? "Copied" : "copy"} />
      </div>
      ): null}

      <div className="mt-5">
        <span className="flex justify-between pr-7 font-bold text-white">
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          className="w-[80%] mt-3"
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 p-4">
        {checkboxData.map((checkbox, i) => (
          <Checkbox
            key={i}
            title={checkbox.title}
            onChange={() => handleCheckboxChange(i)}
            state={checkbox.state}
          />
        ))}
      </div>

      <div className="mt-9 text-center">
        <Button text="Generate Password"  onClick={() => generatePassword(checkboxData, length)} />
      </div>
    </div>
  );
}

export default App;
