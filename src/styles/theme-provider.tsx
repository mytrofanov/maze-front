import React from 'react';
import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const baseTextColor = '#f6ffed';

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
                        colorText: baseTextColor,
                        colorTextPlaceholder: baseTextColor,
                    },
                    Modal: {
                        colorText: '#00b96b',
                        colorTextHeading: '#00b96b',
                        colorBgMask: '#222222',
                    },
                    List: {
                        colorTextBase: baseTextColor,
                        colorText: baseTextColor,
                        colorTextDescription: baseTextColor,
                    },
                    Typography: {
                        colorTextHeading: baseTextColor,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
