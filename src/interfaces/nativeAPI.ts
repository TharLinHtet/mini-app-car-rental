export interface IStartPay {
    prepayId: string
    orderInfo: string
    sign: string
    signType: string
    disableNewCheckout: string,
    tradeType: string
}

export interface ISSOStringResponse {
    xm_string_callback_key: string
}