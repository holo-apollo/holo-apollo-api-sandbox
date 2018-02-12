import 'styles/landing.less';
import React, {Component} from 'react';


export default class Landing extends Component {
    render() {
        return (
            <div className="outer">
                <div className="middle">
                    <div className="inner">
                        <img src="/static/img/image_holo.png" alt="Holo"/>
                        <h1>Coming soon</h1>
                        <h3>Holo Apollo</h3>
                        <h5>The best marketplace of craft design</h5>
                    </div>
                </div>
            </div>
        );
    }
}