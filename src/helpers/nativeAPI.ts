import { IStartPay } from "@/interfaces/nativeAPI";

export const StartPay = (payload: IStartPay, cb?: () => void) => {
    window.ma?.callNativeAPI('startPay', payload, (res: any) => {
        console.log(res)
        if (res.resultCode == 1) {
            console.log('start pay success')
            cb?.();
        }
    })
}

export const ShowToast = ({ title, icon, duraion }: {
    title: string,
    icon: 'success' | 'error' | 'loading' | 'none'
    duraion?: number
}) => {
    window.ma
        .showToast({
            title,
            icon,
            duraion
        })
        .then(() => {
            console.log(title);
        });
}