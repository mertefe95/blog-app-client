import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';


export default function AuthOptions() {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
      
    
        const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext); 

    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => { 
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", ""); 
    }
    return (
        <nav className="auth-options" className={classes.root}>
        { userData.user ? (
            <ul className="header-ul">
            <li><Link to="/create-post"><Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                <AddIcon className={classes.extendedIcon} />
                CREATE A POST
                </Fab></Link></li>
            <li><Button variant="contained"  onClick={logout}>Logout </Button></li>  
            </ul>
        ) : (
            <>
            <ul className="header-ul">
                <li><Button variant="contained" color="primary" onClick={register}>
                Register</Button></li>  
                <li><Button variant="contained" color="secondary" onClick={login}>Login</Button></li>
            </ul>
            </>
        )}


        </nav>
        
    );
}
