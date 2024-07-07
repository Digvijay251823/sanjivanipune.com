import TableViewControll from "@/Utils/Icons/TableViewControll";
import { useGlobalState } from "@/Utils/State";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

interface DataTableComponenProps {
  options: string[];
  handleCustomisation: (object: any) => void;
  handleHidables: ({ value }: { value: string }) => void;
  columnNames: { columnName: string; field: string }[];
}

const DataTableComponent: React.FC<DataTableComponenProps> = ({
  options,
  handleCustomisation,
  handleHidables,
  columnNames,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<{ cellSize: string }>({
    cellSize: "normal",
  });
  const { state } = useGlobalState();

  function handleCkeck(object: any) {
    setSelected(object);
    handleCustomisation(object);
  }

  const openDataTable = () => {
    setIsOpen(true);
  };

  const closeDataTable = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={componentRef}>
      <div className="flex justify-end">
        <button>
          <TableViewControll
            handleClick={isOpen ? closeDataTable : openDataTable}
          />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 transition-transform duration-300 transform z-[2500] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`m-2 rounded-3xl h-[96vh] border md:w-[30vw] w-[80vw] backdrop-blur-2xl overflow-y-auto custom-scrollbar ${
            state.theme.theme === "LIGHT"
              ? "border-gray-200  shadow-2xl bg-black bg-opacity-10 "
              : "border-stone-800 shadow-2xl shadow-black bg-white bg-opacity-10"
          }`}
        >
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 p-2"
            >
              <XMarkIcon className="h-8 w-8 text-gray-500" />
            </button>
          )}

          <div>
            <div>
              <p className="pt-3 pl-3  font-bold text-lg">Cell Height</p>
              <p className=" text-lg px-3">select one prefered cell hight</p>
            </div>
            <div className="flex items-center justify-center md:gap-10 gap-3 mt-5">
              <div className="flex flex-col items-center gap-3" id="normal">
                <div
                  className={`flex items-center flex-col gap-1 border rounded-xl px-4 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-50"
                      : "bg-stone-900 border-stone-700"
                  }`}
                >
                  <p className="flex justify-center">
                    <ChevronUpIcon className="h-5 w-5" />
                  </p>

                  <div className="flex flex-col gap-8">
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                  </div>
                  <p className="flex justify-center">
                    <ChevronDownIcon className="h-5 w-5" />
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  name="normal"
                  checked={selected.cellSize === "normal"}
                  onChange={() => handleCkeck({ cellSize: "normal" })}
                />
              </div>
              <div className="flex flex-col items-center gap-3" id="bigger">
                <div
                  className={`flex items-center flex-col gap-1 border rounded-xl px-4 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-50"
                      : "bg-stone-900 border-stone-700"
                  }`}
                >
                  <p className="flex justify-center">
                    <ChevronUpIcon className="h-5 w-5" />
                  </p>

                  <div className="flex flex-col gap-12 ">
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                  </div>
                  <p className="flex justify-center">
                    <ChevronDownIcon className="h-5 w-5" />
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  name="bigger"
                  checked={selected.cellSize === "bigger"}
                  onChange={() => handleCkeck({ cellSize: "bigger" })}
                />
              </div>
              <div className="flex flex-col items-center gap-3" id="biggest">
                <div
                  className={`flex items-center flex-col gap-1 border rounded-xl px-4 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-50"
                      : "bg-stone-900 border-stone-700"
                  }`}
                >
                  <p className="flex justify-center">
                    <ChevronUpIcon className="h-5 w-5" />
                  </p>

                  <div className="flex flex-col gap-16">
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                    <p
                      className={`h-0.2 border w-[50px] ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-700"
                      } `}
                    ></p>
                  </div>
                  <p className="flex justify-center">
                    <ChevronDownIcon className="h-5 w-5" />
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  name="biggest"
                  checked={selected.cellSize === "biggest"}
                  onChange={() => handleCkeck({ cellSize: "biggest" })}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="pt-3 pl-3  font-bold text-lg">Columns Visibility</p>
              <p className=" text-lg px-3">
                By Selecting you will be able to hide of unhide columns
              </p>
            </div>
            <div className="py-3">
              {columnNames?.map(
                (
                  option: { columnName: string; field: string },
                  index: number
                ) => (
                  <label
                    key={index}
                    className={`flex items-center px-4 py-2 text-lg ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-white hover:bg-opacity-50"
                        : "hover:bg-black hover:bg-opacity-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 "
                      value={option.field}
                      checked={options.includes(option.field)}
                      onChange={(e) => {
                        handleHidables(e.target);
                      }}
                    />
                    <span className="ml-2">{option.columnName}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableComponent;
