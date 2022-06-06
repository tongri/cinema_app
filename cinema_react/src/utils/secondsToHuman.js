const secondsToHuman = (seconds) => {
    let secondsInMinute = 60
    let secondsInHours = 60 * secondsInMinute
    let hours = Math.floor(seconds / secondsInHours)
    let minutes = Math.floor((seconds - hours * secondsInHours) / secondsInMinute)
    return `${hours}h ${minutes}m`
}
export default secondsToHuman