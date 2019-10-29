import i18n from '../locales/i18n';
export const REGISTRATION_VALIDATION = {
    email: {
        email: {
            message: `^${i18n.t('registration.error.emailText')}`
        },
        presence: true
    },
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
//# sourceMappingURL=registration.js.map