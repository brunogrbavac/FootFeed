//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const userLogIn = () => {
    return{
        type:'USER_LOGGED_IN'
    };
};

export const userLogOut = () => {
    return{
        type:'USER_LOGGED_OUT'
    };
};
