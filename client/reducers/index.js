const initialState = {
    email: '',
    submitted: false,
    currentPage: 1
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SUBMIT_EMAIL':
            return { ...state, 
                email: action.email,
                submitted: true
            };
        case 'CHANGE_PAGE':
            let newPage = action.direction ? state.currentPage + 1 : state.currentPage - 1;
            let currentPage = Math.min(Math.max(newPage, 1), 3);
            return { ...state,
                currentPage
            }
        default:
            return state;
    }
}