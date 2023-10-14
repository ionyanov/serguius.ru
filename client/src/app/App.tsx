import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Toolbar } from '@mui/material';
import { useAppDispatch } from '@/shared/lib';
import { AppRouter } from '@/app/providers/AppRouter';
import { Navbar } from '@/widgets/Navbar';
import { getUserIsInit, initAuthData } from '@/entities/User';
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
