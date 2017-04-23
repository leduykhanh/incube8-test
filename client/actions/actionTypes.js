import { createTypes, async } from 'redux-action-types';

export default createTypes('data',
    async('GET_ALL_DATA'),
    async('LOGIN'),
    'NEED_REDIRECT',
    'REMOVE_REDIRECT',
)
