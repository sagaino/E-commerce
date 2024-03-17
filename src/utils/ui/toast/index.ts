import { toast } from "react-toastify"

class CustomToast {
  static Error(message: string) {
    toast.error(
      message,
      {
        pauseOnFocusLoss: false,
        autoClose: 1000
      }
    )
  }
  static Success(message: string) {
    toast.success(
      message,
      {
        pauseOnFocusLoss: false,
        autoClose: 1000
      }
    )
  }
}

export default CustomToast