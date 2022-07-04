import React from "react";
import CommandPalette from "./components/CommandPalette";

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-[#93a5cf] to-[#e4efe9] font-poppins">
      <h1 className="w-11/12 text-center text-2xl leading-loose sm:text-4xl sm:leading-relaxed">
        Want to see sometime cool 👓? Try pressing&nbsp;
        <kbd className="rounded-lg border-2 border-gray-500/30 p-2 shadow-md shadow-slate-400">
          Ctrl
        </kbd>
        {" + "}
        <kbd className="rounded-lg border-2 border-gray-500/30 p-2 shadow-md shadow-slate-400">
          Q
        </kbd>
      </h1>
      <CommandPalette />
    </div>
  );
}

export default App;
