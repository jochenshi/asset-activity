const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
const UPDATE_AUTHORITY = 'UPDATE_AUTHORITY';

const toggleLogin = (value) => {
    return {
        type: TOGGLE_LOGIN,
        value
    }
};

const updateAuthority = (value) => {
    return {
        type: UPDATE_AUTHORITY,
        value
    }
};

export {toggleLogin, updateAuthority}