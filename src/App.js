import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { AuthProvider } from "./AuthContext"


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
