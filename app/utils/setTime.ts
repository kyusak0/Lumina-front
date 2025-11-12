export const messTime = (time: Date) => {
    return time.getDate().toString() + '.' + time.getMonth().toString() + '--' + time.getHours().toString() + ':' + time.getMinutes().toString()
}