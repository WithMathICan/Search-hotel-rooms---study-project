import $ from 'jquery'
import IMask from 'imask';

$(function () {
    setMaskedDateFields()
})

function setMaskedDateFields(){
    let els = document.querySelectorAll('.text-field_masket_date')
    for (let el of els){
        IMask(el, {mask: Date, min: new Date(1990, 0, 1), max: new Date(2020, 0, 1)});
    }
}

