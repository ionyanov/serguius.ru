import { type FC } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { AdminLogsTable } from '@/entities/LogAdmin';

const AdminLogsPage: FC = () => {
    const user = useSelector(getUserAuthData);

    return (
        <Page>
            <AdminLogsTable />{' '}
        </Page>
    );
};

export default AdminLogsPage;
