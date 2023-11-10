import {atom, selector} from "recoil";
import {findRenderedDOMComponentWithClass} from "react-dom/test-utils";
import {api} from "./Api";

export const tokenAtom = atom({
    key: 'tokenAtom',
    default: undefined,
});

export const roleSelector = selector({
    key : 'roleSelector',
    get: async ({ get }) => {
        const accessToken = get(tokenAtom);
        console.log('우에에'+accessToken)

            console.log('모지'+accessToken)

            const role = await api('/api/v1/auth/info','POST')
            return role.data;



    }
})