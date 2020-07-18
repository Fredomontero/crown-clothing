import React from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import CheckoutPage from './pages/checkout/checkout.component.jsx';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const { checkUserSession } = this.props;
    checkUserSession();
  };

  componentWillUnmount(){
    // this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : <SignInAndSignUp/>}/> 
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchtoProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchtoProps)(App);
