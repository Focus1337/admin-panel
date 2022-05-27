import { ArrayField, BooleanField, ChipField, Datagrid, DateField, EmailField, List, NumberField, SingleFieldList, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <BooleanField source="emailConfirmed" />
            <TextField source="passwordHash" />
            <TextField source="name" />
            <TextField source="lastName" />
            <DateField source="subDateStart" />
            <ArrayField source="roles"><SingleFieldList><ChipField source="name" /></SingleFieldList></ArrayField>
        </Datagrid>
    </List>
);

// export const CreateRole = () => (

// );