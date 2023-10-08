import { type FC } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { PicturesTable } from '@/features/PicturesTable';
import { LoginForm } from '@/features/Login';

const MainPage: FC = () => {
    const user = useSelector(getUserAuthData);

    return <Page>{user ? <PicturesTable /> : <LoginForm />}</Page>;
};

export default MainPage;
