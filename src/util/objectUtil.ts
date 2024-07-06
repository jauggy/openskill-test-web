function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export const objectUtil = {
    clone: clone
}