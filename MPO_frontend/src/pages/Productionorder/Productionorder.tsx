import React from 'react';
import {useParams} from "react-router-dom";
import Production from "../../components/Production";
import Container from "react-bootstrap/Container";

function Productionorder() {
    let {id, type} = useParams<{ id: string, type: string }>();

    if (!id || !type) return null;
    return (
        <Container className="m-4" fluid={true}>
            <Production id={id} type={type}/>
        </Container>
    );
}

export default Productionorder;