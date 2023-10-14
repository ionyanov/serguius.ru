import {
    ChangeEventHandler,
    type FC,
    memo,
    useCallback,
    useState,
    useEffect,
} from 'react';
import {
    Alert,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginMutation, useRegistrMutation } from '../model/login.api';
import { StorageServices } from '@/shared/lib';
import { IUser, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib';

export interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const [login, loginProps] = useLoginMutation();
    const [registr, registrProps] = useRegistrMutation();

    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (loginProps.error)
            if ('data' in loginProps.error)
                setError(JSON.stringify(loginProps.error.data));
        if (registrProps.error)
            if ('data' in registrProps.error)
                setError(JSON.stringify(registrProps.error.data));
        setIsLoading(loginProps.isLoading || registrProps.isLoading);
    }, [loginProps, registrProps]);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const onChangeUserName: ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = useCallback((event) => {
        setUserName(event.currentTarget.value);
    }, []);

    const onChangePassword: ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = useCallback((event) => {
        setPassword(event.currentTarget.value);
    }, []);

    const onLogin = useCallback(async () => {
        login({
            email: username,
            password,
        }).then((args) => {
            if ('data' in args)
                if ('user' in args.data) {
                    StorageServices.setTokensToStorage(args.data);
                    StorageServices.setUserToStorage(args.data.user as IUser);

                    dispatch(userActions.setAuthData(args.data.user as IUser));
                }
        });
        if (!error) props.onSuccess?.();
    }, [username, password, props]);

    const onRegistr = useCallback(async () => {
        registr({
            email: username,
            password,
        }).then((args) => {
            if ('data' in args)
                if ('user' in args.data) {
                    setError('User create. For unlock ask owner of site.');
                }
        });
        if (!error) props.onSuccess?.();
    }, [username, password, props]);

    return (
        <Grid
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            maxWidth={400}>
            <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                    id="email"
                    type="text"
                    value={username}
                    onChange={onChangeUserName}
                    fullWidth
                />
            </FormControl>
            <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                    fullWidth
                />
            </FormControl>
            <Stack
                direction={'row'}
                width={'100%'}
                justifyContent={'space-around'}>
                <Button
                    onClick={onRegistr}
                    variant="outlined"
                    disabled={isLoading}>
                    Registr
                </Button>
                <Button
                    onClick={onLogin}
                    variant="outlined"
                    disabled={isLoading}>
                    Login
                </Button>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
        </Grid>
    );
});
