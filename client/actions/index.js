import axios    from 'axios';

export function sendFormData(email) {
    return function(dispatch) {
        dispatch(submitForm(email));
        return axios.post('/api/session', {email: email})
            .then(response => {
                dispatch(receiveToken(response));
            })
            .then(() => {
                dispatch(requestStylesheet());
            })
    };
}

export function submitForm(email) {
    return { 
        type:   'SUBMIT_FORM',
        email
    };
}

export function receiveToken(data) {
    return { 
        type:   'RECEIVE_TOKEN',
        data
    };
}

export function beginPageChange(direction) {
    return function(dispatch) {
        dispatch(changePage(direction));
        dispatch(requestStylesheet());
    };
}

export function changePage(direction) {
    return {
        type:       'CHANGE_PAGE',
        direction:  direction
    };
}

export function requestStylesheet() {
    return function(dispatch, getState) {
        return axios.get('/api/stylesheet', {
            headers: {'X-Access-Token': getState().token}
        })
            .then(response => {
                dispatch(receiveStylesheet(response));
            });
    };    
}

export function receiveStylesheet(data) {
    return {
        type:       'RECEIVE_STYLESHEET',
        data
    }
}