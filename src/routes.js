import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Livro from "./pages/livro";

const Routes = () => (  
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/livros/:id" component={ Livro } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
