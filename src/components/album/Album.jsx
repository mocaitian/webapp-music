import React from 'react';
import './album.styl'

class Album extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="music-album">
                album
            </div>
        )
    }
}

export default Album;