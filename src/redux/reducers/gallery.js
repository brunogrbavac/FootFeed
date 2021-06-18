const galleryReducer = (state = [], action) => {
    switch(action.type)
    {
        case 'IMAGES_LOADED':
            return  action.payload
        case 'IMAGES_UNLOADED':
            return  [] 
        default:
            return state
    }
};

export default galleryReducer;