import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import "./CommandPalette.css";

const CommandPalette = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchOptions = ["Barrel Roll", "Dino", "Fade Away"];

  const filterSearchOptions = !searchQuery
    ? []
    : searchOptions.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleOptionSelected = (optionSelected: string): void => {
    switch (optionSelected) {
      case "Barrel Roll":
        document.body.classList.add("barrelroll");
        setTimeout(() => document.body.classList.remove("barrelroll"), 4000);
        break;
      case "Dino":
        window.location.href = "https://offline-dino-game.firebaseapp.com/";
        break;
      case "Fade Away":
        document.body.classList.add("fade");
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleCommandPaletteToggle = (event: KeyboardEvent) => {
      if (event.key === "q" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleCommandPaletteToggle);
    return () => {
      window.removeEventListener("keydown", handleCommandPaletteToggle);
    };
  }, [isOpen]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setSearchQuery("")}
    >
      <Dialog
        onClose={() => setIsOpen(!isOpen)}
        className="fixed inset-0 overflow-y-auto px-6 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-600/60" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            value=""
            className="relative mx-auto max-w-xl divide-y rounded-xl bg-white shadow-2xl ring-1 ring-gray-800/5"
            onChange={(optionSelected: string) => {
              handleOptionSelected(optionSelected);
            }}
          >
            <div className="flex items-center px-4">
              <span className="material-icons-outlined text-slate-500">
                search
              </span>
              <Combobox.Input
                className="my-1 w-full border-none bg-transparent text-xl text-slate-500 placeholder:font-poppins placeholder:text-slate-400 focus:ring-0 focus:ring-transparent"
                placeholder="Search . . ."
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
            </div>
            {filterSearchOptions.length > 0 && (
              <Combobox.Options
                className="scrollbar max-h-96 space-y-1 overflow-y-auto py-3"
                static
              >
                {filterSearchOptions.length > 0 &&
                  filterSearchOptions.map((searchOption: string) => {
                    return (
                      <Combobox.Option
                        className="font-poppins"
                        key={searchOption}
                        value={searchOption}
                      >
                        {({ active }) => (
                          <div
                            className={`w-full py-2 pl-5 ${
                              active
                                ? "cursor-pointer bg-emerald-500 text-white"
                                : ""
                            }`}
                          >
                            <span>{searchOption}</span>
                          </div>
                        )}
                      </Combobox.Option>
                    );
                  })}
              </Combobox.Options>
            )}
            {filterSearchOptions.length === 0 && searchQuery && (
              <p className="py-3 pl-5 font-poppins">No Results Found 🙈</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
