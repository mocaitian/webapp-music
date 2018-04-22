import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"; //as是改名
import logo from '../assets/imgs/logo.png';
import '../assets/stylus/reset.styl';
import './App.styl';
import '../assets/stylus/font.styl';
import Recommend from './recommend/Recommend';
import Ranking from './ranking/Ranking';
import SingerList from './singer/SingerList';
// import Search from './search/Search';
import Search from '../containers/Search';
// import Player from '../containers/Player';
import MusicPlayer from './play/MusicPlayer';
import MusicMenu from './setting/Menu';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            menuShow: false//控制是否显示菜单
        }
    }

    render() {
        return (
            <Router>
                <div className="app skin-app">
                    <header className="app-header skin-app-header">
                        <i className="icon-et-more app-more" onClick={() => {this.setState({menuShow: true});}}></i>
                        <img src={logo} alt="logo" className="app-logo"/>
                        <h1 className="app-title">炸鸡音乐</h1>
                    </header>

                    <div className="music-tab skin-music-tab">
                        <div className="tab-item selected">
                            <NavLink to="/recommend" className="nav-link">
                                <span>推荐</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/ranking" className="nav-link">
                                <span>排行榜</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/singer" className="nav-link">
                                <span>歌手</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/search" className="nav-link">
                                <span>搜索</span>
                            </NavLink>
                        </div>
                    </div>

                    <div className="music-view">
                        {/*Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示*/}
                        {/*Redirect重定向到列表页*/}

                        <Switch>
                            <Route path="/recommend" component={Recommend}/>
                            <Route path="/singer" component={SingerList}/>
                            <Route path="/ranking" component={Ranking}/>
                            <Route path="/search" component={Search}/>
                            <Redirect from="/" to="/recommend"/>
                        </Switch>
                    </div>
                    <MusicPlayer />
                    <MusicMenu show={this.state.menuShow}
                               closeMenu={() => {this.setState({menuShow: false});}}/>
                </div>
            </Router>
        );
    }
}

export default App;
