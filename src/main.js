import { setMaskedDateFields } from "./js/masked-date"
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';


(function () {


    document.addEventListener("DOMContentLoaded", () => {
        setMaskedDateFields()
        activateLikeButton()
        setDatePickerSimple()
    })

    

})()

function activateLikeButton() {
    document.querySelectorAll('.like-button').forEach(el => {
        el.addEventListener('click', e => {
            el.classList.toggle('like-button_active')
        })
    })
}

function setDatePickerSimple(){
    document.querySelectorAll('.text-field_masket_date').forEach(el => {
        new AirDatepicker(el)
    })
}