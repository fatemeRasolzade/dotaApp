import App from 'next/app';
import Head from 'next/head'
import React from 'react';
import '../public/css/Style.css'

import Router from 'next/router';
import Loading from '../components/utils/Loading'
import { wrapper } from '../Redux/store'

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';
import Mytheme from '../public/js/Mytheme'
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class MyApp extends App {
    constructor(props){
        super(props)
        this.state = { loading: false };
        Router.onRouteChangeStart = (url) => {
            this.setState({loading:true})
        };
    
        Router.onRouteChangeComplete = (url) => {
            this.setState({loading:false})
        };
    
        Router.onRouteChangeError = (err, url) => {
            // an error occurred.
            // some error logic
        }; 
    }

    // static async getInitialProps({ Component, ctx }) {
    //     const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    //     return {appProps : appProps}
    // }

    render() {
        const {Component, pageProps } = this.props;
        return (
            <div>
              <Head>
                <title>Warcraft</title>
                  <link rel="icon" href="/img/logo.png" />
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"/>
                  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"/>
              </Head>
              <ThemeProvider theme={Mytheme}>
                <StylesProvider jss={jss}>
                  {this.state.loading===true ? <Loading /> : <></>}
                  <Component {...pageProps} />
                </StylesProvider>
              </ThemeProvider>
          </div>
        );
    }
}

export default wrapper.withRedux(MyApp)
