import { IconButton } from '@mui/material';
import { Settings, ArrowRight } from '@mui/icons-material';

function SensorSettingsButton(props) {
  const handleClick = (event) => {
    props.setAnchorEl(event.currentTarget);
    // props.setPopperOpen((oldvalue) => !oldvalue);
    props.setPopperOpen();
  };

  return (
    <IconButton
      onClick={handleClick}
      size="medium"
      sx={{
        '& svg': {
          color: 'grey',
          transition: '0.2s',
          transform: 'translateX(0) rotate(0)',
        },
        '&:hover, &:focus': {
          bgcolor: 'unset',
          '& svg:first-of-type': {
            transform: 'translateX(-4px) rotate(-20deg)',
          },
          '& svg:last-of-type': {
            right: '-3px',
            opacity: 1,
          },
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          height: '80%',
          display: 'block',
          left: 0,
          width: '1px',
          bgcolor: 'divider',
        },
      }}
    >
      <Settings />
      <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
    </IconButton>
  );
}

export default SensorSettingsButton;
