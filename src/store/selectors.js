

export const getIsLogged = state => state.auth;

export const getAdvertsSelector = state => state.adverts.sort((a1,a2)=> {
    if(a1.createdAt < a2.createdAt) return 1;
    return -1 
});

    // Todo este rollo del sort es para que los anuncios se ordenen del más nuevo al más antiguo. Si lo dejamos así funciona perfectamente: export const getAdvertsSelector = state => state.adverts


export const getAdvertsLoaded = state => !!state.adverts.length // Me creo un selector para saber si hay anunciios cargados en el estado de redux. Con esta expresión me devuelve un booleano. A partir de aquí yo puedo indicar si debe hacer una petición a la API para traerse los anuncios o no porque ya los tengo cargados en mi store de redux

export const getUi = state => state.ui;

export const getIsLoading = state => state.ui.loading;

export const getError = state => state.ui.error;