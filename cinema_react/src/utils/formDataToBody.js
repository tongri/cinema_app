export const toBody = (keys, data) => {
    const obj = {}
    keys.forEach(key => obj[key] = data.get(key))
    return obj
}