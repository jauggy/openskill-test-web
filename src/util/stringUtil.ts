function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function skillStringToNumber(skillString: string) {
    const regex = /[\d.]+/gm
    const found = regex.exec(skillString)

    return (parseFloat(found[0]));
}

export const stringUtil = {
    toTitleCase: toTitleCase,
    skillStringToNumber: skillStringToNumber
}