import { Fragment } from 'react'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from 'setup/redux/store'

export const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
          <CssBaseline />
      </Provider>
    </Fragment>
  )
}
