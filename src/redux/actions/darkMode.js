//pazi da je tip akcije uvijek jedinstven da ne TRIGGERA neželjene reducere

export const darkModeOn = () => {
    localStorage.setItem('darkmode','true');
    return{
        type:'DARK_MODE_ON'
    };
};

export const lightModeOn = () => {
    localStorage.setItem('darkmode','false');
    return{
        type:'LIGHT_MODE_ON'
    };
};