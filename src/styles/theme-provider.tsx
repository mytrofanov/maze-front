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
                    colorBgContainerDisabled: '#00b96b',
                },
                components: {
                    Layout: {
                        headerBg: '#00b96b',
                        siderBg: undefined,
                    },
                    Input: {
                        colorBgContainer: undefined,
                        colorText: '#f6ffed',
                        colorTextPlaceholder: '#f6ffed',
                    },
                    Modal: {
                        colorText: '#00b96b',
                        colorTextHeading: '#00b96b',
                        colorBgMask: '#222222',
                    },
                    List: {
                        colorTextBase: '#f6ffed',
                        colorText: '#f6ffed',
                        colorTextDescription: '#f6ffed',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
