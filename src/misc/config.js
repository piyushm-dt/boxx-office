const APT_BASE_URL = 'http://api.tvmaze.com';

export async function apiGet (queryString) {
    const response = await  fetch(`${APT_BASE_URL}${queryString}`).then(res => res.json());

    return response;
}
