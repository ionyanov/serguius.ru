import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { LoginForm } from '@/features/Login';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

const MainPage: FC = () => {
    const user = useSelector(getUserAuthData);

    return <Page>{!user && <LoginForm />}</Page>;
};

export default MainPage;
