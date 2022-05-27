import { BooleanField, Datagrid, DateField, EditBase, EditButton, EmailField, ImageField, List, NumberField, SingleFieldList, TextField, SimpleForm, ReferenceField, TextInput, BooleanInput, ImageInput, DateInput, NumberInput, Edit, Create } from 'react-admin';


export const BookList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source='description'/>
            <TextField source='genre'/>
            <NumberField source='subType'/>
            <ImageField source="image" />
            <DateField source='year'/>
            <NumberField source='rating'/>
            <DateField source='addedDate'/>
            <TextField source='autor.id'/>
            
            <EditButton/>
        </Datagrid>
    </List>
);

export const BooksEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="title"/>
            <TextInput source="description"/>
            <TextInput source="genre"/>
            <NumberInput source="subType"/>
            <ImageInput source="image"/>
            <DateInput source="year"/>
            <NumberInput source="rating"/>
            <DateInput source="added date"/>
            {/* <TextInput source="authoe Id"/> */}
        </SimpleForm>
    </Edit>
);

export const BooksCreate= () => (
    <Create>
        <SimpleForm>
            <TextInput source='title'/>
            <TextInput source='description'/>
            <TextInput source='genre'/>
            <NumberInput source='subType'/>
            <ImageInput source='image'/>
            <DateInput source='year'/>
            <NumberInput source='rating'/>
            <DateInput source='addeddate'/>
        </SimpleForm>
    </Create>
);
