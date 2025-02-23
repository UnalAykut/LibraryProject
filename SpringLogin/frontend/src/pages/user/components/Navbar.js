import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, Book as BookIcon, AccountCircle as AccountIcon, ExitToApp as LogoutIcon, Close as CloseIcon } from "@mui/icons-material";
import "../../../Css/user/Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // 🔥 Aktif sayfanın URL'ini al

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Masaüstü Navbar */}
      <AppBar position="fixed" className="mui-navbar">
        <Toolbar className="mui-navbar-toolbar">
          {/* Sol Taraf: Kitaplık Logosunu Buraya Koyduk */}
          <Typography variant="h6" className="mui-navbar-logo">
            <Link to="/home" className="mui-navbar-logo-link">📚 Kitaplık</Link>
          </Typography>

          {/* Orta Menü Öğeleri */}
          <Box className="mui-navbar-links">
            <Link to="/home" className={`mui-navbar-link ${location.pathname === "/home" ? "active" : ""}`}>
              <HomeIcon /> Anasayfa
            </Link>
            <Link to="/reservation" className={`mui-navbar-link ${location.pathname === "/reservation" ? "active" : ""}`}>
              <BookIcon /> Rezervasyonlar
            </Link>
            <Link to="/account" className={`mui-navbar-link ${location.pathname === "/account" ? "active" : ""}`}>
              <AccountIcon /> Hesabım
            </Link>
          </Box>

          {/* Sağ Taraf: Çıkış Yap */}
          <Box className="mui-navbar-logout">
            <Link to="/" className="mui-navbar-link">
              <LogoutIcon /> Çıkış Yap
            </Link>
          </Box>

          {/* Mobil Menü Butonu */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} className="mui-navbar-menu-button">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobil Menü - Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box className="mui-mobile-menu" role="presentation">
          <IconButton onClick={toggleDrawer} className="mui-close-icon">
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button component={Link} to="/home" onClick={toggleDrawer} className={location.pathname === "/home" ? "active" : ""}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Anasayfa" />
            </ListItem>
            <ListItem button component={Link} to="/reservation" onClick={toggleDrawer} className={location.pathname === "/reservation" ? "active" : ""}>
              <ListItemIcon><BookIcon /></ListItemIcon>
              <ListItemText primary="Rezervasyonlar" />
            </ListItem>
            <ListItem button component={Link} to="/account" onClick={toggleDrawer} className={location.pathname === "/account" ? "active" : ""}>
              <ListItemIcon><AccountIcon /></ListItemIcon>
              <ListItemText primary="Hesabım" />
            </ListItem>
            <ListItem button component={Link} to="/logout" onClick={toggleDrawer}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Çıkış Yap" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
