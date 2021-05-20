import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Package as PackageIcon,
  Users as UsersIcon,
  Sliders as SlidersIcon,
  Home as HomeIcon
} from 'react-feather';
import NavItem from './NavItem';

import api from '../../../api/api';

const admin = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Мониторинг'
  },
  {
    href: '/app/charts',
    icon: BarChartIcon,
    title: 'Графики'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Пользователи'
  },
  {
    href: '/app/containers',
    icon: PackageIcon,
    title: 'Контейнеры'
  },
  {
    href: '/app/configurations',
    icon: SettingsIcon,
    title: 'Конфигурации'
  },
  {
    href: '/app/technology',
    icon: SlidersIcon,
    title: 'Технологии выращивания'
  },
  {
    href: '/app/greenhouses',
    icon: HomeIcon,
    title: 'Теплицы'
  },
  {
    href: '/app/newreport',
    icon: BarChartIcon,
    title: 'Создать отчет'
  },
  {
    href: '/app/reports',
    icon: PackageIcon,
    title: 'Посмотреть отчеты'
  },
];

const technologist = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Мониторинг'
  },
  {
    href: '/app/charts',
    icon: BarChartIcon,
    title: 'Графики'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Пользователи'
  },
  {
    href: '/app/containers',
    icon: PackageIcon,
    title: 'Контейнеры'
  },
  {
    href: '/app/configurations',
    icon: SettingsIcon,
    title: 'Конфигурации'
  },
  {
    href: '/app/technology',
    icon: SlidersIcon,
    title: 'Технологии выращивания'
  },
  {
    href: '/app/greenhouses',
    icon: HomeIcon,
    title: 'Теплицы'
  },
  {
    href: '/app/newreport',
    icon: BarChartIcon,
    title: 'Создать отчет'
  },
  {
    href: '/app/reports',
    icon: PackageIcon,
    title: 'Посмотреть отчеты'
  },
];


const ingener = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Мониторинг'
  },
  {
    href: '/app/charts',
    icon: BarChartIcon,
    title: 'Графики'
  },
  {
    href: '/app/configurations',
    icon: SettingsIcon,
    title: 'Конфигурации'
  },
  {
    href: '/app/newreport',
    icon: BarChartIcon,
    title: 'Создать отчет'
  },
  {
    href: '/app/reports',
    icon: PackageIcon,
    title: 'Посмотреть отчеты'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, session, greenhouse }, props) => {
  const classes = useStyles();
  const location = useLocation();

  const [values, setValues] = useState({
    greenhouses: [],
    greenhouseName: []
  });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    async function loadModules() {
      const modules = await api.getGreenhouses();
      let greenhouse = modules.data.data.find(green => green._id === session.greenhouse);
      setValues({
        ...values,
        greenhouses: modules.data.data,
        // greenhouseName: modules.data.data.find(green => green._id === greenhouse.id).name
        greenhouseName: "Лаборатория"
      });
    }
    loadModules();
  }, []);

  const adminMenu = admin.map((item) => (
    <NavItem
      href={item.href}
      key={item.title}
      title={item.title}
      icon={item.icon}
    />
  ))

  const technologistMenu = technologist.map((item) => (
    <NavItem
      href={item.href}
      key={item.title}
      title={item.title}
      icon={item.icon}
    />
  ))

  const ingenerMenu = ingener.map((item) => (
    <NavItem
      href={item.href}
      key={item.title}
      title={item.title}
      icon={item.icon}
    />
  ))

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h6"
        >
          Пользователь: 
          {" " + session.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Роль: 
          {(() => {
                switch(session.role) {
                  case "1":
                    return " Главный технолог";
                  case "2":
                    return " Технолог";
                  case "3":
                    return " Инженер";
                  default:
                    return '';
                }
            })()}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Теплица:
          
          {/* {((greenhouse.id !== "") && (values.greenhouses !== [])) ? values.greenhouseName : greenhouse.id} */}
          {values.greenhouseName}
          {/* {session.greenhouse} */}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List> 

          {(session.role === "1") ? adminMenu : (session.role === "2") ? technologistMenu : ingenerMenu}
          {/* {(session.role === "1") ? adminMenu : (session.role === "2") ? adminMenu : adminMenu} */}
        </List>
      </Box>
      <Box flexGrow={1} />

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps = (state) => {
  return {
    greenhouse: state.greenhouseReducer,
    session: state.session
  };
};

export default connect(mapStateToProps, null)(NavBar);
