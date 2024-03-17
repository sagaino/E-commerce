import Cookies from "js-cookie";
import SessionConstant from "./SessionConstant";
import { UserDataType } from "@/services/type/user";

class CacheManager {
  //set user data in cookie
  static setUserData<T>(data: T) {
    Cookies.set(SessionConstant.userData, JSON.stringify(data), { expires: 1 })
  }

  //get jwt token from cookie
  static getToken() {
    const dataCookie = Cookies.get(SessionConstant.userData)
    if (!dataCookie) return null
    const userData:UserDataType = JSON.parse(dataCookie)
    return userData.token || null
  }

  //remove userData in cookie
  static removeUserData() {
    Cookies.remove(SessionConstant.userData)
  }
}

export default CacheManager