import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource, EditGuesser, ListGuesser } from 'react-admin';
import {UserList, UserEdit, UserCreate} from './users';
import { AuthorList, AuthorEdit, AuthorCreate } from './authors';
import {BookList, BookEdit, BookCreate} from './books';
import {Dashboard} from './dashboard';
import addProvider from "./addProvider";

function App() {
  const dataProvider = jsonServerProvider('http://localhost:3002');
  return (
    <div>
      <Admin authProvider={addProvider} dashboard={Dashboard} dataProvider={dataProvider}>
        <Resource name='users' list={UserList} edit={UserEdit} create={UserCreate} />
        <Resource name='authors' list={AuthorList} edit={AuthorEdit} create={AuthorCreate} />
        <Resource name='books' list={BookList} edit={BookEdit} create={BookCreate} />
      </Admin>
    </div>
  );
}

export default App;
