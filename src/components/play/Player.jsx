import React from 'react';
import ReactDOM from 'react-dom';
import {Song} from '@/model/song';
import Progress from './Progress';

import './player.styl';


class Player extends React.Component {
    constructor(props){
        super(props);

        this.currentSong = new Song(0, '', '', '', 0, '', '');
        this.currentIndex = 0;  //当前播放歌曲的位置

        //播放模式：list-列表 single-单曲 shuffle-随机
        this.playModes = ['list', 'single', 'shuffle'];

        this.state = {
            currentTime: 0, //当前播放时间
            playProgress: 0,    //播放进度
            playStatus: false,  //播放状态
            currentPlayMode: 0  //当前播放模式
        }

        //audio在移动端未触摸屏幕第一次是无法自动播放的,在组件更新后判断这个属性是否为true，如果为true就开始播放，然后设置为false
        this.isFirstPlay = true;
    }

    componentDidMount(){
        this.audioDOM = ReactDOM.findDOMNode(this.refs.audio);
        this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg);
        this.playerDOM = ReactDOM.findDOMNode(this.refs.player);
        this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg);

        this.audioDOM.addEventListener('canplay', () => {
            this.audioDOM.play();
            this.startImgRotate();

            this.setState({
                playStatus: true
            })
        }, false);

        this.audioDOM.addEventListener('timeupdate', () => {
            if(this.state.playStatus === true) {
                this.setState({
                    playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
                    currentTime: this.audioDOM.currentTime
                })
            }
        }, false)
    }

    componentDidUpdate(){
        //兼容手机端canplay事件触发后第一次调用play()方法无法自动播放的问题
        if(this.isFirstPlay === true) {
            this.audioDOM.play();
            this.isFirstPlay = false;
        }
    }

    //开始旋转图片
    startImgRotate = () => {
        if(this.singerImgDOM.className.indexOf('rotate') === -1) {
            this.singerImgDOM.classList.add('rotate');
        }else {
            this.singerImgDOM.style['webkitAnimationPlayState'] = 'running';
            this.singerImgDOM.style['animationPlayState'] = 'running';
        }
    }

    //停止旋转图片
    stopImgRotate = () => {
        this.singerImgDOM.style['webkitAnimationPlayState'] = 'paused';
        this.singerImgDOM.style['animationPlayState'] = 'paused';
    }

    // 隐藏播放器
    hidePlayer = () => {
        this.props.showMusicPlayer(false);
    }

    render (){
        //从redux中获取当前播放歌曲
        if(this.props.currentSong && this.props.currentSong.url){
            //当前歌曲发生变化
            if(this.currentSong.id !== this.props.currentSong.id){
                this.currentSong = this.props.currentSong;
                this.audioDOM.src = this.currentSong.url;
                //加载资源，ios需要调用此方法
                this.audioDOM.load();
            }
        }
        let song = this.props.currentSong;
        let playBg = song.img ? song.img : require("@/assets/imgs/play_bg.jpg");

        let playButtonClass = this.state.playStatus === true ? 'icon-pause' : 'icon-play';

        song.playStatus = this.state.playStatus;

        return(
            <div className="player-container">
                <div className="player" ref="player" style={{display:this.props.showStatus === true ? "block" : "none"}}>
                    <div className="header">
                        <span className="header-back" onClick={this.hidePlayer}>
                            <i className="icon-back"></i>
                        </span>
                        <div className="header-title">
                            {song.name}
                        </div>
                    </div>
                    <div className="singer-top">
                        <div className="singer">
                            <div className="singer-name">{song.singer}</div>
                        </div>
                    </div>
                    <div className="singer-middle">
                        <div className="singer-img" ref="singerImg">
                            <img src={playBg} alt={song.name} onLoad={
                                (e) => {
                                    /*图片加载完成后设置背景，防止图片加载过慢导致没有背景*/
                                    this.playerBgDOM.style.backgroundImage = `url("${playBg}")`
                                }
                            } />
                        </div>
                    </div>
                    <div className="singer-bottom">
                        <div className="controller-wrapper">
                            <div className="progress-wrapper">
                                <span className="current-time">{getTime(this.state.currentTime)}</span>
                                <div className="play-progress">
                                    <Progress progress={this.state.playProgress} />
                                </div>
                                <span className="total-time">{getTime(song.duration)}</span>
                            </div>
                            <div className="play-wrapper">
                                <div className="play-model-button"  onClick={this.changePlayMode}>
                                    <i className={"icon-" + this.playModes[this.state.currentPlayMode] + "-play"}></i>
                                </div>
                                <div className="previous-button" onClick={this.previous}>
                                    <i className="icon-previous"></i>
                                </div>
                                <div className="play-button" onClick={this.playOrPause}>
                                    <i className={playButtonClass}></i>
                                </div>
                                <div className="next-button" onClick={this.next}>
                                    <i className="icon-next"></i>
                                </div>
                                <div className="play-list-button" onClick={this.showPlayList}>
                                    <i className="icon-play-list"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="player-bg" ref="playerBg"></div>
                    <audio ref="audio"></audio>
                </div>
            </div>
        )
    }
}

/* 传入秒数返回 m:s 格式*/
function getTime(second){
    second = Math.floor(second);
    let minute = Math.floor(second/60);
    second = second - minute * 60;
    return minute + ':' + second;
}

export default Player;