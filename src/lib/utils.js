export const getParameterByName = name => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const param = params[name];
    return param ? param.trim() : param;
}

export const formatNumber = number => {
    if (!number || /\D/.test(number)) return '--';

    return Number(number).toLocaleString();
};
