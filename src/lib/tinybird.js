export const queryTinybirdEndpoint = url => {
    return fetch(url).then((response) => response.json());
}
