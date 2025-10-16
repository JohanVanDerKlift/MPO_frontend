import React from 'react';

function HomePage() {
    return (
        <div>
            <h1 className="mt-4">Maas CPS Productieorders</h1>
            <h3 className="mt-5">Applicatie voor de productie afdeling van Maas CPS.</h3>
            <p className="">
                Met deze applicatie kunnen productieorders worden verwerkt, testen worden uitgevoerd en afgevinkt.<br/>
                Vervolgens kunnen verpakkinggegevens worden ingevoerd, in sync met SAP.<br/>
                Productieorders worden aangemaakt in SAP en worden gesynchroniseerd met de applicatie.<br/>
                Testdata wordt opgeslagen in de database, en vervolgens gesynchroniseerd met SAP.
            </p>
            <p>
                <b>Powered by KOOMBA b.v.</b>
            </p>
        </div>
    );
}

export default HomePage;