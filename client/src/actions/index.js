import { SIGN_IN, SIGN_OUT } from './types'

export const signIn = () => {
    return {
        type: SIGN_IN
    }
}
export const signOUT = () => {
    return {
        type: SIGN_OUT
    }
}