import React, { Component } from 'react';
import { Label, Card, CardImg,CardSubtitle, CardHeader, CardBody, Row, Col, Button} from 'reactstrap';

class Home extends Component {

    render() {
        return (
            <div className="container">
                <div className="col-12">
                    <h3>About Webstore</h3>
                    <hr />
                        <div className="row row-content">
                            <div className="col-12 col-md-6 mr-5">
                                <h5>Our History</h5>
                                <p>Started in 1998, Web Store was built to ensure a quick, easy, and fun shopping experience for
                                users from the United States and South Korea. Web Store, quickly became the most frequently visited
                                shopping site in the 21st century according to <em>Forbes</em>, due to its exquisite user experience.</p>
                                <p>Web Store enables subscribed users to both upload items as sellers and purchase quality-assured
                                products as customers. This multi-layered experience is the reason why many users opt to shop at Web Store.</p>
                            </div>
                            <div className="col-12 col-md-5">
                                <Card>
                                    <CardHeader className="bg-info text-white">Facts At a Glance</CardHeader>
                                    <CardBody>
                                        <dl className="row p-1">
                                            <dt className="col-6">Launched</dt>
                                            <dd className="col-6">14 May. 1998</dd>
                                            <dt className="col-6">Major Stake Holder</dt>
                                            <dd className="col-6">JK Corporations Inc.</dd>
                                            <dt className="col-6">Last Year's Turnover</dt>
                                            <dd className="col-6">$89,250,375,100</dd>
                                            <dt className="col-6">Employees</dt>
                                            <dd className="col-6">7000</dd>
                                        </dl>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Home;
