import { FC } from 'react';
import { Fab, styled, Toolbar } from '@mui/material';
import { Settings } from '@/shared/types/enums';
import { useInitSettingsQuery } from '../model/settings.api';

const StyledFab = styled(Fab)({
    left: 30,
    right: 0,
    margin: '10px',
    backgroundColor: '#fa9696',
});

export const ContactsLine: FC = () => {
    const { data } = useInitSettingsQuery();

    if (!data) return <></>;

    return (
        <Toolbar sx={{ position: 'fixed', top: 'auto', bottom: 0 }}>
            <StyledFab variant="circular" href={data?.[Settings.INSTA]}>
                <img src={'/images/itstagramm.png'} style={{ width: '100%' }} />
            </StyledFab>
            <StyledFab variant="circular" href={data?.[Settings.BOOSTY]}>
                <img src={'/images/boosty.png'} style={{ width: '100%' }} />
            </StyledFab>
            <StyledFab
                variant="circular"
                href={`mailto:${data?.[Settings.EMAIL]}`}
                size={'large'}>
                <img src={'/images/email.png'} style={{ width: '100%' }} />
            </StyledFab>
        </Toolbar>
    );
};
