import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/Theme';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import App from '@/app/App';

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </ErrorBoundary>
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);
