const loginReducer = (state = "user", action) => {
    switch(action.type)
    {
        case 'USER_LOGGED_IN':
            return "user"
        case 'USER_LOGGED_OUT':
            return "guest"
        default:
            return state
    }
};

export default loginReducer;