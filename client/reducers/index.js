const initialState = {
    email: '',
    submitted: false,
    currentPage: 1,
    readyToChangeNext: false,
    readyToChangePrev: false,
    voteEnabled: false,
    token: '',
    html: [],
    errorPopup: false
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SUBMIT_FORM':
            return { ...state, 
                email: action.email
            };
        case 'SUBMIT_FORM_SUCCESS':
            return { ...state,
                submitted: true
            };
        case 'RECEIVE_TOKEN':
            return { ...state,
                voteEnabled: action.data.data.voteEnabled,
                token: action.data.data.token
            };
        case 'CHANGE_PAGE':
            let newPage = action.direction ? state.currentPage + 1 : state.currentPage - 1;
            let currentPage = Math.min(Math.max(newPage, 1), 3);
            let readyToChangePrev = (currentPage > 1);
            let readyToChangeNext = (currentPage < state.currentPage) || (currentPage < 3);
            return { ...state,
                currentPage,
                readyToChangePrev,
                readyToChangeNext
            };
        case 'REQUEST_HTML':
            return { ...state,
                readyToChangeNext: false
            };
        case 'RECEIVE_HTML':
            let _readyToChangeNext = (state.currentPage < 3); // fix unfortunate block scoping issue
            return { ...state,
                readyToChangeNext: _readyToChangeNext,
                html: [ ...state.html, 
                    action.data.data.html
                ],
                voteEnabled: action.data.data.voteEnabled,
                token: action.data.data.token
            };
        case 'SEND_VOTE_COMPLETE':
            return { ...state,
                currentPage: 1,
                voteEnabled: false,
                readyToChangeNext: false,
                readyToChangePrev: false,
                html: []
            };
        case 'SHOW_ERROR_POPUP':
            return { ...state, errorPopup: true };
        case 'HIDE_ERROR_POPUP':
            return { ...state, errorPopup: false };
        default:
            return state;
    }
}