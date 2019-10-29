import i18n from '../locales/i18n';
export const CHANGE_PASSWORD_VALIDATION = {
    password: {
        length: {
            minimum: 8
        },
        format: {
            pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
            message: `^${i18n.t('registration.error.passwordText')}`
        },
        presence: true
    },
    repeatPassword: {
        equality: {
            attribute: 'password',
            message: `^${i18n.t('registration.error.passwordMismatch')}`
        }
    }
};
//# sourceMappingURL=change-password.js.map