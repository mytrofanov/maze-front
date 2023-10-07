import React from 'react';
import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children } = props;
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    colorBgLayout: undefined,
                    colorTextBase: '#f6ffed',
                    colorBgContainerDisabled: '#00b96b',
                },
                components: {
                    Layout: {
                        headerBg: '#00b96b',
                        siderBg: undefined,
                    },
                    Input: {
                        colorBgContainer: undefined,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
