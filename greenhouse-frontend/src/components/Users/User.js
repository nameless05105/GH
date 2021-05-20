import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

import api from '../../api/api';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };

  const [values, setValues] = useState({
    greenhouses: [],
    isLoading: true,
  });


  useEffect(() => {
    async function loadModules() {
      const modules = await api.getGreenhouses();
      console.log(modules.data.data);
      setValues({
        ...values,
        greenhouses: modules.data.data,
        isLoading: false
      });
    }
    loadModules();
    
  }, []);

  const setIdGreenhouseToName = (id) => {
    if (id !== "") {
      console.log(values.greenhouses)
      let greenhouse = values.greenhouses.find(green => green._id === id);
      console.log(greenhouse)
      // console.log(greenhouse.name)
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Имя пользователя
                </TableCell>
                <TableCell>
                  Роль
                </TableCell>
                <TableCell>
                  Теплица
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedCustomerIds.indexOf(user.id) !== -1}
                >
                  <TableCell>
                    {/* <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      > */}
                        {user.username}
                      {/* </Typography>
                    </Box> */}
                  </TableCell>
                  <TableCell>
                    {(() => {
                        switch(user.role) {
                          case "1":
                            return "Главный технолог";
                          case "2":
                            return "Технолог";
                          case "3":
                            return "Инженер";
                          default:
                            return '';
                        }
                    })()}
                  </TableCell>
                  <TableCell>
                    {((values.isLoading) || (user.greenhouse === "")) ? "" : values.greenhouses.find(green => green._id === user.greenhouse).name  }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;