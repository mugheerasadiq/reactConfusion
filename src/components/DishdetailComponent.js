import React, {Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {

 
    renderDish(dish) {
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

    renderComment(dish){
        if( dish != null){

            const COMMENTS = dish.comments.map( (COMMENT) => {
            return(  
                <ul key={COMMENT.id} className="list-unstyled">
                    <li className="mt-3 mb-1">{COMMENT.comment}</li>
                    <li className="mt-3">-- {COMMENT.author}, {COMMENT.date}</li>
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

    render(){

        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.selectedDish)}
                </div>

                <div className="col-12 col-md-5 m-1">
               {this.renderComment(this.props.selectedDish)}
                </div>
            </div>
        );
    }

}

export default DishDetail;