interface User {
    globalName?: string
    username: string
}

export default (user: User) => user?.globalName ? user.globalName : "@" + user.username;