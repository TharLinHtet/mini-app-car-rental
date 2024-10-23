import useGlobalState from "@/hooks/useGlobalState";
import { useRef } from "react";
type SSOValueString = string;

interface SSOState {
    token: SSOValueString;
    setToken: (count: SSOValueString) => void;
    resetToken: (resetValue?: SSOValueString) => void;
}

const useTokenStore = (): SSOState => {
    const tokenConfig = useRef({ name: "token", defaultValue: "", isPersist: true }).current;
    const { value: token, updateValue: setToken, resetPersistent: resetToken } = useGlobalState<SSOValueString>(tokenConfig);

    return { token, setToken, resetToken };

};

export default useTokenStore;
