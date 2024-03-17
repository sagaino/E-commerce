import callApi from "@/utils/config"
import { payloadAddProductType } from "./type/cart"

class CartService {
  static async getCart(params: {
    startdate: string | null,
    enddate: string | null,
  }) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_CART}`

    return callApi({
      url,
      method: 'GET',
      token: true,
      params: params
    })
  }
  static async addCart(data: payloadAddProductType) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_CART}`

    return callApi({
      url,
      method: 'POST',
      token: true,
      data: data
    })
  }
}

export default CartService