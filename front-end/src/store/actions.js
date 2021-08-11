// кладем в переменную тип нашего action
export const CHANGE_AUTH_PAGE_CHOSEN_FORM = 'CHANGE_AUTH_PAGE_CHOSEN_FORM'

// Функция, которая содержит в себе тип и статус нашего Sidebar
export function changeAuthPageChosenForm(status) {
    return {
        type: CHANGE_AUTH_PAGE_CHOSEN_FORM,
        status: status,
    }
}
