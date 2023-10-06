import type { ValidatorRule } from 'rc-field-form/lib/interface';

const nameValidationRegExp = /^[a-zA-Z0-9-]{3,30}$/;

export const nameValidator = (message: string) => {
    return {
        validator: ((_rule, value) => {
            return new Promise<void>((resolve, reject) => {
                if (nameValidationRegExp.test(value)) {
                    resolve();
                } else {
                    reject(message);
                }
            });
        }) as ValidatorRule['validator'],
    };
};
