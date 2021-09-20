import React, { useEffect, useState } from "react";
import client from "./ApiClient";
import { BandById, Option } from "./Types";

const Band = ({ id }: { id: number }) => {
    const [band, setBand] = useState<Option<BandById>>(null);

    useEffect(() => {
        client.get<BandById>(`/bands/${id}`).then((data) => setBand(data));
    }, [id]);

    return <div></div>;
};

export default Band;
