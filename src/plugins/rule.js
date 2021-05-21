export function required(text) {
    return value => !!value || text;
}

export function multiSelectRequired(text) {
    return value => value.length > 0 || text;
}

export function verifyUserName() {

    return value => /^[a-z0-9_-]{3,15}$/.test(value) || 'یک نام کاربری معتبر وارد نمایید';
}

export function verifyMobilePhone() {

    return value => /^[0-9]{11}$/.test(value) || 'شماره موبایل معتبر وارد نمایید';

}

export function length(length, field, nullable = false) {

    return value => {

        if (!value) {

            if (nullable) {
                return true;
            }
            return field + ' الزامیست'
        }
        return (value ? value.length === length : false) || `طول ${field} باید ${length} کاراکتر باشد `
    }
}

export function lessThan(length, field, nullable = false) {

    return value => {

        if (!value) {

            if (nullable) {
                return true;
            }
            return field + ' الزامیست'
        }
        return (value ? value.length <= length : false) || `طول ${field} نباید بشتر از ${length} کاراکتر باشد `
    }
}

export function moreThan(length, field, nullable = false) {

    return value => {

        if (!value) {

            if (nullable) {
                return true;
            }
            return field + ' الزامیست'
        }
        return (value ? value.length >= length : false) || `طول ${field} باید بیشتر از ${length} کاراکتر باشد `
    }
}

