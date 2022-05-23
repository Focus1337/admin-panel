import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

function App() {
  const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  return (
    <div>
      <Admin dataProvider={dataProvider}>
        <Resource name='users' list={ListGuesser}/>
      </Admin>
    </div>
  );
}

export default App;
