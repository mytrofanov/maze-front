import React from 'react';
import { notification } from 'antd';
import ArgsProps from 'antd/lib/notification';

const duration = 2; // time in seconds

export const useNotification = () => {
    return React.useMemo(() => {
        return {
            success: (text: string, options?: typeof ArgsProps) => {
                return notification.success({
                    message: text,
                    duration,
                    ...options,
                });
            },
            error: (text: string, options?: typeof ArgsProps) => {
                return notification.error({
                    message: text,
                    duration,
                    ...options,
                });
            },
            warning: (text: string, options?: typeof ArgsProps) => {
                return notification.warning({
                    message: text,
                    duration,
                    ...options,
                });
            },
            info: (text: string, options?: typeof ArgsProps) => {
                return notification.info({
                    message: text,
                    duration,
                    ...options,
                });
            },
        };
    }, []);
};
