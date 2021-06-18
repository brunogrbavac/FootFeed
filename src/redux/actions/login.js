//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const userLogIn = ( username ) => {
    return{
        type:'USER_LOGGED_IN',
        payload: username
    };
};

export const userLogOut = () => {
    return{
        type:'USER_LOGGED_OUT',
        payload: null
    };
};
