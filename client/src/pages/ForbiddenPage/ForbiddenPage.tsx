import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';

const ForbiddenPage: FC = () => {
    return (
        <Page>Access denied</Page>
    );
};

export default memo(ForbiddenPage);
