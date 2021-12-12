

export function setMaskedDateFields() {
    let els = document.querySelectorAll('.text-field_masket_date')
    for (let el of els) {
        // IMask(el, {mask: Date, min: new Date(1990, 0, 1), max: new Date(2020, 0, 1)});
        el.addEventListener('input', onDateInput)
        el.addEventListener('blur', e => e.target.value = formatDateString(e.target))
    }
}

function onDateInput(e) {
    let input = e.target
    let formattedString = formatDateString(input)
    // console.log(formattedString);
    input.value = formattedString
}

function formatDateString(input) {
    let trimmedStr = input.value.replace(/\D/g, "").substr(0, 8)
    if (trimmedStr.length < 3) {
        return trimmedStr
    }
    else if (trimmedStr.length < 5) {
        return `${trimmedStr.substr(0, 2)}.${trimmedStr.substr(2, 2)}`
    }
    else return `${trimmedStr.substr(0, 2)}.${trimmedStr.substr(2, 2)}.${trimmedStr.substr(4)}`
}