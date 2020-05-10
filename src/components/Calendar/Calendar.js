import React, { useContext, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MoexBondsContext } from '../../context/MoexBondsContext';
import { Dialog } from '../Dialog/Dialog';

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

export const Calendar = (props) => {

    const classes = useStyles();
    const { filteredBonds } = useContext(MoexBondsContext);
    const [ open, setOpen ] = useState(false);
    const [ month, setMonth ] = useState(0);

    const portfolioMonths = {};

    props.portfolio.map(bond => {
        bond.months.map(month => {
            if (!portfolioMonths[month]) {
                portfolioMonths[month] = [];
            }
            portfolioMonths[month].push(bond);
        })
    });

    console.log(portfolioMonths);

    const selectedBonds = props.portfolio
        .filter(bond => bond.months.includes(month));
    const selectedIsins = selectedBonds.map(b => b.isin);
    const availableBonds = filteredBonds
        .filter(bond => bond.months.includes(month))
        .filter(bond => !selectedIsins.includes(bond.isin));

    const monthClick = (month) => {
        setMonth(month);
        setOpen(true);
    }

    return (
        <React.Fragment>

            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    {months.map((month, index) => (
                        <Grid item xs={3} key={month}
                            className={classes.root} 
                            onClick={() => monthClick(index + 1)}>
                            <Paper>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {month}
                                </Typography> 
                                {portfolioMonths[index + 1] && 
                                    <div>
                                        <p>Облигаций: {portfolioMonths[index + 1].length}</p>
                                        <p>Платеж: {portfolioMonths[index + 1].map(b => b.coupon).reduce((b1, b2) => b1 + b2, 0)}р.</p>
                                    </div>
                                }
                            </Paper>
                        </Grid>                   
                    ))}
                </Grid>
            </Container>
            
            {open
                && <Dialog 
                        selectedBonds={selectedBonds} 
                        availableBonds={availableBonds} 
                        addPortfolio={props.addPortfolio}
                        removePortfolio={props.removePortfolio}
                        close={() => setOpen(false)} 
                    />
            }
        </React.Fragment>
    )
}
