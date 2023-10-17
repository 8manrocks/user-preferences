import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onColorChange: (color: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onColorChange }) => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    User Preference Management
                </Typography>
                <Select
                    defaultValue=""
                    onChange={(e) => onColorChange(e.target.value)}
                    variant="standard"
                    style={{ color: 'white', paddingLeft: 10, paddingRight: 10 }}
                >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    {/* Add more colors as needed */}
                </Select>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
