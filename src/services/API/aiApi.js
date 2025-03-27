import api from '../api';


export function callAIMove(options) {
    return api.post('/autoBotGenerateMove', options);
}
