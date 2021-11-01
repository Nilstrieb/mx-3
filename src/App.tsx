import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Spinner } from "react-bootstrap";
import client from "./ApiClient";
import { Band, Option } from "./Types";
import ModalBand from "./ModalBand";
import { useHistory, useParams } from "react-router-dom";

function App() {
    const searchRef = useRef<HTMLInputElement>(null);

    const [bands, setBands] = useState<Option<Band[]>>(null);
    const [selectedBand, setSelectedBand] = useState<Option<Band>>(null);

    const params = useParams<any>();
    const bandQuery = decodeURIComponent(params.query);
    const history = useHistory();

    useEffect(() => {
        if (bandQuery) {
            client.searchBand(bandQuery).then((res) => setBands(res));
        }
    }, [bandQuery]);

    const search = (e: any) => {
        const input = searchRef.current?.value;
        if (!input) {
            return;
        }
        history.push(`/${encodeURIComponent(input)}`);
        setBands(null);
        e.preventDefault();
    };

    return (
        <Container>
            <Row>
                <Form onSubmit={search}>
                    <FormGroup controlId="searchBand">
                        <FormLabel>Search Band</FormLabel>
                        <FormControl name="searchBand" type="text" ref={searchRef} />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                </Form>
            </Row>
            <Row aria-live="polite">
                {selectedBand && <ModalBand onClose={() => setSelectedBand(null)} band={selectedBand} />}
                {bands ? (
                    bands.map((band) => (
                        <Card onClick={() => setSelectedBand(band)} style={{ width: "18rem" }} key={band.uid}>
                            <Card.Img variant="top" src={band.url_for_image_original} alt={band.name} />
                            <Card.Title>{band.name}</Card.Title>
                            <Card.Body>{getBioText(band, 200)}</Card.Body>
                        </Card>
                    ))
                ) : bandQuery ? (
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" />
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </Container>
    );
}

export function getBioText(band: Band, maxLen: number): string {
    const bio = band.biographies.find((bio) => bio.lang === "de") || band.biographies[0];
    return limit(bio?.description || "Keine Biographie angegeben.", maxLen);
}

function limit(str: string, max: number): string {
    if (str.length > max) {
        return str.substr(0, max - 3) + "...";
    }
    return str;
}

export default App;
