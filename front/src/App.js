import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { UserList } from './users';

function App() {
  const dataProvider = jsonServerProvider('http://localhost:3002');
  return (
    <div>
      <Admin dataProvider={dataProvider}>
        <Resource name='users' list={UserList}/>
      </Admin>
    </div>
  );
}

export default App;
