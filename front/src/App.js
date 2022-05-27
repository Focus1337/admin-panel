import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import {Admin, Resource, EditGuesser, ListGuesser, fetchUtils} from 'react-admin';
import {UserList, UserEdit, UserCreate} from './users';
import { AuthorList, AuthorEdit, AuthorCreate } from './authors';
import {BookList, BookEdit, BookCreate} from './books';
import {Dashboard} from './dashboard';
import authProvider from "./authProvider";


function App() {
    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        const token = JSON.parse(localStorage.getItem('auth'));
        options.headers.set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider('http://localhost:3002', httpClient);
    return (
        <div>
            <Admin authProvider={authProvider} dashboard={Dashboard} dataProvider={dataProvider} requireAuth>
                <Resource name='users' list={UserList} edit={UserEdit} create={UserCreate}/>
                <Resource name='authors' list={AuthorList} edit={AuthorEdit} create={AuthorCreate}/>
                <Resource name='books' list={BookList} edit={BookEdit} create={BookCreate}/>
            </Admin>
        </div>
    );
}

export default App;
