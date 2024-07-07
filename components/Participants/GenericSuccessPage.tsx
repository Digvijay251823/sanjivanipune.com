import Modal from "@/Utils/Modal";
import { useGlobalState } from "@/Utils/State";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";

export function GenericSuccessPage({
  isOpen,
  onClose,
  successMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  successMessage: string;
}) {
  const { state } = useGlobalState();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`md:w-[500px] w-[90vw] py-10 rounded-[40px] ${
          state.theme.theme === "LIGHT"
            ? "bg-white shadow-xl"
            : "bg-stone-900 shadow-xl shadow-stone-950"
        }`}
      >
        <div className="flex flex-col items-center gap-5 pb-10">
          <p className="text-center">
            <CheckCircleIcon className="h-20 w-20 text-green-600" />
          </p>
          <p className="font-bold text-2xl">{successMessage}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`w-[200px] py-2 rounded-lg font-semibold text-lg focus:ring-4 ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-700 text-white ring-blue-100"
                : " bg-blue-700 text-white ring-blue-300"
            }`}
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
