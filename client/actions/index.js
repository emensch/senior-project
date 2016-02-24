export function submitEmail(email) {
    return { 
        type:   'SUBMIT_EMAIL',
        email:  email
    };
}

export function changePage(direction) {
    return {
        type:       'CHANGE_PAGE',
        direction:  direction
    }
}