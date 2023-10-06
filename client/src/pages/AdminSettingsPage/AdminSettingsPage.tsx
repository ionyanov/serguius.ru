import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { SettingEditTable } from '@/entities/Settings';

const AdminSettingsPage: FC = () => {
    return (
        <Page>
            <SettingEditTable />
        </Page>
    );
};

export default AdminSettingsPage;
