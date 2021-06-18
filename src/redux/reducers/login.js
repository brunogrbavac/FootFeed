const loginReducer = (state = null, action) => {
    switch(action.type)
    {
        case 'USER_LOGGED_IN':
            return  action.payload 
        case 'USER_LOGGED_OUT':
            return null 
        default:
            return state
    }
};

export default loginReducer;