import { Box, Toolbar } from '@mui/material';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from '@/app/providers/AppRouter';
import { getUserIsInit, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '@/shared/ui/Loader';

function App() {
    const dispatch = useAppDispatch();
    const isInit = useSelector(getUserIsInit);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    let content = <Loader />;
    if (isInit) {
        content = (
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Navbar />
                <Box component="main" sx={{ width: '100%' }}>
                    <Toolbar />
                    <AppRouter />
                </Box>
            </Box>
        );
    }

    return <>{content}</>;
}

export default App;
