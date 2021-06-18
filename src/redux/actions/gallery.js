//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const imagesLoaded = ( images_array ) => {
    return{
        type:'IMAGES_LOADED',
        payload: images_array
    };
};

export const imagesUnloaded = ( ) => {
    return{
        type:'IMAGES_UNLOADED',
    };
};

