export const queryTinybirdEndpoint = url => {
    return fetch(url, {
        headers: {
            'User-Agent': 'tinybird-widgets'
        }
    }).then((response) => response.json());
}
