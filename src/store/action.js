const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export function toggleLogin(value) {
    return {
        type: TOGGLE_LOGIN,
        value
    }
}