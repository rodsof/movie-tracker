import { 
    REGISTERED,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_OK,
    LOGIN_ERROR,
    LOG_OUT
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case REGISTERED:
        case LOGIN_OK:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticated: true,
                message: null,
                spinner: false
            }
        case GET_USER: 
            return {
                ...state,
                autenticated: true,
                user: action.payload, 
                spinner: false
            }
        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                autenticated: false,
                message: action.payload, 
                spinner: false
            }
        
        default:
            return state;
    }
}