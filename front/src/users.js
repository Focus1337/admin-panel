import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    EmailField,
    List,
    NumberField,
    SingleFieldList,
    TextField,
    ArrayInput, Edit, SimpleForm, SimpleFormIterator, TextInput, PasswordInput, Create
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <EmailField source="email"/>
            <BooleanField source="emailConfirmed"/>
            <TextField source="passwordHash"/>
            <TextField source="name"/>
            <TextField source="lastName"/>
            <DateField source="subDateStart"/>
            <ArrayField source="roles"><SingleFieldList><ChipField source="name"/></SingleFieldList></ArrayField>
            <EditButton/>
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="name"/>
            <TextInput source="lastName"/>
            <TextInput source="email"/>
            <PasswordInput source="password"/>
            <PasswordInput source="confirmPassword"/>
            <ArrayInput source="roles"><SimpleFormIterator>
                <TextInput source="name"/>
                </SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="lastName"/>
            <TextInput source="email"/>
            <PasswordInput source="password"/>
            <PasswordInput source="confirmPassword"/>
        </SimpleForm>
    </Create>
);