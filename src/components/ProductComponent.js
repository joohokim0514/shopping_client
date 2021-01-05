import React from 'react';
import { Card, CardImg, CardBody, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderItem({ product, onClick }) {
    return(
        <Card>
            <Link to={`/products/${product._id}`} >
                <CardImg src={product.image} alt={product.name} />
                <CardBody>
                    <CardTitle className="text-center">{product.name}</CardTitle>
                </CardBody>
            </Link>
        </Card>
    );
}

const Product = (props) => {
    const product = props.products.products.map((product) => {
        return (
            <div key={product._id} className="col-12 col-md-3 m-0.5">
                <RenderItem product={product} />
            </div>
        );
    });
    return (
        <div className="container">
            <Row>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Products</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                <div className="col-12 text-center">
                    <h3>Products</h3>
                    <hr />
                </div>
            </Row>
            <Row>
                {product}
            </Row>
        </div>
    );
}

export default Product;
