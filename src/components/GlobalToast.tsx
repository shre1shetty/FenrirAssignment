import { toast, type Id } from "react-toastify";
let toastId: Id | null = null;
function GlobalToast({
  message,
  messageTimer,
  messageType,
}: {
  message: string;
  messageTimer: number;
  messageType: "info" | "success" | "warning" | "error" | "default";
}) {
  if (toastId === null || !toast.isActive(toastId)) {
    toastId = toast(`${message}`, {
      closeOnClick: false,
      toastId: "mw_toast",
      autoClose: messageTimer,
      closeButton: true,
      type: `${messageType}`,
      position: "top-center",
    });
  }
}

export default GlobalToast;
