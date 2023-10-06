import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { CategoryEditTable } from '@/entities/Category';

const AdminCategoryesPage: FC = () => {
    return (
        <Page>
            <CategoryEditTable />
        </Page>
    );
};

export default AdminCategoryesPage;
