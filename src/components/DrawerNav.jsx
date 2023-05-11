import "./DrawerNav.scss";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useState, useEffect } from "react";
import {
    AccessTimeFilled,
    AccountCircle,
    AutoStories,
    House,
    LocalAtm,
    ShowChart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PortfolioContext } from "../context/PortfolioContext";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const { currentUser, logout, userObserver, setCurrentUser } = useContext(AuthContext);
    const { open, setOpen } = useContext(PortfolioContext);

    useEffect(() => userObserver(setCurrentUser), []);

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box className="DrawerNav">
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <div className="left">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            onClick={() => navigate("/")}
                        >
                            Trading Paper
                        </Typography>
                    </div>
                    {currentUser ? (
                        <div className="right">
                            <Typography sx={{ marginRight: "1rem" }} className="welcome">
                                Welcome, {currentUser.displayName} !
                            </Typography>
                            <AccountCircle onClick={() => navigate("/portfolio")} />
                            <Typography
                                className="logout"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                Sign Out
                            </Typography>
                        </div>
                    ) : (
                        <div className="right">
                            <Typography noWrap onClick={() => navigate("/login")}>
                                Sign In
                            </Typography>
                            <Typography noWrap onClick={() => navigate("/register")}>
                                Register
                            </Typography>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ textAlign: "left", justifyContent: "space-around" }}>
                    <Typography variant="h6" noWrap component="div">
                        Stocks
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem onClick={() => navigate("/")} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <House />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate("/quotes")} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalAtm />
                            </ListItemIcon>
                            <ListItemText primary="Quotes" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate("/charts")} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ShowChart />
                            </ListItemIcon>
                            <ListItemText primary="Charts" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate("/portfolio")} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AutoStories />
                            </ListItemIcon>
                            <ListItemText primary="Portfolio" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate("/history")} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccessTimeFilled />
                            </ListItemIcon>
                            <ListItemText primary="History" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                {/* <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
        </Box>
    );
}
