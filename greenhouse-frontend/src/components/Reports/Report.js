import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles,
  TableCell,
  TableRow
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Report = ({ className, report, ...rest }) => {
  const classes = useStyles();

  const deleteReport = (event) => {
    event.preventDefault();
    if (window.confirm('Подтверждение удаления отчета', report._id)) {
      api.deleteReportById(report._id);
      window.location.reload();
    }
  };
  console.log(new Date(report.startDate))
  return (
    // <Card
    //   className={clsx(classes.root, className)}
    //   {...rest}
    // >

    //   <Box p={2}>
    //     <Grid
    //       container
    //       justify="space-between"
    //       spacing={2}
    //     >
    //       <Grid
    //         className={classes.statsItem}
    //         item
    //       >

    //         <Button
    //           className={classes.statsIcon}
    //           color="action"
    //           onClick={deleteReport}
    //         >
    //           <DeleteIcon
    //             className={classes.icon}
    //             size="20"
    //           />
    //         </Button>

    //         <Button
    //           activeClassName={classes.active}
    //           className={classes.statsIcon}
    //           component={Link}
    //           to={`/app/viewreport/${report._id}`}
    //         >
    //           <VisibilityIcon
    //             className={classes.icon}
    //             size="20"
    //           />
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Box>
    //   <Divider />
    //   <CardContent>
    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       gutterBottom
    //       variant="h5"
    //     >
    //       Создана пользователем:
    //       {report.username}
    //     </Typography>
    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       Культура: {report.culture}
    //     </Typography>

    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       Дата начала периода: {new Date(report.startDate).toLocaleString('ru-RU')}
    //     </Typography>

    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       Дата окончания периода: {new Date(report.endDate).toLocaleString('ru-RU')}
    //     </Typography>

    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       Ph: {report.ph}
    //     </Typography>

    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       EC: {report.ec}
    //     </Typography>

    //     <Typography
    //       align="left"
    //       color="textPrimary"
    //       variant="body1"
    //     >
    //       Плотность посева: {report.seedingDensity}
    //     </Typography>
    
    //   </CardContent>
    // </Card>

    <TableRow
      hover
      key={report.id}
    >
      {/* <TableCell>
        {report.username}
      </TableCell> */}
      <TableCell>
        {new Date(report.createdAt).toLocaleString('ru-RU')}
      </TableCell>
      <TableCell>
        {new Date(report.startDate).toLocaleString('ru-RU')}
      </TableCell>
      <TableCell>
        {new Date(report.endDate).toLocaleString('ru-RU')}
      </TableCell>
      <TableCell>
        {report.culture}
      </TableCell>
      <TableCell>
        
            <Button
              className={classes.statsIcon}
              color="action"
              onClick={deleteReport}
            >
              <DeleteIcon
                className={classes.icon}
                size="20"
              />
            </Button>

            <Button
              activeClassName={classes.active}
              className={classes.statsIcon}
              component={Link}
              to={`/app/viewreport/${report._id}`}
            >
              <VisibilityIcon
                className={classes.icon}
                size="20"
              />
            </Button>


      </TableCell>
    </TableRow>
  );
};

Report.propTypes = {
  className: PropTypes.string,
  report: PropTypes.object.isRequired
};

export default Report;