//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const darkModeOn = () => {
    return{
        type:'DARK_MODE_ON'
    };
};

export const lightModeOn = () => {
    return{
        type:'LIGHT_MODE_ON'
    };
};