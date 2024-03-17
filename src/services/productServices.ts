import callApi from "@/utils/config"

class ProductService {
  static async getProduct() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCT}`

    return callApi({
      url,
      method: 'GET',
      token: true,
    })
  }

  static async getCategory() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_CATEGORY}`

    return callApi({
      url,
      method: 'GET',
      token: true,
    })
  }

  static async getFilterProduct(data: string) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_FILTER_PRODUCT}/${data}`

    return callApi({
      url,
      method: 'GET',
      token: true,
    })
  }
}

export default ProductService