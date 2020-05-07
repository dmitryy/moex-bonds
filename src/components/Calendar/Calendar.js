import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16)
      }
    }
}));

export const Calendar = () => {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    {months.map(month => (
                        <Grid item xs={3} key={month} className={classes.root}>
                            <Paper>
                                <Typography variant="caption" display="block" gutterBottom>{month}</Typography> 
                            </Paper>
                        </Grid>                   
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
