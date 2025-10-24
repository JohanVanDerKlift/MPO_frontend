import React from 'react';
import {useParams} from "react-router-dom";
import Production from "../../components/Production";
import Container from "react-bootstrap/Container";

function Productionorder() {
    let {id} = useParams<{ id: string }>();

    if (!id) return null;
    return (
        <Container className="m-4" fluid={true}>
            <Production id={id}/>
        </Container>
    );
}

export default Productionorder;