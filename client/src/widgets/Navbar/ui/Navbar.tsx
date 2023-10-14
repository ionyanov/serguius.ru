import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Container, MenuItem, Toolbar, AppBar } from '@mui/material';
import { getUserAuthData, userActions } from '@/entities/User';
import {
    getRouteAdminCategories,
    getRouteAdminLogs,
    getRouteAdminSettings,
    getRouteAdminUsers,
    getRouteMain,
} from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib';

export const Navbar: FC = memo(() => {
    const user = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const adminMenu: Record<string, string> = {
        Pictures: getRouteMain(),
        Categories: getRouteAdminCategories(),
        Settings: getRouteAdminSettings(),
        Users: getRouteAdminUsers(),
        Logs: getRouteAdminLogs(),
    };

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, []);
    return (
        <AppBar component="nav">
            <Container sx={{ maxWidth: '100%' }}>
                <Toolbar disableGutters>
                    {user && (
                        <>
                            {Object.entries(adminMenu).map(([key, value]) => (
                                <MenuItem key={key}>
                                    <Button
                                        variant="text"
                                        size="small"
                                        sx={{
                                            fontWeight:
                                                location.pathname == value
                                                    ? 'bold'
                                                    : '',
                                        }}
                                        component={RouterLink}
                                        to={value}>
                                        {key}
                                    </Button>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={onLogout}>
                                    LOGOUT
                                </Button>
                            </MenuItem>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
});
