import { Datagrid, DateField, EditButton, ImageField, List, NumberField, TextField, SimpleForm, TextInput, NumberInput, Edit, Create } from 'react-admin';
import {
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
    email,
    choices
} from 'react-admin';

const authorvalidation = (value, allValues) =>{
    if(!value)
    {
        return 'Author requier'
    }
};

const validateAuthor=[required(), maxLength(30), authorvalidation];
const validateTitle=[required()];

export const BookList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="genre" />
            <NumberField source="subType" />
            <ImageField  source="image" />
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
            <TextInput validate={validateAuthor} source="authorId" />
        </SimpleForm>
    </Edit>
);

export const BookCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput validate={validateTitle} source='title'/>
            <TextInput validate={validateTitle} multiline source='description'/>
            <TextInput validate={validateTitle} source='genre'/>
            <NumberInput source='subType'/>
            <TextInput source='image'/>
            <NumberInput source='year'/>
            <NumberInput source='rating'/>
            <TextInput validate={validateAuthor} source='authorId'/>
        </SimpleForm>
    </Create>
);
