import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { PlayArrow, PostAdd } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  speedDial: {
    // position: 'absolute',
    // bottom: theme.spacing(2),
    // right: theme.spacing(2),
    marginRight: 0,
    marginLeft: "auto",
    borderRadius: 25,
    color: "#FFFFFF",
    maxHeight: "20",
    position: "fixed",
    bottom: "7%",
    right: "5%"
  },
  icon:{
    verticalAlign: "middle"
  }
}));


const Dial = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <Link to='/match/user'><PlayArrow className={classes.icon}/></Link>, name: 'Start live match' },
    { icon: <Link to='/match/create'><PostAdd className={classes.icon}/></Link>, name: 'Create a new match' },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (

        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                handleClick(e, action.operation, action.name)
              }}
            />
          ))}
        </SpeedDial>
  );
};

export default Dial;