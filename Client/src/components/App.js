import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import history from "../history";
import Navigation from './Navigation';
import Jumbotron from './Jumbotron';
import Feed from './Feed';
import Contact from './Contact';
import About from './About';
import Loading from './Loading'
import './App.css';

//const createMarkup = () => {
//  return: {_html: 'I am so dangerous you can feel it!'}
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: "Manny Henri",
      jumbotronTitle: "List of courses",
      feeds: [],
    }
  }

  // UNSAFE_componentWillMount() {
  //  this.setState({
  //    feeds: data,
  //  })
  // } --> NO LONGER USED IN REACT

  async componentDidMount() {
    const url = 'http://localhost:4000/courses';
    const response = await axios.get(url);
    return this.setState({ feeds: response.data })
  }

  render() {
   // destructing
   const { loading } = useAuth0; 

   if (loading) {
     return <Loading />
   }

    return (
      // STRICT MODE
      <React.StrictMode>
        <Router history={history}>
        <div className="container">
          <Navigation />
          <Jumbotron title={this.state.jumbotronTitle}/>
          <Switch>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route exact path="/" render={(props) => (
              <Feed feeds={this.state.feeds} />
            )} />
          </Switch>
          <div className="footer">
                <p>&copy; {this.state.name} Inc.</p>
                
                {/* Do not enject anything inside your HTML, it is not secure!
                
                <div innerHTML={createMarkup()} />
                <div dangerouslySetInnerHTML={createMarkup()} /> */}
          </div>
        </div>
      </Router>
      </React.StrictMode>
    )
  }
}

export default App;

// SECURITY WEB SOURCES TO KEEP IN MIND

// 1. OWASP --> THE OPEN WEB APPLICATION SECURITY PROJECT -->
// Project - Cheat Sheet Series Project - what are the threats out there
// and what are the solutions.

// 2. Google Applcation Security 
// Cross-site scripting XSS attacks - injecting HTML CODE INSIDE

// CROSS-SITE REQUEST FORGERY
// Request Heade - URL, SIGNED TOKEN --> SERVER - SAME URL? SIGNED TOKEN?
// IMPLEMENTATION - Using JSON Web Token JWT; Using cloud services like Auth0

// Follow React guidelines and many good practices and you should be fine
// with the security

// JSON WEB TOKENS website

// OTHER CONSIDERATIONS FOR REACT
// Security is a journey --> go back to documentation to see the latest updates to
// React syntax and how it impacts your app and security. If there is a new syntaxt change
// like the recent update to componentWillMount, there is a reason, and investigate how that
// impacts your code. 
// SYNTAX CHANGES MAKE THE LIBRARIES BETTER AND MORE SECURE
// NEVER PUBLISH CONFIGURATION FILES, USER DATA, OR LOGIN INFORMATION -->
// DO NOT COMMIT THESE FILES, AS THEY COULD BE OPENING ALL KINDS OF POTENTIAL ISSUES
// Never publish sensitive files
// BE CAREFUL WITH ANY DATA ON THE CLIENT
// Use StrictMode --> available only in development -->
// some of the info we will get from SM is, component with 
// unsafe lifecycle, warnings about legacy strings, warnings about
// deprecated findDOMNode usage, and legacy contextAPIs. 
// STRICT MODE --> it takes a look at your entire application and validates
// that you don't have any unsafe or legacy things that you're using in your app.


