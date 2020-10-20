import React from 'react';
import { BrowserRouter ,Switch, Route } from 'react-router-dom';

import Landing from './pages/landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanagesMap}/>
                <Route path="/showorphanages/:id" exact component={Orphanage}/>
                <Route path="/orphanages/create" exact component={CreateOrphanage}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;