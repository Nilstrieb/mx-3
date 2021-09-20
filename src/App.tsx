import React, { useRef, useState } from "react";
import { Button, CardGroup, Container, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import client from "./ApiClient";

function App() {
    const searchRef = useRef<HTMLInputElement>(null);

    const [bands, setBands] = useState<any[]>([]);

    const search = () => {
        const input = searchRef.current?.value;
        if (!input) {
            return;
        }
        client.searchBand(input).then((res) => setBands(res.bands));
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
                <CardGroup>{bands && bands.map((band) => <div>{band}</div>)}</CardGroup>
            </Row>
        </Container>
    );
}

export default App;
