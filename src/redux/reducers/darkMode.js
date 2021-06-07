const darkModeReducer = (state = false, action) => {
    switch(action.type)
    {
        case 'DARK_MODE_ON':
            return true
        case 'LIGHT_MODE_ON':
            return false
        default:
            return state
    }
};

export default darkModeReducer;