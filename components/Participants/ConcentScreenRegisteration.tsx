import Modal from "@/Utils/Modal";
import { useGlobalState } from "@/Utils/State";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export function ConcentScreen({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state } = useGlobalState();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`md:w-[500px] w-[95vw] py-5 rounded-[40px] shadow-xl ${
          state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
        }`}
      >
        <div className="flex flex-col items-center py-5 gap-5">
          <p
            className={`rounded-full p-2 ${
              state.theme.theme === "LIGHT" ? "bg-red-100" : "bg-yellow-600 "
            }`}
          >
            <ExclamationTriangleIcon className="h-20 w-20 text-red-500" />
          </p>
          <p className="font-semibold md:text-4xl text-2xl text-center">
            Phone Number Does Not Exist Please Sign Up
          </p>
        </div>
        <div className="flex justify-center gap-8">
          <button
            onClick={onClose}
            className={
              state.theme.theme === "LIGHT"
                ? "text-center md:w-[200px] w-[100px] text-red-500 bg-blue-white py-2 px-1.5 rounded-lg text-xl font-bold border border-gray-300"
                : "text-center md:w-[200px] w-[100px] text-red-500 bg-white py-2 px-1.5 rounded-lg text-xl font-bold border border-stone-800"
            }
          >
            Cancel
          </button>
          <button
            onClick={() => router.push("/participants/registeration")}
            className={
              state.theme.theme === "LIGHT"
                ? "text-center md:w-[200px] w-[100px] text-white bg-blue-700 py-2 px-1.5 rounded-lg text-xl font-bold"
                : "text-center md:w-[200px] w-[100px] text-white bg-blue-500 py-2 px-1.5 rounded-lg text-xl font-bold"
            }
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
