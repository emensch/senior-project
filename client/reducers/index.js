const initialState = {
    email: '',
    submitted: false,
    currentPage: 1,
    voteEnabled: false,
    token: '',
    styles: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SUBMIT_FORM':
            return { ...state, 
                email: action.email,
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
            return { ...state,
                currentPage
            };
        case 'RECEIVE_STYLESHEET':
            return { ...state, 
                styles: [ ...state.styles, 
                    action.data.data
                ],
                voteEnabled: action.data.data.voteEnabled,
                token: action.data.data.token
            };
        case 'SEND_VOTE_COMPLETE':
            return { ...state,
                currentPage: 1,
                voteEnabled: false,
                styles: []
            };
        default:
            return state;
    }
}