import axios    from 'axios';

export function sendFormData(email) {
    return function(dispatch) {
        dispatch(submitForm(email));
        return axios.post('/api/session', {email: email})
            .then(response => {
                dispatch(receiveToken(response));
            })
            .then(() => {
                dispatch(fetchHtml());
            })
            .then(() => {
                dispatch(submitSuccess());
            })
            .catch((response) => {
                dispatch(XHRError(response));
            });
    };
}

export function submitForm(email) {
    return { 
        type: 'SUBMIT_FORM',
        email
    };
}

export function submitSuccess() {
    return {
        type: 'SUBMIT_FORM_SUCCESS'
    }
}

export function receiveToken(data) {
    return { 
        type: 'RECEIVE_TOKEN',
        data
    };
}

export function beginPageChange(direction) {
    return function(dispatch, getState) {
        let { readyToChange } = getState();

        dispatch(changePage(direction));
        let { currentPage, html } = getState();

        if (currentPage > html.length) {
            dispatch(fetchHtml());
        }
    };
}

export function changePage(direction) {
    return {
        type:       'CHANGE_PAGE',
        direction:  direction
    };
}

export function fetchHtml() {
    return function(dispatch, getState) {
        dispatch(requestHtml());
        return axios.get('/api/html', {
            headers: {'x-access-token': getState().token}
        })
            .then(response => {
                dispatch(receiveHtml(response));
            })
            .catch((response) => {
                dispatch(XHRError(response));
            });
    };    
}

export function requestHtml() {
    return {
        type: 'REQUEST_HTML'
    }
}

export function receiveHtml(data) {
    return {
        type: 'RECEIVE_HTML',
        data
    }
}

export function sendVote() {
    return function(dispatch, getState) {
        return axios.post('/api/vote', {index: getState().currentPage - 1}, {
            headers: {'x-access-token': getState().token}
        })
            .then(response => {
                dispatch(sendVoteComplete());
            })
            .then(() => {
                dispatch(sendFormData(getState().email));
            })
            .catch((response) => {
                dispatch(XHRError(response));
            });
    };
}

export function sendVoteComplete() {
    return {
        type: 'SEND_VOTE_COMPLETE'
    }
}

export function XHRError(error) {
    return function(dispatch, getState) {
        console.log(error);
        let { errorPopup } = getState();

        if(!errorPopup) {
            dispatch(showErrorPopup());

            setTimeout(() => {
                dispatch(hideErrorPopup());
            }, 2500);
        }
    };
}

export function showErrorPopup() {
    return {
        type: 'SHOW_ERROR_POPUP'
    }
}

export function hideErrorPopup() {
    return {
        type: 'HIDE_ERROR_POPUP'
    }
}