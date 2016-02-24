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
            });
    };
}

export function submitForm(email) {
    return { 
        type: 'SUBMIT_FORM',
        email
    };
}

export function receiveToken(data) {
    return { 
        type: 'RECEIVE_TOKEN',
        data
    };
}

export function beginPageChange(direction) {
    return function(dispatch, getState) {
        dispatch(changePage(direction));

        let { currentPage, styles } = getState();
        if (currentPage > styles.length) {
            dispatch(requestStylesheet());
        }
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
            headers: {'x-access-token': getState().token}
        })
            .then(response => {
                dispatch(receiveStylesheet(response));
            });
    };    
}

export function receiveStylesheet(data) {
    return {
        type: 'RECEIVE_STYLESHEET',
        data
    }
}

export function sendVote() {
    return function(dispatch, getState) {
        return axios.post('/api/vote', {}, {
            headers: {'x-access-token': getState().token}
        })
            .then(response => {
                dispatch(sendVoteComplete());
            })
            .then(() => {
                dispatch(sendFormData(getState().email));
            });
    };
}

export function sendVoteComplete() {
    return {
        type: 'SEND_VOTE_COMPLETE'
    }
}