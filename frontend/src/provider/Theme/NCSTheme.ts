import { createTheme } from '@mui/material/styles';
import { NONAME } from 'dns';

enum COLORS {
    MAIN_DARK = '#034d58',
    MAIN_LIGHT = '#ded8e2',
    WHITE = '#f9f9f9',
    RED = '#ff5722',
}

export const NCSTheme = createTheme({
    palette: {
        primary: {
            main: COLORS.MAIN_LIGHT,
            contrastText: COLORS.MAIN_LIGHT,
            light: COLORS.MAIN_LIGHT,
            dark: COLORS.MAIN_LIGHT,
        },
        secondary: {
            main: COLORS.MAIN_DARK,
            contrastText: COLORS.MAIN_DARK,
            light: COLORS.MAIN_LIGHT,
            dark: COLORS.MAIN_DARK,
        },
        action: {
            active: `${COLORS.MAIN_DARK}`,
            hover: `${COLORS.MAIN_DARK}40`,
            focus: `${COLORS.MAIN_DARK}`,
            selected: `${COLORS.MAIN_DARK}`,
        },
        background: {
            default: COLORS.MAIN_DARK,
            paper: `${COLORS.WHITE}`
        },
        text: {
            primary: COLORS.MAIN_LIGHT,
            secondary: COLORS.MAIN_LIGHT,
            disabled: COLORS.MAIN_LIGHT,
        },
    },
    typography: {
        fontFamily: 'Nanum Gothic Coding',
        fontSize: 14,
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 900,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 800,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 800,
        },
        h5: {
            fontSize: '1.2rem',
        },
        button: {
            color: COLORS.MAIN_DARK,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100%',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '10px',
                        height: '10px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        backgroundColor: COLORS.MAIN_LIGHT,
                        borderRadius: '10px',
                    },
                    '*::-webkit-scrollbar-track': {
                        backgroundColor: COLORS.MAIN_DARK,
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: COLORS.MAIN_DARK,
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: COLORS.MAIN_DARK,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: COLORS.MAIN_LIGHT,
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: COLORS.MAIN_DARK,
                    },
                },
                '& #root': {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100vh',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    justifyContent: 'center',
                    display: 'flex'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    background: `${COLORS.MAIN_DARK}`,
                    alignContent: 'center'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: COLORS.MAIN_LIGHT,
                    textTransform: 'unset',
                    fontSize: '1.5rem',
                    minWidth: 'unset',
                },
                textSecondary: {
                    color: COLORS.MAIN_DARK
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    border: 'none',
                    padding: '0',
                    paddingRight: '5px'
                }
            }
        }
    },
});