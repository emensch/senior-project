import axios    from 'axios';

export function sendFormData(email) {
    return function(dispatch) {
        dispatch(submitForm(email));
        return axios.post('/api/session', {email: email})
            .then(response => {
                dispatch(receiveToken(response));
            })
            .then(() => {
                dispatch(requestHtml());
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

        let { currentPage, html } = getState();
        if (currentPage > html.length) {
            dispatch(requestHtml());
        }
    };
}

export function changePage(direction) {
    return {
        type:       'CHANGE_PAGE',
        direction:  direction
    };
}

export function requestHtml() {
    return function(dispatch, getState) {
        return axios.get('/api/html', {
            headers: {'x-access-token': getState().token}
        })
            .then(response => {
                dispatch(receiveHtml(response));
            });
    };    
}

export function receiveHtml(data) {
    return {
        type: 'RECEIVE_HTML',
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