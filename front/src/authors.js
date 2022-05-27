import { BooleanField, Datagrid, DateField, EditBase, EditButton, EmailField, ImageField, List, NumberField, SingleFieldList, TextField, SimpleForm, ReferenceField, TextInput, BooleanInput, ImageInput, DateInput, NumberInput, Edit, Create } from 'react-admin';

export const AuthorList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="fullname" />
            <ImageField source="image" />
            <TextField source="description" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const AuthorEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id"/>
            <TextInput source="fullname"/>
            <ImageInput source="image"/>
            <TextInput source="description"/>
        </SimpleForm>
    </Edit>
);

export const AuthorCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source='fullname'/>
            <ImageInput source='image'/>
            <TextInput source='description'/>
        </SimpleForm>
    </Create>
);