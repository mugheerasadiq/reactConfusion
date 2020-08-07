import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComment({dish}){
        if( dish != null){

            const COMMENTS = dish.comments.map( (COMMENT) => {
            return(  
                <ul key={COMMENT.id} className="list-unstyled">
                    <li className="mt-3 mb-1">{COMMENT.comment}</li>
                    <li className="mt-3">-- {COMMENT.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(COMMENT.date)))}</li>
                </ul>
                );
            });

            return (
                <div >
                    <h4>Comments</h4>
                    {COMMENTS}
                </div>
            );
        
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.selectedDish} />
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        <RenderComment dish={props.selectedDish} />
                    </div>
                </div>
            </div>
        );
    }


export default DishDetail;