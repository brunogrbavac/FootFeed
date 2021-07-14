//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const matchLoaded = ( match ) => {
    return{
        type:'MATCH_LOADED',
        payload: match
    };
};

export const matchUnloaded = ( ) => {
    return{
        type:'MATCH_UNLOADED',
    };
};
