export function isEmpty(str) {
    return (str == undefined || str == null || str == "" || str == "null")
}

export function shortenText(str, maxLength = 0) {
    let text = str

    if (!isEmpty(text) && text.length > maxLength) {
        text = text.substring(0, (maxLength - 1)) + '...'
    }

    return text
}