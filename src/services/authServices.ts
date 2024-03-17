import callApi from "@/utils/config"
import { LoginTypes } from "./type/auth"

export default class AuthService {
  static async login(data: LoginTypes) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_LOGIN}`

    return callApi({
      url,
      method: 'POST',
      data
    })
  }
}