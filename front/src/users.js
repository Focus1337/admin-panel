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
    ArrayInput, Edit, SimpleForm, SimpleFormIterator, TextInput, PasswordInput, Create} from 'react-admin';
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

const validateEmail=email();
const validateName=[required(), maxLength(15)];
const validateLastName=[required(), maxLength(15)];
const validatePassword=[required(), maxLength(30)];

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
            <TextInput validate={validateName} source="name"/>
            <TextInput validate={validateLastName} source="lastName"/>
            <TextInput validate={validateEmail} source="email"/>
            <PasswordInput validate={validatePassword} source="password"/>
            <PasswordInput validate={validatePassword} source="confirmPassword"/>
            <ArrayInput source="roles"><SimpleFormIterator>
                <TextInput source="name"/>
                </SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput validate={validateName} source="name"/>
            <TextInput validate={validateLastName} source="lastName"/>
            <TextInput validate={validateEmail} source="email"/>
            <PasswordInput validate={validatePassword} source="password"/>
            <PasswordInput validate={validatePassword} source="confirmPassword"/>
        </SimpleForm>
    </Create>
);