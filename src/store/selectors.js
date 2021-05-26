

export const getIsLogged = state => state.auth;

export const getAdvertsSelector = state => state.adverts.sort((a1,a2)=> {
    if(a1.createdAt < a2.createdAt) return 1;
    return -1 
});

    // Todo este rollo del sort es para que los anuncios se ordenen del más nuevo al más antiguo. Si lo dejamos así funciona perfectamente: export const getAdvertsSelector = state => state.adverts



export const getUi = state => state.ui;