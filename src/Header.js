import React, {Component} from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

class Header extends Component {

    render() {
      return(
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant='h3'>
              Ride sharing
            </Typography>
          </Toolbar>
        </AppBar>
      )
    }
}

export default Header
