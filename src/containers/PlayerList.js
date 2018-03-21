import {connect} from 'react-redux';
import {changeSong, removeSong} from '../redux/actions';
import PlayerList from '../components/play/PlayerList';

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    currentSong: state.song,
    playSongs: state.songs
})

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    removeSong: (id) => {
        dispatch(removeSong(id));
    },
    removeSong1: function (id) {
        return dispatch(removeSong(id));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(PlayerList);