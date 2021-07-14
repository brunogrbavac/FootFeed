const matchReducer = (state = { stadium:"", date_time:"",article:"",headline:"",match_id:0}, action) => {
    switch(action.type)
    {
        case 'MATCH_LOADED':
            return  action.payload
        case 'MATCH_UNLOADED':
            return  { stadium:"", date_time:"",article:"",headline:"",match_id:0}
        default:
            return state
    }
};

export default matchReducer;