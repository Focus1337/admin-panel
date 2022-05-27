import { Datagrid, DateField, EditButton, ImageField, List, NumberField, TextField, SimpleForm, TextInput, NumberInput, Edit, Create } from 'react-admin';


export const BookList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="genre" />
            <NumberField source="subType" />
            <ImageField source="image" />
            <NumberField source="year" />
            <NumberField source="rating" />
            <DateField source="addedDate" />
            <TextField source="author.fullName" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const BookEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput multiline source="description" />
            <TextInput source="genre" />
            <NumberInput source="subType" />
            <TextInput source="image" />
            <NumberInput source="year" />
            <NumberInput source="rating" />
            <TextInput source="authorId" />
        </SimpleForm>
    </Edit>
);

export const BookCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source='title'/>
            <TextInput multiline source='description'/>
            <TextInput source='genre'/>
            <NumberInput source='subType'/>
            <TextInput source='image'/>
            <NumberInput source='year'/>
            <NumberInput source='rating'/>
            <TextInput source='authorId'/>
        </SimpleForm>
    </Create>
);
