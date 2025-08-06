export function GetUserID() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user-' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('userId', userId);
    }
    return userId;
}
