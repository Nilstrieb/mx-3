import React, { useRef, useState } from "react";
import { Button, Card, Container, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import client from "./ApiClient";
import { Band } from "./Types";

function App() {
    const searchRef = useRef<HTMLInputElement>(null);

    const [bands, setBands] = useState<Band[]>([]);

    const search = () => {
        const input = searchRef.current?.value;
        if (!input) {
            return;
        }
        client.searchBand(input).then((res) => setBands(res));
    };

    return (
        <Container>
            <Row>
                <FormGroup>
                    <FormLabel>Search Band</FormLabel>
                    <FormControl name="searchBand" type="text" ref={searchRef} />
                </FormGroup>
                <Button onClick={search}>Search</Button>
            </Row>
            <Row>
                {bands &&
                    bands.map((band) => (
                        <Card style={{ width: "18rem" }} key={band.uid}>
                            <Card.Img variant="top" src={band.url_for_image_original} />
                            <Card.Title>{band.name}</Card.Title>
                            <Card.Body>{getBioText(band)}</Card.Body>
                        </Card>
                    ))}
            </Row>
        </Container>
    );
}

function getBioText(band: Band): string {
    const bio = band.biographies.find((bio) => bio.lang === "de") || band.biographies[0];
    return bio?.description || "Keine Biographie angegeben.";
}

export default App;
