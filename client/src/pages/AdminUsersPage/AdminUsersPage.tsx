import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { AdminUsersTable } from '@/entities/User';

const AdminUsersPage: FC = () => {
    return (
        <Page>
            <AdminUsersTable />
        </Page>
    );
};

export default AdminUsersPage;
